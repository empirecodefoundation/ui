"use client";

import React, { useState, useRef, useEffect } from "react";
import { Check, X, Shield } from "lucide-react";

export default function PasscodeCardPreview() {
  const [passcode, setPasscode] = useState<string[]>(Array(6).fill(""));
  const [isComplete, setIsComplete] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [attempts, setAttempts] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const correctPasscode = "123456"; // Demo passcode

  useEffect(() => {
    const currentPasscode = passcode.join("");
    if (currentPasscode.length === 6) {
      setIsComplete(true);
      setTimeout(() => {
        if (currentPasscode === correctPasscode) {
          setIsCorrect(true);
        } else {
          setIsCorrect(false);
          setAttempts(prev => prev + 1);
          // Reset passcode after wrong attempt
          setTimeout(() => {
            setPasscode(Array(6).fill(""));
            setIsComplete(false);
            setIsCorrect(null);
            inputRefs.current[0]?.focus();
          }, 2000);
        }
      }, 500);
    } else {
      setIsComplete(false);
      setIsCorrect(null);
    }
  }, [passcode]);

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits
    
    const newPasscode = [...passcode];
    newPasscode[index] = value.slice(-1); // Only take the last digit
    setPasscode(newPasscode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !passcode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newPasscode = Array(6).fill("");
    for (let i = 0; i < pastedData.length; i++) {
      newPasscode[i] = pastedData[i];
    }
    setPasscode(newPasscode);
    
    // Focus the next empty input or the last one
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const resetPasscode = () => {
    setPasscode(Array(6).fill(""));
    setIsComplete(false);
    setIsCorrect(null);
    setAttempts(0);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Enter Passcode</h3>
          <p className="text-gray-600 text-sm mt-1">
            Enter your 6-digit security code
          </p>
          {attempts > 0 && (
            <p className="text-red-600 text-xs mt-2">
              {attempts} failed attempt{attempts > 1 ? 's' : ''}
            </p>
          )}
        </div>

        <div className="space-y-6">
          {/* Passcode Input */}
          <div className="flex justify-center space-x-3">
            {passcode.map((digit, index) => (
              <input
                key={index}
                ref={el => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleInputChange(index, e.target.value)}
                onKeyDown={e => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className={`w-12 h-12 text-center text-lg font-semibold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                  isCorrect === true
                    ? "border-green-500 bg-green-50 text-green-700"
                    : isCorrect === false
                    ? "border-red-500 bg-red-50 text-red-700 animate-shake"
                    : isComplete
                    ? "border-blue-500 bg-blue-50"
                    : digit
                    ? "border-gray-400 bg-gray-50"
                    : "border-gray-300"
                }`}
                disabled={isCorrect === true}
              />
            ))}
          </div>

          {/* Status */}
          <div className="text-center">
            {isCorrect === true && (
              <div className="flex items-center justify-center text-green-600">
                <Check className="w-5 h-5 mr-2" />
                <span className="font-medium">Access Granted</span>
              </div>
            )}
            {isCorrect === false && (
              <div className="flex items-center justify-center text-red-600">
                <X className="w-5 h-5 mr-2" />
                <span className="font-medium">Incorrect Passcode</span>
              </div>
            )}
            {isCorrect === null && !isComplete && (
              <div className="text-gray-500 text-sm">
                {passcode.filter(d => d).length}/6 digits entered
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="space-y-3">
            {isCorrect !== true && (
              <button
                onClick={resetPasscode}
                className="w-full py-2 px-4 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Clear and try again
              </button>
            )}
            
            <div className="text-center">
              <p className="text-xs text-gray-500">
                Demo: Try "123456" for success
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 