import { ImageResponse } from 'next/og';
import { portfolioData } from '@/data';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = `${portfolioData.personal.name} — ${portfolioData.personal.title}`;

/**
 * Share card. Rendered at request time by Satori, which supports only a subset
 * of CSS — flex layout and plain values, no CSS variables, no grid.
 */
export default function OpengraphImage() {
  const { personal, projectsBuilt } = {
    personal: portfolioData.personal,
    projectsBuilt: portfolioData.personal.projectsBuilt,
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#000000',
          padding: '72px 80px',
          color: '#ffffff',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.45)',
            }}
          >
            Portfolio
          </div>
          <div style={{ fontSize: 92, fontWeight: 700, marginTop: 18, lineHeight: 1.05 }}>
            {personal.name}
          </div>
          <div
            style={{
              fontSize: 34,
              marginTop: 20,
              color: 'rgba(255,255,255,0.72)',
              maxWidth: 900,
              lineHeight: 1.35,
            }}
          >
            {personal.title}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 44, fontSize: 26 }}>
          <span style={{ color: 'rgba(255,255,255,0.9)' }}>{projectsBuilt} projects built</span>
          <span style={{ color: 'rgba(255,255,255,0.28)' }}>|</span>
          <span style={{ color: 'rgba(255,255,255,0.9)' }}>{personal.location}</span>
          <span style={{ color: 'rgba(255,255,255,0.28)' }}>|</span>
          <span style={{ color: 'rgba(255,255,255,0.9)' }}>ajsalinas.vercel.app</span>
        </div>
      </div>
    ),
    size
  );
}
