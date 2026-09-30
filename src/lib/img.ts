import type { Img } from "@/lib/content";

/** Blur placeholder props for `next/image`: bundled images carry their own, CMS ones ship an LQIP. */
export function blurProps(img: Img): { placeholder?: "blur"; blurDataURL?: string } {
  if (typeof img.src !== "string") return { placeholder: "blur" };
  return img.blurDataURL ? { placeholder: "blur", blurDataURL: img.blurDataURL } : {};
}

/** A plain URL for the image, for metadata such as Open Graph. */
export function imageUrl(img: Img): string {
  return typeof img.src === "string" ? img.src : img.src.src;
}
