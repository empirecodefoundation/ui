import { NextRequest, NextResponse } from "next/server";
import { Client } from "@gradio/client";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { model, messages, isUpvote } = body;

    if (!model || !messages || isUpvote === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!process.env.HUGGINGFACE_API_KEY || !process.env.HUGGINGFACE_API_KEY.startsWith("hf_")) {
      console.error("Hugging Face API key is not configured. Please set the HUGGINGFACE_API_KEY environment variable.");
      return NextResponse.json(
        { error: "Hugging Face API key is not configured. Please set the HUGGINGFACE_API_KEY environment variable." },
        { status: 500 }
      );
    }

    const client = await Client.connect("cfahlgren1/react-code-instructions-api", { 
      hf_token: process.env.HUGGINGFACE_API_KEY as `hf_${string}`
    });

    const result = await client.predict("/handle_submit", {
      model,
      messages,
      upvoted: isUpvote,
    });

    return NextResponse.json(result.data);
  } catch (error) {
    console.error("Error in feedback endpoint:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}