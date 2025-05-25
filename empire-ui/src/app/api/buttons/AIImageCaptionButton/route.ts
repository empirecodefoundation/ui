import { NextResponse } from "next/server";
import OpenAI from "openai";

// Remove global initialization
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

export async function POST(request: Request) {
  try {
    // Initialize OpenAI client only when the API is called
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY environment variable is not set" },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { imageUrl } = await request.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Generate a social media like caption for this image",
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
      max_tokens: 100,
    });

    const caption = response.choices[0].message.content;

    return NextResponse.json({ result: caption });
  } catch (error) {
    console.error("Error generating caption:", error);
    return NextResponse.json(
      { error: "Failed to generate caption" },
      { status: 500 }
    );
  }
}
