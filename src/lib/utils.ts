import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Next's image optimizer rejects SVG with a 400 unless dangerouslyAllowSVG is
 * set. Logos render at 32-36px, so there is nothing to gain from optimizing
 * them — pass this to `unoptimized` so SVGs are served as-is while raster
 * images still go through the pipeline.
 */
export const isSvg = (src: string) => src.toLowerCase().endsWith('.svg');