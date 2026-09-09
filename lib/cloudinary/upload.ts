/**
 * Cloudinary Upload Utilities (Server-Side Only)
 */
import { cloudinary } from "./config";
import { siteConfig } from "@/config/site";

export type CloudinaryUploadResult = {
  publicId: string;
  imageUrl: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
};

/**
 * Generate a signed upload signature for direct browser → Cloudinary uploads.
 * Called by the /api/cloudinary/sign route.
 * The API secret never leaves the server.
 */
export function generateSignedUploadParams(
  folder: string,
  publicId?: string
): {
  signature: string;
  timestamp: number;
  apiKey: string;
  cloudName: string;
  folder: string;
  publicId?: string;
} {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const params: Record<string, string | number> = {
    timestamp,
    folder,
  };

  if (publicId) {
    params.public_id = publicId;
  }

  const signature = cloudinary.utils.api_sign_request(
    params,
    process.env.CLOUDINARY_API_SECRET!
  );

  return {
    signature,
    timestamp,
    apiKey: process.env.CLOUDINARY_API_KEY!,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
    folder,
    publicId,
  };
}

/**
 * Upload a file from a URL or base64 string directly on the server.
 * Used for seed data or programmatic uploads.
 */
export async function uploadFromServer(
  source: string,
  folder: string,
  publicId?: string,
  options?: Record<string, unknown>
): Promise<CloudinaryUploadResult> {
  const result = await cloudinary.uploader.upload(source, {
    folder,
    public_id: publicId,
    overwrite: true,
    resource_type: "image",
    ...options,
  });

  return {
    publicId: result.public_id,
    imageUrl: result.secure_url,
    width: result.width,
    height: result.height,
    format: result.format,
    bytes: result.bytes,
  };
}

/**
 * Upload a product image.
 */
export async function uploadProductImage(
  source: string,
  productSlug: string,
  imageIndex: number
): Promise<CloudinaryUploadResult> {
  return uploadFromServer(
    source,
    `${siteConfig.cloudinary.folders.products}`,
    `${productSlug}-${imageIndex}`,
    {
      transformation: [{ quality: "auto", fetch_format: "auto" }],
    }
  );
}

/**
 * Upload a category image.
 */
export async function uploadCategoryImage(
  source: string,
  categorySlug: string
): Promise<CloudinaryUploadResult> {
  return uploadFromServer(
    source,
    siteConfig.cloudinary.folders.categories,
    `category-${categorySlug}`
  );
}

/**
 * Upload a branding asset.
 */
export async function uploadBrandingAsset(
  source: string,
  assetName: string
): Promise<CloudinaryUploadResult> {
  return uploadFromServer(
    source,
    siteConfig.cloudinary.folders.branding,
    assetName
  );
}
