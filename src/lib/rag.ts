import { portfolioData } from '@/data';

/**
 * Lexical retrieval over the portfolio content.
 *
 * The corpus is small and fully known at build time, so there is no embedding
 * service or vector store here — chunks are scored with TF-IDF plus a title
 * boost, which is deterministic, dependency-free, and quick enough to run per
 * request. Swap `retrieve` for a vector search later without touching callers.
 */

export interface Chunk {
  id: string;
  section: string;
  title: string;
  text: string;
}

const STOPWORDS = new Set([
  'a', 'about', 'all', 'am', 'an', 'and', 'any', 'are', 'as', 'at', 'be', 'been', 'but', 'by',
  'can', 'did', 'do', 'does', 'for', 'from', 'had', 'has', 'have', 'he', 'her', 'him',
  'his', 'how', 'i', 'if', 'in', 'into', 'is', 'it', 'its', 'me', 'more', 'most', 'my', 'no',
  'not', 'of', 'on', 'or', 'she', 'so', 'some', 'tell', 'than', 'that', 'the', 'their', 'them',
  'then', 'there', 'these', 'they', 'this', 'to', 'up', 'us', 'was', 'we', 'were', 'what',
  'when', 'where', 'which', 'who', 'why', 'will', 'with', 'you', 'your',
]);

/** Plural-only stemming. Enough to match "awards"→"award" without mangling names. */
const stem = (term: string): string => {
  if (term.length > 4 && term.endsWith('ies')) return term.slice(0, -3) + 'y';
  if (term.length > 4 && /(sses|shes|ches|xes)$/.test(term)) return term.slice(0, -2);
  if (term.length > 3 && term.endsWith('s') && !term.endsWith('ss') && !term.endsWith('us')) {
    return term.slice(0, -1);
  }
  return term;
};

const tokenize = (input: string): string[] =>
  input
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s-]/g, ' ')
    .split(/[\s.-]+/)
    .map((t) => t.replace(/^[+#]+|[+#]+$/g, ''))
    .filter((t) => t.length > 1 && !STOPWORDS.has(t))
    .map(stem);

/**
 * Visitors ask in different words than the portfolio uses — "what awards has he
 * won" has zero literal overlap with "1st Runner-Up ... Placement". Query terms
 * are expanded with these before scoring; the corpus is indexed as written.
 */
const SYNONYMS: Record<string, string[]> = {
  award: ['place', 'runner', 'hackathon', 'competition', 'placement', 'winner'],
  win: ['place', 'runner', 'hackathon', 'competition', 'placement'],
  won: ['place', 'runner', 'hackathon', 'competition', 'placement'],
  winning: ['place', 'runner', 'hackathon', 'competition', 'placement'],
  prize: ['place', 'runner', 'hackathon', 'competition', 'placement'],
  competition: ['hackathon', 'place', 'runner'],
  available: ['availability', 'internship', 'opportunity', 'immediately', 'remote'],
  availability: ['internship', 'opportunity', 'immediately', 'remote'],
  hire: ['availability', 'internship', 'opportunity', 'contact', 'email'],
  hiring: ['availability', 'internship', 'opportunity', 'contact', 'email'],
  job: ['availability', 'internship', 'opportunity', 'experience', 'role'],
  intern: ['internship', 'availability', 'opportunity'],
  internship: ['availability', 'opportunity', 'remote'],
  contact: ['email', 'linkedin', 'github'],
  reach: ['email', 'linkedin', 'github', 'contact'],
  resume: ['experience', 'role', 'education'],
  cv: ['experience', 'role', 'education'],
  study: ['education', 'university', 'student', 'bachelor'],
  studying: ['education', 'university', 'student', 'bachelor'],
  school: ['education', 'university', 'student'],
  college: ['education', 'university', 'student'],
  degree: ['education', 'university', 'bachelor'],
  cert: ['certification', 'certificate'],
  certificate: ['certification'],
  tech: ['stack', 'technology', 'typescript', 'python'],
  stack: ['technology', 'frontend', 'backend', 'database'],
  tool: ['stack', 'technology'],
  language: ['stack', 'technology', 'typescript', 'python', 'java'],
  built: ['build', 'project', 'developer'],
  build: ['project', 'developer'],
  shipped: ['build', 'project', 'deployed'],
  career: ['experience', 'role', 'founder'],
  startup: ['cdg', 'cascade', 'founder'],
  company: ['cdg', 'cascade', 'founder', 'corporation'],
};

const expand = (terms: string[]): string[] => {
  const out = new Set(terms);
  for (const term of terms) {
    for (const syn of SYNONYMS[term] ?? []) out.add(stem(syn));
  }
  return [...out];
};

/** Flatten the portfolio into retrievable chunks, one per meaningful record. */
const buildCorpus = (): Chunk[] => {
  const { personal, experience, projects, certifications, education, techStack, building, leadership, testimonials } =
    portfolioData;
  const chunks: Chunk[] = [];

  chunks.push({
    id: 'profile',
    section: 'Profile',
    title: personal.name,
    text: [
      `${personal.name} — ${personal.title}.`,
      `Based in ${personal.location}.`,
      personal.bio,
      `Adrian has built ${personal.projectsBuilt} projects in total; the portfolio features a selection of them.`,
      `Competition record — ${personal.awards.summary}. Award-winning problem solver.`,
      `National awards: ${personal.awards.national.join(' ')}`,
      `Regional experience: ${personal.awards.regional.join(' ')}`,
      `Current status: ${personal.quickFacts.status}. Focus: ${personal.quickFacts.focus}.`,
      `Looking for: ${personal.quickFacts.lookingFor}. Availability: ${personal.quickFacts.available}.`,
      `Contact — email ${personal.contact.email}, GitHub ${personal.contact.github}, LinkedIn ${personal.contact.linkedin}, Schedule a meeting / call via ${personal.contact.calLink ?? 'Cal.com'}.`,
    ].join(' '),
  });

  chunks.push({
    id: 'resume',
    section: 'Resume',
    title: 'Resume & CV',
    text: `Adrian Salinas's resume and CV can be viewed online at /resume or downloaded as a PDF from ${personal.contact.resumeFile ?? '/ajsalinas-resume.pdf'}. It summarizes his software engineering and founder experience, skills, education, and credentials.`,
  });

  chunks.push({
    id: 'leadership',
    section: 'Leadership',
    title: 'Leadership and community roles',
    text: `Leadership and community roles Adrian holds: ${leadership
      .map((l) => `${l.role} at ${l.org} (${l.note})`)
      .join('; ')}.`,
  });

  if (testimonials.length > 0) {
    chunks.push({
      id: 'testimonials',
      section: 'Testimonials',
      title: 'What people say about Adrian',
      text: testimonials
        .map((t) => `"${t.quote}" — ${t.name}, ${t.role}${t.org ? `, ${t.org}` : ''}.`)
        .join(' '),
    });
  }

  experience.forEach((role, i) => {
    chunks.push({
      id: `experience-${i}`,
      section: 'Experience',
      title: `${role.role} at ${role.company}`,
      text: `${role.role} at ${role.company} (${role.date}, ${role.location}). ${role.bullets.join(' ')}`,
    });
  });

  building.forEach((item, i) => {
    const role = 'role' in item ? ` Adrian's role: ${item.role}.` : '';
    const cs = 'caseStudy' in item ? item.caseStudy : undefined;
    const slug = 'slug' in item ? item.slug : undefined;
    const study =
      cs && slug
        ? ` Full case study at /work/${slug}: ${cs.summary} ${cs.sections
            .map((sec) => `${sec.heading}: ${sec.body.join(' ')}`)
            .join(' ')}`
        : '';
    chunks.push({
      id: `building-${i}`,
      section: 'Currently building',
      title: item.name,
      text: `${item.name} is a project Adrian is actively building right now.${role} ${item.blurb} Live at ${item.demo}. Source at ${item.repo}.${study}`,
    });
  });

  projects.forEach((project, i) => {
    const placement = 'placement' in project ? ` Result: ${project.placement}.` : '';
    const badge = 'badge' in project ? ` Competition: ${project.badge}.` : '';
    const demo = 'demo' in project ? ` Live demo: ${project.demo}.` : '';
    // Narrow to a local before use: `'caseStudy' in project` doesn't tell
    // TypeScript the optional property is actually defined.
    const cs = 'caseStudy' in project ? project.caseStudy : undefined;
    const slug = 'slug' in project ? project.slug : undefined;
    const study =
      cs && slug
        ? ` Full case study at /work/${slug}: ${cs.summary} ${cs.sections
            .map((sec) => `${sec.heading}: ${sec.body.join(' ')}`)
            .join(' ')}`
        : '';
    chunks.push({
      id: `project-${i}`,
      section: 'Project',
      title: project.title,
      text: `${project.title} (${project.year}) — ${project.oneLiner}. Role: ${project.role}.${badge}${placement} ${project.description} Built with ${project.techStack.join(', ')}.${demo}${study}`,
    });
  });

  certifications.forEach((cert, i) => {
    const cats = 'categories' in cert && Array.isArray(cert.categories) && cert.categories.length > 0
      ? ` Categories: ${cert.categories.join(', ')}.`
      : '';
    chunks.push({
      id: `certification-${i}`,
      section: 'Certification',
      title: cert.title,
      text: `Certification: ${cert.title}, issued by ${cert.issuer} in ${cert.date}.${cats}`,
    });
  });

  education.forEach((entry, i) => {
    const degree = 'degree' in entry && entry.degree ? ` ${entry.degree}.` : '';
    const achievements =
      'achievements' in entry && entry.achievements
        ? ` Leadership roles: ${entry.achievements.map((a) => `${a.role} of ${a.org}`).join(', ')}.`
        : '';
    chunks.push({
      id: `education-${i}`,
      section: 'Education',
      title: entry.institution,
      text: `Education: ${entry.level} at ${entry.institution} (${entry.date}).${degree}${achievements}`,
    });
  });

  Object.entries(techStack).forEach(([category, items]) => {
    chunks.push({
      id: `stack-${category}`,
      section: 'Tech stack',
      title: category,
      text: `${category} technologies Adrian works with: ${items.join(', ')}.`,
    });
  });

  return chunks;
};

const CORPUS = buildCorpus();

/** Per-chunk term frequencies, plus corpus-wide document frequency for IDF. */
const CHUNK_TERMS = CORPUS.map((chunk) => {
  const counts = new Map<string, number>();
  for (const term of tokenize(`${chunk.title} ${chunk.text}`)) {
    counts.set(term, (counts.get(term) ?? 0) + 1);
  }
  return { counts, length: Math.max(1, [...counts.values()].reduce((a, b) => a + b, 0)) };
});

const DOC_FREQ = (() => {
  const df = new Map<string, number>();
  for (const { counts } of CHUNK_TERMS) {
    for (const term of counts.keys()) df.set(term, (df.get(term) ?? 0) + 1);
  }
  return df;
})();

const TITLE_TERMS = CORPUS.map((chunk) => new Set(tokenize(chunk.title)));

const AVG_LENGTH = CHUNK_TERMS.reduce((sum, c) => sum + c.length, 0) / CHUNK_TERMS.length;

// BM25 tuning. `b` controls how hard long chunks are penalised — plain tf/length
// buried the longest entries (Marine-AI) below threshold on broad queries.
const K1 = 1.5;
const B = 0.75;

/**
 * Return the highest-scoring chunks for a query. Scores below `minScore` are
 * dropped so an unrelated question retrieves nothing rather than noise.
 */
export const retrieve = (query: string, topK = 8, minScore = 0.5): Chunk[] => {
  const queryTerms = expand(tokenize(query));
  if (queryTerms.length === 0) return [];

  const scored = CORPUS.map((chunk, i) => {
    const { counts, length } = CHUNK_TERMS[i];
    let score = 0;

    for (const term of queryTerms) {
      const tf = counts.get(term);
      if (!tf) continue;
      const df = DOC_FREQ.get(term) ?? 0;
      const idf = Math.log(1 + (CORPUS.length - df + 0.5) / (df + 0.5));
      // BM25: term frequency saturates, and length is normalised against the
      // corpus average rather than dividing straight through.
      score += idf * ((tf * (K1 + 1)) / (tf + K1 * (1 - B + B * (length / AVG_LENGTH))));
      // A hit in the title is a much stronger signal than one in the body.
      if (TITLE_TERMS[i].has(term)) score += 1.5;
    }

    return { chunk, score };
  });

  return scored
    .filter((s) => s.score >= minScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((s) => s.chunk);
};

/** Render retrieved chunks as the CONTEXT block for the system prompt. */
export const formatContext = (chunks: Chunk[]): string =>
  chunks.map((c) => `[${c.section}: ${c.title}]\n${c.text}`).join('\n\n');
