import { ImageResponse } from 'next/og';
import { portfolioData } from '@/data';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = `${portfolioData.personal.name} | ${portfolioData.personal.title}`;

/**
 * Share card in the site's cream palette. Rendered at request time by Satori,
 * which supports only a subset of CSS: flex layout and plain values, no CSS
 * variables, no grid.
 */
export default function OpengraphImage() {
  const { personal } = portfolioData;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#f2f2ef',
          padding: 40,
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: '#fcfcfb',
            border: '2px solid #e2e2de',
            borderRadius: 40,
            padding: '56px 68px',
            color: '#111113',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                alignSelf: 'flex-start',
                gap: 12,
                padding: '10px 22px',
                borderRadius: 999,
                background: '#e6f4eb',
                color: '#1e6b3a',
                fontSize: 22,
                letterSpacing: 2,
              }}
            >
              <div style={{ width: 12, height: 12, borderRadius: 999, background: '#2f9e5b' }} />
              {personal.availability}
            </div>
            <div style={{ fontSize: 96, fontWeight: 700, marginTop: 36, lineHeight: 1.05 }}>
              {personal.name}
            </div>
            <div style={{ fontSize: 40, marginTop: 18, color: '#3a3a3f', lineHeight: 1.3 }}>
              {personal.title}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 36, fontSize: 28, color: '#6e6e73' }}>
            <span>{personal.projectsBuilt} projects built</span>
            <span style={{ color: '#c9c9c4' }}>|</span>
            <span>{personal.location}</span>
            <span style={{ color: '#c9c9c4' }}>|</span>
            <span>ajsalinas.vercel.app</span>
          </div>
        </div>
      </div>
    ),
    size
  );
}
