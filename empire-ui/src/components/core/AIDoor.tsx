"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";
import { GoogleGenAI } from "@google/genai"; // NEW SDK

type BreadcrumbsProps = {
  title: string;
};

export const Breadcrumbs = ({ title }: BreadcrumbsProps) => {
  return (
    <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
      <div className="overflow-hidden text-ellipsis whitespace-nowrap">
        🕌 Magic Gate
      </div>
      <ChevronRightIcon className="h-4 w-4" />
      <div className="font-medium text-foreground">{title}</div>
    </div>
  );
};

type AIDoorProps = {
  userName: string;
  userContext: string;
};

type QuestionHistory = {
  question: string;
  answer: string;
};

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_KEY || "",
});

export default function AIDoor({ userName, userContext }: AIDoorProps) {
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [doorOpen, setDoorOpen] = useState(false);
  const [error, setError] = useState(false);
  const [questionHistory, setQuestionHistory] = useState<QuestionHistory[]>([]);

  const generateQuestion = async () => {
    const historyList = questionHistory
      .map((q, i) => `Q${i + 1}: ${q.question}`)
      .join("\n");

    const prompt = `
You're a wise and mystical genie guarding a magical gate. Your job is to ask one riddle styled question based on something from the user context. Your job is to safegaurd the gate from unwanted intruders.

Context to base question on:
${userContext}

Avoid repeating these questions:
${historyList || "None"}

Output only the question.
    `.trim();

    const res = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            question: {
              type: "string",
            },
          },
          required: ["question"],
        },
      },
    });
    // console.log(res.candidates?.[0]?.content?.parts?.[0]?.text);
    let parsed;
    try {
      const text = res.candidates?.[0]?.content?.parts?.[0]?.text;
      if (typeof text !== "string") {
        throw new Error("AI response is not valid JSON.");
      }
      parsed = JSON.parse(text);
    } catch (e) {
      throw new Error("AI response is not valid JSON.");
    }
    setQuestion(parsed.question || "What is your main project?");
  };

  const validateAnswer = async () => {
    const prompt = `
You're an AI gatekeeper. Based on the context below, determine if the answer correctly responds to the question.

Context:
${userContext}

Question:
${question}

Answer:
${answer}

Only respond with { "correct": true } or { "correct": false }
    `.trim();

    const res = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            correct: { type: "boolean" },
          },
          required: ["correct"],
        },
      },
    });

    let parsed;
    try {
      const text = res.candidates?.[0]?.content?.parts?.[0]?.text;
      if (typeof text !== "string") {
        throw new Error("AI response is not valid JSON.");
      }
      parsed = JSON.parse(text);
    } catch (e) {
      throw new Error("AI response is not valid JSON.");
    }
    return parsed.correct;
  };

  const handleSubmit = async () => {
    const isCorrect = await validateAnswer();
    if (isCorrect) {
      setQuestionHistory((prev) => [...prev, { question, answer }]);
      setDoorOpen(true);
      setError(false);
    } else {
      setError(true);
      setAnswer("");
      setQuestion("❌ That is not correct. Generating a new challenge...");
      setTimeout(() => {
        generateQuestion();
      }, 1500); // add delay for UX, optional
    }
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-10 space-y-8">
      <Breadcrumbs title="Mystic AI Door" />

      <div className="relative w-[300px] h-[300px] rounded-2xl overflow-hidden border-[3px] border-yellow-400 shadow-2xl bg-gradient-to-br from-purple-900 to-fuchsia-900">
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <AnimatePresence mode="wait">
            {!doorOpen ? (
              <>
                <motion.div
                  key="left-door"
                  initial={{ x: 0 }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ duration: 1 }}
                  className="w-1/2 h-full bg-gradient-to-b from-yellow-700 to-yellow-900 rounded-l-2xl border-r-2 border-yellow-300 shadow-inner"
                />
                <motion.div
                  key="right-door"
                  initial={{ x: 0 }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ duration: 1 }}
                  className="w-1/2 h-full bg-gradient-to-b from-yellow-700 to-yellow-900 rounded-r-2xl border-l-2 border-yellow-300 shadow-inner"
                />
              </>
            ) : (
              <motion.div
                key="open"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-yellow-200 text-lg font-semibold px-4"
              >
                ✨ Welcome, noble {userName}! You may now enter.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {!doorOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-4 text-center"
        >
          <p className="text-lg text-blue-600 font-semibold">🧞‍♂️ {question}</p>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className={`w-full rounded-md border px-4 py-2 text-sm text-white bg-zinc-800 placeholder:text-zinc-400 outline-none ${
              error ? "border-red-500" : "border-yellow-300"
            }`}
            placeholder="Speak, friend, and enter..."
          />
          <button
            onClick={handleSubmit}
            className="rounded-md bg-gradient-to-r from-yellow-500 to-yellow-700 px-5 py-2 text-sm font-medium text-white shadow-md hover:from-yellow-400 hover:to-yellow-600 transition-all duration-300"
          >
            Unlock Gate
          </button>
          {error && (
            <p className="text-red-400 text-sm">
              ❌ That is not the correct phrase.
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
}
