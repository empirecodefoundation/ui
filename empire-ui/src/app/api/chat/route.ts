import { convertToCoreMessages, streamText } from "ai";
import { createOpenAI as createGroq } from "@ai-sdk/openai";

const structuredOutputPrompt = `
You are a helpful AI assistant.
Ensure that your responses are clear, concise, and directly address the user's query.
`;

export async function POST(req: Request) {
  // Check for API key
  if (!process.env.GROQ_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'GROQ_API_KEY environment variable is not set' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
  
  // Initialize client inside handler
  const groq = createGroq({
    baseURL: "https://api.groq.com/openai/v1",
    apiKey: process.env.GROQ_API_KEY,
  });

  const { messages } = await req.json();

  const result = await streamText({
    model: groq("llama-3.1-70b-versatile"),
    system: structuredOutputPrompt,
    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
}
