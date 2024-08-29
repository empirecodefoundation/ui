import { streamText } from "ai";
import { createOpenAI as createGroq } from "@ai-sdk/openai";
import { NextResponse } from "next/server";

const groq = createGroq({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  const prompt = await req.text();

  const { textStream } = await streamText({
    model: groq("llama-3.1-70b-versatile"),
    system:
      "You are an AI assistant specialized in summarizing text. Provide concise and accurate summaries.",
    prompt: prompt,
  });

  return new NextResponse(textStream, {
    headers: {
      "Content-Type": "text/plain",
      "Transfer-Encoding": "chunked",
    },
  });
}
