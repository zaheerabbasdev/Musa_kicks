/**
 * Cloudinary Asset Deletion (Server-Side Only)
 */
import { cloudinary } from "./config";

export type DeleteResult = {
  success: boolean;
  publicId: string;
  error?: string;
};

/**
 * Delete a single Cloudinary asset by its public ID.
 * Always use the stored publicId — never reconstruct from URL.
 */
export async function deleteCloudinaryAsset(
  publicId: string
): Promise<DeleteResult> {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });

    if (result.result === "ok" || result.result === "not found") {
      return { success: true, publicId };
    }

    return {
      success: false,
      publicId,
      error: `Cloudinary returned: ${result.result}`,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`[Cloudinary] Failed to delete ${publicId}:`, message);
    return { success: false, publicId, error: message };
  }
}

/**
 * Delete multiple Cloudinary assets.
 * Returns individual results for each deletion.
 */
export async function deleteCloudinaryAssets(
  publicIds: string[]
): Promise<DeleteResult[]> {
  const results = await Promise.allSettled(
    publicIds.map((id) => deleteCloudinaryAsset(id))
  );

  return results.map((result, index) => {
    if (result.status === "fulfilled") return result.value;
    return {
      success: false,
      publicId: publicIds[index],
      error: "Promise rejected",
    };
  });
}
