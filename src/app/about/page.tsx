import React from 'react';
import type { Metadata } from 'next';
import { SubPageShell } from '@/components/profile/SubPageShell';
import { PhotoCarousel, type Slide } from '@/components/profile/PhotoCarousel';
import { portfolioData } from '@/data';

export const metadata: Metadata = {
  title: 'About',
  description: 'More about Adrian Salinas: how he works, and what he builds through Cascade Development Group.',
};

// Captions describe only what each photo shows; edit the wording freely.
const slides: Slide[] = [
  {
    src: '/about/senior-high-2024-portrait.jpg',
    alt: 'Adrian in a yellow and red graduation gown holding his cap',
    title: 'Graduation portrait',
    caption: 'Senior High School, 2024.',
  },
  {
    src: '/about/graduation-2024.jpg',
    alt: 'Adrian in his graduation gown posing with three people on graduation day',
    title: 'Graduation day',
    caption: 'Celebrating with loved ones.',
  },
  {
    src: '/about/photo-2.jpg',
    alt: 'Adrian standing on an empty road under a cloudy sky, black and white',
    title: 'Off the keyboard',
    caption: 'An open road at dusk, 2025.',
  },
  {
    src: '/about/photo-5.png',
    alt: 'Adrian in glasses looking at his phone at an outdoor cafe at night',
    title: 'Late-night cafe',
    caption: 'Unwinding between builds.',
  },
  {
    src: '/about/photo-1.jpg',
    alt: 'Adrian in his school uniform at a cafe, covering his face with a red phone',
    title: 'Student days',
    caption: 'Camera-shy, in school uniform.',
  },
];

export default function AboutPage() {
  return (
    <SubPageShell title="More about me">
      <div className="flex flex-col gap-4">
        {portfolioData.personal.longBio.map((paragraph, i) => (
          <p
            key={i}
            className="text-[16px] leading-[1.75] text-secondary"
            dangerouslySetInnerHTML={{ __html: paragraph }}
          />
        ))}
      </div>

      <PhotoCarousel slides={slides} />
    </SubPageShell>
  );
}
