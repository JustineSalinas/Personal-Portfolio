import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from 'ai';
import { portfolioData } from '@/data';

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const runtime = 'edge';

// Build a system prompt context from the portfolio data
const buildContext = () => {
  const p = portfolioData.personal;
  return `
    You are an AI assistant for ${p.name}'s portfolio website. 
    You are professional, concise, and helpful. You answer questions strictly based on the following context.
    If asked something outside this context, politely decline.
    
    Name: ${p.name}
    Titles: ${p.titles.join(', ')}
    Location: ${p.location}
    Bio: ${p.bio}
    
    Experience:
    ${portfolioData.experience.map(e => `- ${e.role} at ${e.company} (${e.date})`).join('\n')}
    
    Projects:
    ${portfolioData.projects.map(p => `- ${p.title}: ${p.description}`).join('\n')}
    
    Skills:
    ${Object.entries(portfolioData.techStack).map(([k, v]) => `${k}: ${v.join(', ')}`).join('\n')}
  `;
};

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Use gemini-pro model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Format previous messages for Gemini
    const geminiMessages = messages.map((m: Message) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    // Inject system prompt as the first interaction
    const contextPrompt = {
      role: 'user',
      parts: [{ text: buildContext() + "\n\nUser Question: " + messages[messages.length - 1].content }],
    };

    // Prepare chat
    const chat = model.startChat({
      history: geminiMessages.slice(0, -1),
    });

    const result = await chat.sendMessageStream(contextPrompt.parts[0].text);
    
    // Stream response back to client using Vercel AI SDK helper
    const stream = GoogleGenerativeAIStream(result);
    return new StreamingTextResponse(stream);

  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response('Error connecting to AI', { status: 500 });
  }
}
