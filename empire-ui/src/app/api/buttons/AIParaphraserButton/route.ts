import { streamText } from "ai";
import { createOpenAI as createGroq } from "@ai-sdk/openai";
import { NextResponse } from "next/server";

const groq = createGroq({
  baseURL: process.env.BASE_URL,
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const prompt = await req.text();

    const { textStream } = await streamText({
      model: groq("llama-3.1-70b-versatile"),
      system:
        "You are an AI assistant specialized in paraphrasing text. Provide a reworded version of the given text while maintaining its original meaning.",
      prompt: `Please paraphrase the following text:\n\n${prompt}\n\nParaphrased version:`,
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