import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";
import Groq from "groq-sdk";

export async function POST(request: Request) {
  try {
    // Check if GROQ API key is configured
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ API key not configured" },
        { status: 500 }
      );
    }

    // Initialize Groq client
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    // Parse the form data
    const formData = await request.formData();
    const audioFile = formData.get("file") as File;
    const language = formData.get("language") as string || "en"; // Default to English

    if (!audioFile) {
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 }
      );
    }

    // Create a temporary file
    const bytes = await audioFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const tempFilePath = join(tmpdir(), audioFile.name);
    await writeFile(tempFilePath, buffer);

    // Create a readable stream from the file
    const fs = await import("fs");
    const fileStream = fs.createReadStream(tempFilePath);

    // Transcribe the audio with language support
    console.log("Starting transcription with Groq...");
    const transcription = await groq.audio.transcriptions.create({
      file: fileStream,
      model: "whisper-large-v3", // Could be dynamic based on language
      response_format: "verbose_json",
      language: language, // Add language parameter
    });

    console.log("Transcription completed. Available properties:", Object.keys(transcription));

    // Clean up the temporary file
    fs.unlink(tempFilePath, (err) => {
      if (err) console.error("Error deleting temporary file:", err);
    });

    // Return the transcription
    // Note: segments may not be available in all response formats
    const response: any = {
      text: transcription.text,
    };

    // Safely add segments if they exist (when using verbose_json format)
    if ('segments' in transcription && transcription.segments) {
      response.segments = transcription.segments;
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Transcription error:", error);
    return NextResponse.json(
      { error: "Failed to transcribe audio" },
      { status: 500 }
    );
  }
}
