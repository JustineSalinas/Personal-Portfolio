import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';
import { portfolioData } from '@/data';

const google = createGoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });

const buildContext = () => {
  const p = portfolioData.personal;
  return `You are an AI assistant for ${p.name}'s portfolio website. You are professional, concise, and helpful. Answer questions strictly based on the following context. If asked something outside this context, politely decline.

Name: ${p.name}
Titles: ${p.titles.join(', ')}
Location: ${p.location}
Bio: ${p.bio}

Experience:
${portfolioData.experience.map(e => `- ${e.role} at ${e.company} (${e.date})\n  ${e.bullets.join('\n  ')}`).join('\n')}

Projects:
${portfolioData.projects.map(proj => `- ${proj.title} (${proj.year}): ${proj.description}`).join('\n')}

Skills:
${Object.entries(portfolioData.techStack).map(([k, v]) => `${k}: ${v.join(', ')}`).join('\n')}

Certifications:
${portfolioData.certifications.map(c => `- ${c.title} · ${c.issuer} · ${c.date}`).join('\n')}

Education:
${portfolioData.education.map(e => `- ${e.level} at ${e.institution} (${e.date})`).join('\n')}`;
};

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google('gemini-2.0-flash'),
    system: buildContext(),
    messages,
  });

  return result.toDataStreamResponse();
}
