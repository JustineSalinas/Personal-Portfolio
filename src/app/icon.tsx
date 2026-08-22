import { ImageResponse } from 'next/og';
import { portfolioData } from '@/data';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

/** Favicon: the AJ monogram, matching the top bar. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000000',
          color: '#ffffff',
          fontSize: 19,
          fontWeight: 700,
          borderRadius: 6,
        }}
      >
        {portfolioData.personal.initials}
      </div>
    ),
    size
  );
}
