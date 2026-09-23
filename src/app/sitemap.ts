import type { MetadataRoute } from 'next';
import { portfolioData } from '@/data';

const SITE = 'https://ajsalinas.vercel.app';

const caseStudies = [...portfolioData.projects, ...portfolioData.building].filter(
  (p) => 'slug' in p && 'caseStudy' in p
);

const SUB_PAGES = [
  'projects',
  'experience',
  'stack',
  'certifications',
  'recommendations',
  'affiliations',
  'resources',
  'gear',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    ...SUB_PAGES.map((slug) => ({
      url: `${SITE}/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...caseStudies.map((p) => ({
      url: `${SITE}/work/${(p as { slug: string }).slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
