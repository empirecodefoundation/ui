'use client';

import { Inter } from "next/font/google";
import { Sandpack } from "@/components/Sandpack";
import { useEffect, useState } from "react";
import { KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { toast, Toaster } from "sonner";
import { useCallback } from "react";
import { getExamples } from "@/lib/utils";
import type { Message } from "@/lib/utils";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [hasVoted, setHasVoted] = useState(false);
  const [model, setModel] = useState("");
  const [messages, setMessages] = useState([]);
  const [examples, setExamples] = useState<Message[][]>([]);

  const fetchGeneratedCode = useCallback(async (content: string) => {
    setIsLoading(true);
    setHasVoted(false);
    try {
      const response = await fetch('/api/artifacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch generated code');
      }

      const data = await response.json();
      setModel(data.model);
      setMessages(data.messages);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong, please wait a couple minutes and try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleInputKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation(); 
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      fetchGeneratedCode(inputValue.trim());
    }
  }, [inputValue, fetchGeneratedCode]);

  const handleVote = useCallback(async (isUpvote: boolean) => {
    if (hasVoted) return;
    toast.info("Thank you for your feedback! 🤗");
    setHasVoted(true);

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          isUpvote, 
          model, 
          messages
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to submit feedback. Please try again.");
      setHasVoted(false);
    }
  }, [hasVoted, model, messages]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setInputValue(e.target.value);
  }, []);

  useEffect(() => {
    async function fetchExamples() {
      const fetchedExamples = await getExamples();
      setExamples(fetchedExamples);
    }

    fetchExamples();
  }, []);

  return (
    <main
      className={`min-h-screen flex bg-[#171717] flex-col p-8 ${inter.className} text-white relative`}
    >
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="relative">
        <div className="text-center mt-10 mb-4">
          <h1 className="text-5xl font-extrabold mb-2">
            Empire Foundation <span className="text-red-600">Artifacts</span>
          </h1>
          <p className="text-xl text-gray-300 mb-2 font-light">Use your imagination and let Empire Foundation build it for you.</p>
        </div>
        <div className="w-full max-w-xl mx-auto mb-6 mt-20">
          <Input
            id="description"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            className="w-full placeholder:text-slate-300 placeholder:opacity-50 h-12 rounded-md bg-[#171717] border-[#2F2E2E] border-[1.5px] text-white"
            placeholder="portfolio website that looks like LinkedIn"
            autoComplete="off"
            autoFocus
            onFocus={(e) => {
              e.stopPropagation();
              e.target.select();
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        <div className="w-full mt-10 max-w-5xl mx-auto flex flex-col">
          {isLoading ? (
            <div className="flex flex-col justify-center items-center h-60vh">
              <h1 className="text-sm italic mb-4 text-gray-300">Cooking something delicious for you! 🤗</h1>
              <img src="/cooking.gif" alt="loading" className="w-48" />
            </div>
          ) : messages.length > 0 ? (
            <Sandpack 
              onVote={handleVote}
              hasVoted={hasVoted}
              messages={messages}
            />
          ) : null}
        </div>

        <div className="w-full max-w-5xl mx-auto flex flex-col min-h-[20vh] pt-[20vh]">
          <div className="w-full text-black">
            <Carousel
              opts={{
                align: "center",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {examples.map((example, index) => (
                  <CarouselItem key={index}>
                    <Sandpack messages={example} readonly />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
      <Toaster />
    </main>
  );
}