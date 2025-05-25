import { streamText } from "ai";
import { createOpenAI as createGroq } from "@ai-sdk/openai";
import { NextResponse } from "next/server";

// const groq = createGroq({
//   baseURL: process.env.BASE_URL,
//   apiKey: process.env.GROQ_API_KEY,
// });

export async function POST(req: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return new NextResponse("GROQ API key not configured", { status: 500 });
    }

    const groq = createGroq({
      baseURL: process.env.BASE_URL,
      apiKey: process.env.GROQ_API_KEY,
    });
    
    const prompt = await req.text();

    const { textStream } = await streamText({
      model: groq("llama3-8b-8192"),
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
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
