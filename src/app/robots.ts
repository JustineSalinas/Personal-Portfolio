import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // The API routes hold no indexable content and cost money to hit.
      disallow: ['/api/'],
    },
    sitemap: 'https://ajsalinas.vercel.app/sitemap.xml',
  };
}
