import { convertToCoreMessages, streamText } from "ai";
import { createOpenAI as createGroq } from "@ai-sdk/openai";

const groq = createGroq({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

const structuredOutputPrompt = `
You are a helpful AI assistant.
Ensure that your responses are clear, concise, and directly address the user's query.
`;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: groq("llama-3.1-70b-versatile"),
    system: structuredOutputPrompt,
    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
}
