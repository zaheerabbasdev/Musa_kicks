import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { deleteCloudinaryAsset } from "@/lib/cloudinary/delete";
import { prisma } from "@/lib/db/prisma";

export async function DELETE(request: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { publicId, imageId } = await request.json();

  if (!publicId) {
    return NextResponse.json({ error: "publicId is required" }, { status: 400 });
  }

  // Delete from Cloudinary
  const result = await deleteCloudinaryAsset(publicId);

  if (!result.success) {
    console.error("[Cloudinary Delete] Failed:", result.error);
    return NextResponse.json(
      { error: "Failed to delete from Cloudinary", detail: result.error },
      { status: 500 }
    );
  }

  // Remove from DB if imageId provided
  if (imageId) {
    try {
      await prisma.productImage.delete({ where: { id: imageId } });
    } catch (dbError) {
      console.error("[Cloudinary Delete] DB cleanup failed:", dbError);
      // Cloudinary deletion succeeded, log DB error but return partial success
      return NextResponse.json({
        success: true,
        warning: "Cloudinary asset deleted but DB record cleanup failed",
      });
    }
  }

  return NextResponse.json({ success: true });
}
