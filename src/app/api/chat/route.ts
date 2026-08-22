import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';
import { portfolioData } from '@/data';
import { formatContext, retrieve } from '@/lib/rag';

export const maxDuration = 30;

const google = createGoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 * Google retires Gemini models fairly aggressively — gemini-2.0-flash and
 * gemini-2.5-flash both return "no longer available" on this key. Verify with
 * the ListModels endpoint before changing this.
 */
const MODEL = 'gemini-3.6-flash';

const CONTACT_EMAIL = portfolioData.personal.contact.email;

interface IncomingMessage {
  role: 'user' | 'assistant';
  content: string;
}

const buildSystemPrompt = (context: string) => `
You are the portfolio assistant for ${portfolioData.personal.name} (also called AJ), a full-stack developer and founder based in ${portfolioData.personal.location}.

HOW TO ANSWER

1. Questions about Adrian — his work, projects, experience, education, skills, certifications, hackathons, availability, or how to contact him:
   Answer using the CONTEXT below. It is retrieved from his portfolio and is the source of truth. If the CONTEXT does not cover the specific detail asked, say what you do know and note that the detail isn't listed on the portfolio. Never invent employers, dates, awards, metrics, or links.

2. Any other question — general knowledge, programming help, explanations, advice, casual conversation:
   Just answer it normally and helpfully, using your own knowledge. Do not refuse, and do not tell the user the question is off-topic. Keep it reasonably brief, and where it feels natural you may connect it back to Adrian's work, but never force this.

STYLE
- Conversational and direct. No preamble like "Great question".
- Use short paragraphs. Use **bold** for emphasis and "- " for bullet lists.
- Two to five sentences for simple questions; expand only when the question needs it.
- Refer to Adrian in the third person.

CONTEXT
${context || '(no portfolio entries matched this question — it is probably a general question, so answer it normally)'}
`.trim();

export async function POST(req: Request) {
  if (!process.env.GEMINI_API_KEY) {
    return new Response('The assistant is not configured: GEMINI_API_KEY is missing.', {
      status: 500,
    });
  }

  let messages: IncomingMessage[];
  try {
    ({ messages } = await req.json());
  } catch {
    return new Response('Invalid request body.', { status: 400 });
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response('No messages provided.', { status: 400 });
  }

  // Retrieve against the newest user turn, with the previous one folded in so
  // short follow-ups ("what about the second one?") still hit the right chunks.
  const userTurns = messages.filter((m) => m.role === 'user');
  const query = userTurns
    .slice(-2)
    .map((m) => m.content)
    .join(' ');

  const context = formatContext(retrieve(query));

  let failure: string | null = null;

  const result = streamText({
    model: google(MODEL),
    system: buildSystemPrompt(context),
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
    onError: ({ error }) => {
      console.error('[api/chat] stream failed:', error);
      const text = String(error);
      // Free-tier exhaustion is the likeliest failure once the site gets shared,
      // and it must not read as "the site is broken".
      failure = /quota|rate.?limit|429/i.test(text)
        ? `The assistant has hit its daily limit. Everything else on this page still works — ` +
          `for anything urgent, email ${CONTACT_EMAIL}.`
        : `The assistant is unavailable right now. You can reach Adrian directly at ${CONTACT_EMAIL}.`;
    },
  });

  // toTextStreamResponse() turns a failed stream into a silent, empty 200. Wrap
  // it so an empty result is replaced by an explanation the visitor can act on.
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const encoder = new TextEncoder();
      let emitted = false;

      try {
        for await (const chunk of result.textStream) {
          if (chunk) emitted = true;
          controller.enqueue(encoder.encode(chunk));
        }
      } catch (error) {
        console.error('[api/chat] stream aborted:', error);
      }

      if (!emitted) {
        controller.enqueue(
          encoder.encode(
            failure ?? `The assistant did not return anything. You can reach Adrian at ${CONTACT_EMAIL}.`
          )
        );
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
