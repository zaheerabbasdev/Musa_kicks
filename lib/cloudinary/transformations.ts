/**
 * Cloudinary Image Transformations
 * Client-safe — only constructs URLs, no secrets involved.
 */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

function buildUrl(
  publicId: string,
  transformations: string
): string {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformations}/${publicId}`;
}

/**
 * Product card image — optimized small image
 * ~400px wide, auto quality and format
 */
export function productCardUrl(publicId: string): string {
  return buildUrl(publicId, "f_auto,q_auto,w_400,h_400,c_fill,g_center");
}

/**
 * Product thumbnail — small square
 */
export function productThumbnailUrl(publicId: string): string {
  return buildUrl(publicId, "f_auto,q_auto,w_120,h_120,c_fill,g_center");
}

/**
 * Product detail / gallery main image — higher resolution
 */
export function productDetailUrl(publicId: string): string {
  return buildUrl(publicId, "f_auto,q_auto,w_800,h_800,c_fill,g_center");
}

/**
 * Homepage hero — large responsive image
 */
export function heroUrl(publicId: string): string {
  return buildUrl(publicId, "f_auto,q_auto,w_1920,h_900,c_fill,g_center");
}

/**
 * Homepage hero — mobile smaller image
 */
export function heroMobileUrl(publicId: string): string {
  return buildUrl(publicId, "f_auto,q_auto,w_768,h_600,c_fill,g_center");
}

/**
 * Category card image
 */
export function categoryImageUrl(publicId: string): string {
  return buildUrl(publicId, "f_auto,q_auto,w_600,h_400,c_fill,g_center");
}

/**
 * Banner image
 */
export function bannerUrl(publicId: string): string {
  return buildUrl(publicId, "f_auto,q_auto,w_1440,h_500,c_fill,g_center");
}

/**
 * Admin preview — medium
 */
export function adminPreviewUrl(publicId: string): string {
  return buildUrl(publicId, "f_auto,q_auto,w_200,h_200,c_fill,g_center");
}

/**
 * Avatar / profile image
 */
export function avatarUrl(publicId: string): string {
  return buildUrl(publicId, "f_auto,q_auto,w_80,h_80,c_fill,g_face,r_max");
}

/**
 * Raw optimized URL without crop constraints (for arbitrary images)
 */
export function optimizedUrl(publicId: string, width = 800): string {
  return buildUrl(publicId, `f_auto,q_auto,w_${width}`);
}
