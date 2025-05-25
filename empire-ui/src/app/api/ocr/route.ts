import { NextResponse } from 'next/server';
import { ocr } from 'llama-ocr';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import os from 'os';
import Groq from "groq-sdk";

async function generateAnalysis(ocrText: string, section: string) {
  if (!process.env.GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY environment variable is not set');
  }
  
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
  });
  
  const prompt = `
    Analyze the following annual report text and generate a detailed analysis for the "${section}" section.
    Focus on extracting and analyzing relevant information specific to this section.
    Format the response in markdown with clear headings, bullet points, and highlights of key information.
    If certain information is not available in the text, make reasonable inferences based on available context.
    
    Text to analyze:
    ${ocrText}

    Generate a professional, well-structured analysis focusing on ${section}.
  `;

  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama3-8b-8192",
    temperature: 0.1,
  });

  return {
    title: section,
    content: completion.choices[0]?.message?.content || "Analysis not available"
  };
}

const sections = [
  "Executive Summary",
  "Chairperson's Letter",
  "Company Overview",
  "Financial Highlights",
  "Business Review",
  "Strategic Initiatives",
  "Corporate Governance",
  "Sustainability and CSR Initiatives",
  "Risk Factors and Management",
  "Future Outlook"
];

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const images = formData.getAll('images') as File[];
    const apiKey = formData.get('apiKey') as string;

    if (!images || images.length === 0) {
      return NextResponse.json(
        { error: 'No images provided' },
        { status: 400 }
      );
    }

    // Process all images and combine their OCR results
    const ocrResults = await Promise.all(
      images.map(async (image) => {
        const tempDir = os.tmpdir();
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const tempPath = join(tempDir, image.name);
        
        await writeFile(tempPath, buffer);

        return await ocr({
          filePath: tempPath,
          apiKey: apiKey || process.env.TOGETHER_API_KEY,
        });
      })
    );

    // Combine all OCR results with page breaks
    const combinedOcrText = ocrResults.join('\n\n--- Page Break ---\n\n');

    // Generate analysis for each section using the combined text
    const analysisPromises = sections.map(section => 
      generateAnalysis(combinedOcrText, section)
    );

    const analyses = await Promise.all(analysisPromises);

    return NextResponse.json({ 
      text: combinedOcrText,
      analyses 
    });
  } catch (error) {
    console.error('Error processing:', error);
    return NextResponse.json(
      { error: 'Failed to process images', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}