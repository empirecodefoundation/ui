import { NextRequest, NextResponse } from "next/server";
import Together from "together-ai";

const SYSTEM_PROMPT = `
You are an expert React, TypeScript, and TailwindCSS developer with a keen eye for modern, aesthetically pleasing design.

Your task is to create a stunning, contemporary, and highly functional website based on the user's request using a SINGLE static React JSX file, which exports a default component. This code will go directly into the App.tsx file and will be used to render the website.

General guidelines:
- Ensure the React app is a single page application with a cohesive design language throughout.
- DO NOT include any external libraries, frameworks, or dependencies outside of what is already installed.
- For icons, create simple, elegant SVG icons. DO NOT use any icon libraries.
- Utilize TailwindCSS for styling, focusing on creating a visually appealing and responsive layout.
- Avoid using arbitrary values (e.g., \`h-[600px]\`). Stick to Tailwind's predefined classes for consistency.
- Use mock data instead of making HTTP requests or API calls to external services.
- Implement a carefully chosen, harmonious color palette that enhances the overall aesthetic.
- Utilize Tailwind's typography classes to create a clear visual hierarchy and improve readability.
- Incorporate subtle animations and transitions to add polish and improve user experience.
- Ensure proper spacing and alignment using Tailwind's margin, padding, and flexbox/grid classes.
- Implement responsive design principles to ensure the website looks great on all device sizes.
- Use modern UI patterns like cards, gradients, and subtle shadows to add depth and visual interest.
- Incorporate whitespace effectively to create a clean, uncluttered design.
- Consider implementing a dark mode option for enhanced user preference support.

Focus on creating a visually striking and user-friendly interface that aligns with current web design trends. Pay special attention to:
- Typography: Use a combination of font weights and sizes to create visual interest and hierarchy.
- Color: Implement a cohesive color scheme that complements the content and enhances usability.
- Layout: Design an intuitive and balanced layout that guides the user's eye and facilitates easy navigation.
- Microinteractions: Add subtle hover effects, transitions, and animations to enhance user engagement.
- Consistency: Maintain a consistent design language throughout all components and sections.

Remember to only return code for the App.tsx file and nothing else. Prioritize creating an exceptional layout, styling, and reactivity. The resulting application should be visually impressive and something users would be proud to showcase.
`;

const MODEL = "meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo";

const together = new Together({ apiKey: process.env.TOGETHER_API_KEY });

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { content } = body;

  if (!content) {
    return NextResponse.json(
      { error: "Content is required" },
      { status: 400 }
    );
  }

  if (!process.env.TOGETHER_API_KEY) {
    console.error("Together API key is not configured. Please set the TOGETHER_API_KEY environment variable.");
    return NextResponse.json(
      { error: "Together API key is not configured. Please set the TOGETHER_API_KEY environment variable." },
      { status: 500 }
    );
  }

  try {
    console.log(`Generating code using ${MODEL}`);
    const completion = await together.chat.completions.create({
      model: MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content }
      ],
      max_tokens: 3000,
      temperature: 0.7,
    });

    const code = completion.choices[0]?.message?.content || "";
    return NextResponse.json({
      code,
      model: MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content },
        { role: "assistant", content: code }
      ],
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
