import React from 'react';
import Image from 'next/image';
import { isSvg } from '@/lib/utils';

/**
 * Square logo tile. Shows a dashed placeholder with the first letter until a
 * logo file is set. `contain` pads the image (transparent marks, SVGs);
 * `cover` fills the tile (square artwork that already has its own background).
 */
export const LogoTile = ({
  logo,
  name,
  fit = 'contain',
}: {
  logo?: string;
  name: string;
  fit?: 'contain' | 'cover';
}) =>
  logo ? (
    <Image
      src={logo}
      alt={`${name} logo`}
      width={44}
      height={44}
      unoptimized={isSvg(logo)}
      className={`h-11 w-11 shrink-0 rounded-xl border border-border bg-surface ${
        fit === 'cover' ? 'object-cover' : 'object-contain p-1.5'
      }`}
    />
  ) : (
    <span
      aria-hidden="true"
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-dashed border-border-strong bg-surface text-[16px] font-medium text-muted-2"
    >
      {name.charAt(0)}
    </span>
  );
