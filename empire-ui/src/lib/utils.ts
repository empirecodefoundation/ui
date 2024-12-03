import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractMDCodeBlock(content: string): string | null {
  const codeMatch = content.match(/```[\s\S]*?\n([\s\S]*?)```/);
  if (!codeMatch) return null;

  const extractedCode = codeMatch[1].trim();
  return extractedCode.replace(/\bh-screen\b/g, '').trim();
}

export interface Message {
  role: string;
  content: string;
}

export async function getExamples(): Promise<Message[][]> {
  const url = 'https://datasets-server.huggingface.co/rows?dataset=cfahlgren1/react-code-instructions&config=default&split=train';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const { rows } = await response.json();

    // sort by created_at, filter upvoted, take latest 10, and map to messages
    return rows
      .sort((a: any, b: any) => new Date(b.row.created_at).getTime() - new Date(a.row.created_at).getTime())
      .filter((row: any) => row.row.upvoted)
      .slice(0, 5)
      .map((row: any) => row.row.messages);
  } catch (error) {
    console.error('Error fetching examples:', error);
    return [];
  }
}