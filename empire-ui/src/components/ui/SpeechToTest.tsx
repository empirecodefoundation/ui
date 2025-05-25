"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  Mic,
  MicOff,
  Play,
  Pause,
  Square,
  Copy,
  Trash2,
  Volume2,
} from "lucide-react";

export default function SpeechToText() {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [timer, setTimer] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  const [copied, setCopied] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const recognitionRef = useRef(null);
  const timerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      alert("Your browser does not support Speech Recognition API");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptChunk = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptChunk + " ";
        } else {
          interimTranscript += transcriptChunk;
        }
      }

      const fullTranscript = finalTranscript + interimTranscript;
      setTranscript(fullTranscript);
      setWordCount(
        fullTranscript
          .trim()
          .split(/\s+/)
          .filter((word) => word.length > 0).length
      );
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
      recognitionRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (isListening) {
      const animate = () => {
        setAudioLevel(Math.random() * 100);
        animationRef.current = requestAnimationFrame(animate);
      };
      animate();
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      setAudioLevel(0);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isListening]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      clearInterval(timerRef.current);
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setTimer(0);
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
      setIsListening(true);
    }
  };

  const clearTranscript = () => {
    setTranscript("");
    setWordCount(0);
  };

  const copyToClipboard = async () => {
    if (transcript) {
      await navigator.clipboard.writeText(transcript);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatTime = (sec) =>
    `${Math.floor(sec / 60)
      .toString()
      .padStart(2, "0")}:${(sec % 60).toString().padStart(2, "0")}`;

  return (
    <div
      className={`min-h-screen transition-all duration-1000 ease-in-out ${
        isListening
          ? "bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
          : "bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900"
      }`}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-20 animate-pulse ${
              isListening ? "animate-bounce" : ""
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          {/* Main Card */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 transition-all duration-500 hover:shadow-purple-500/20 hover:shadow-3xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg">
                <Volume2 className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI Speech Recognition
              </h1>
              <p className="text-gray-300">
                Transform your voice into text with stunning precision
              </p>
            </div>

            {/* Audio Visualizer */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-end space-x-1 h-16">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 bg-gradient-to-t from-purple-500 to-cyan-400 rounded-full transition-all duration-150 ${
                      isListening ? "animate-pulse" : ""
                    }`}
                    style={{
                      height: isListening
                        ? `${20 + ((audioLevel + i * 10) % 40)}px`
                        : "8px",
                      animationDelay: `${i * 100}ms`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <button
                onClick={toggleListening}
                className={`flex items-center space-x-3 px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-lg ${
                  isListening
                    ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 animate-pulse shadow-red-500/50"
                    : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-green-500/50"
                }`}
              >
                {isListening ? (
                  <MicOff className="w-5 h-5" />
                ) : (
                  <Mic className="w-5 h-5" />
                )}
                <span className="text-lg">
                  {isListening ? "Stop Recording" : "Start Recording"}
                </span>
              </button>

              {transcript && (
                <div className="flex space-x-2">
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center space-x-2 px-6 py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 rounded-xl text-blue-300 transition-all duration-300 hover:scale-105"
                  >
                    <Copy className="w-4 h-4" />
                    <span>{copied ? "Copied!" : "Copy"}</span>
                  </button>

                  <button
                    onClick={clearTranscript}
                    className="flex items-center space-x-2 px-6 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 rounded-xl text-red-300 transition-all duration-300 hover:scale-105"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Clear</span>
                  </button>
                </div>
              )}
            </div>

            {/* Stats Bar */}
            <div className="flex justify-center items-center space-x-8 mb-6">
              {isListening && (
                <div className="flex items-center space-x-2 text-purple-300">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="font-mono text-sm">
                    REC {formatTime(timer)}
                  </span>
                </div>
              )}

              {wordCount > 0 && (
                <div className="text-cyan-300 text-sm">
                  <span className="font-semibold">{wordCount}</span> words
                </div>
              )}
            </div>

            {/* Transcript Display */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-2xl blur-xl"></div>
              <div
                className="relative bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6 min-h-[200px] max-h-[400px] overflow-y-auto transition-all duration-300"
                style={{
                  boxShadow: isListening
                    ? "0 0 30px rgba(168, 85, 247, 0.3)"
                    : "0 0 20px rgba(0, 0, 0, 0.3)",
                }}
              >
                {transcript ? (
                  <div className="text-white leading-relaxed text-lg font-light">
                    {transcript.split(" ").map((word, index) => (
                      <span
                        key={index}
                        className="inline-block mr-1 mb-1 transition-all duration-300 hover:text-purple-300"
                        style={{
                          animationDelay: `${index * 50}ms`,
                        }}
                      >
                        {word}
                      </span>
                    ))}
                    {isListening && (
                      <span className="inline-block w-0.5 h-6 bg-purple-400 ml-1 animate-pulse"></span>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <Mic className="w-12 h-12 mb-4 opacity-50" />
                    <p className="text-lg mb-2">Ready to listen...</p>
                    <p className="text-sm opacity-70">
                      Click "Start Recording" to begin speech recognition
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-6 text-gray-400 text-sm">
              Powered by Web Speech API • Real-time transcription
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
