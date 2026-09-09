import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { generateSignedUploadParams } from "@/lib/cloudinary/upload";
import { siteConfig } from "@/config/site";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { folder = siteConfig.cloudinary.folders.products, publicId } = await request.json();

  const params = generateSignedUploadParams(folder, publicId);
  return NextResponse.json(params);
}
