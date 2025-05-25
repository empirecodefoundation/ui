// @ts-nocheck
import { NextRequest, NextResponse } from "next/server";

// Types for the analysis result
interface AnalysisResult {
  summary: string;
  keyPoints: string[];
  sentiment: "positive" | "negative" | "neutral";
  entities: string[];
  topics: string[];
  readabilityScore: number;
  wordCount: number;
  confidence: number;
}

// Helper function to extract text from different file types
async function extractTextFromFile(file: File): Promise<string> {
  const fileType = file.type;
  const fileName = file.name.toLowerCase();

  try {
    if (fileType === "text/plain" || fileName.endsWith(".txt")) {
      // Handle plain text files
      return await file.text();
    } 
    else if (fileType === "application/pdf" || fileName.endsWith(".pdf")) {
      // For PDF files - simplified extraction for demo
      // In production, you would use pdf-parse or similar
      const text = await file.text();
      return text || "PDF text extraction requires additional setup. This is a demo with mock content.";
    }
    else if (fileType.startsWith("image/") || fileName.match(/\.(jpg|jpeg|png|gif|bmp|webp)$/)) {
      // For images - mock OCR for demo
      // In production, you would use Tesseract.js, Google Vision API, etc.
      return "This is extracted text from the image using OCR. In a production environment, this would be actual text extracted from the uploaded image using services like Google Vision API, Azure Computer Vision, or Tesseract.js. The text would contain the actual content visible in the image.";
    }
    else {
      throw new Error(`Unsupported file type: ${fileType}`);
    }
  } catch (error) {
    console.error("Error extracting text:", error);
    throw new Error("Failed to extract text from file");
  }
}

// AI Analysis function using OpenAI or mock data for demo
async function analyzeTextWithAI(text: string): Promise<AnalysisResult> {
  const openaiApiKey = process.env.OPENAI_API_KEY;
  
  // For demo purposes, if no API key is provided, return mock data
  if (!openaiApiKey) {
    console.log("No OpenAI API key found, returning mock analysis data");
    
    const wordCount = text.split(/\s+/).length;
    return {
      summary: "This is a mock analysis result. The document appears to contain meaningful content that discusses various topics. In a production environment with proper API keys, this would be an AI-generated summary of the actual document content.",
      keyPoints: [
        "Document contains structured information",
        "Content appears to be well-organized",
        "Multiple topics or themes are present",
        "Text quality is suitable for analysis",
        "Document length is appropriate for processing"
      ],
      sentiment: "neutral" as const,
      entities: ["Demo Entity", "Sample Organization", "Test Location", "Example Person"],
      topics: ["Technology", "Documentation", "Analysis", "AI Processing"],
      readabilityScore: 7,
      wordCount,
      confidence: 0.85
    };
  }

  try {
    const prompt = `
Analyze the following text and provide a comprehensive analysis in JSON format:

Text: "${text}"

Please provide:
1. A concise summary (2-3 sentences)
2. Key points (3-5 bullet points)
3. Sentiment analysis (positive, negative, or neutral)
4. Named entities (people, places, organizations, etc.)
5. Main topics/themes
6. Readability score (1-10, where 10 is most readable)
7. Word count
8. Confidence score (0-1) for the analysis

Return the response as a valid JSON object with the following structure:
{
  "summary": "string",
  "keyPoints": ["string"],
  "sentiment": "positive|negative|neutral",
  "entities": ["string"],
  "topics": ["string"],
  "readabilityScore": number,
  "wordCount": number,
  "confidence": number
}
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openaiApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert document analyzer. Provide accurate, insightful analysis in the requested JSON format."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const analysisText = data.choices[0]?.message?.content;

    if (!analysisText) {
      throw new Error("No analysis received from OpenAI");
    }

    // Parse the JSON response
    try {
      const analysis = JSON.parse(analysisText);
      
      // Validate the response structure
      if (!analysis.summary || !Array.isArray(analysis.keyPoints)) {
        throw new Error("Invalid analysis format received");
      }

      return analysis;
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError);
      
      // Fallback analysis if JSON parsing fails
      return {
        summary: "Analysis completed but response format was invalid. Please check the AI service configuration.",
        keyPoints: ["Document processed", "Analysis attempted", "Manual review recommended"],
        sentiment: "neutral" as const,
        entities: [],
        topics: ["General"],
        readabilityScore: 5,
        wordCount: text.split(/\s+/).length,
        confidence: 0.5
      };
    }

  } catch (error) {
    console.error("AI Analysis Error:", error);
    
    // Fallback analysis
    const wordCount = text.split(/\s+/).length;
    return {
      summary: "Document analysis failed due to AI service error. Basic metrics calculated.",
      keyPoints: [
        `Document contains ${wordCount} words`,
        "AI analysis service unavailable",
        "Manual review recommended"
      ],
      sentiment: "neutral" as const,
      entities: [],
      topics: ["Unknown"],
      readabilityScore: 5,
      wordCount,
      confidence: 0.3
    };
  }
}

// Main API handler
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File size exceeds 10MB limit" },
        { status: 400 }
      );
    }

    // Extract text from the file
    const extractedText = await extractTextFromFile(file);

    if (!extractedText || extractedText.trim().length === 0) {
      return NextResponse.json(
        { error: "No text could be extracted from the file" },
        { status: 400 }
      );
    }

    // Analyze the text with AI
    const analysis = await analyzeTextWithAI(extractedText);

    return NextResponse.json({
      success: true,
      extractedText,
      analysis,
      fileName: file.name,
      fileSize: file.size,
      processedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error("Document analysis error:", error);
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : "Analysis failed",
        details: "Please check your API configuration and try again"
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: "healthy",
    service: "AI Document Analyzer",
    timestamp: new Date().toISOString(),
    requiredEnvVars: {
      OPENAI_API_KEY: !!process.env.OPENAI_API_KEY,
    },
    message: "AI Document Analyzer API is running. Upload a document to analyze it with AI."
  });
}
