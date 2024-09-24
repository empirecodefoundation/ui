"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface PasscodeCardProps {
  length: number;
  correctPasscode: string;
}

export const PasscodeCard: React.FC<PasscodeCardProps> = ({
  correctPasscode,
  length,
}) => {
  const [passcode, setPasscode] = useState<string>("");
  const [isShaking, setIsShaking] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePasscodeChange = (value: string) => {
    setPasscode(value);
    if (value.length === length) {
      if (value !== correctPasscode) {
        setIsShaking(true);
        setTimeout(() => {
          setPasscode("");
        }, 500);
      } else {
        setIsSuccess(true);
      }
    }
  };

  useEffect(() => {
    if (isShaking) {
      const timer = setTimeout(() => setIsShaking(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isShaking]);

  return (
    <Card className={`w-96 ${isShaking ? "animate-shake" : ""} shadow-lg`}>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center">
          Enter Passcode
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex items-center justify-center">
          <InputOTP
            maxLength={length}
            onChange={handlePasscodeChange}
            value={passcode}
          >
            <InputOTPGroup>
              {Array.from({ length: length }, (_, index) => (
                <InputOTPSlot key={index} index={index} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>
        {isSuccess ? (
          <div className="text-center font-semibold">Correct passcode!</div>
        ) : (
          <div className="text-center text-sm text-gray-500">
            Enter your 6-digit passcode
          </div>
        )}
        <Button
          className="w-full mt-4"
          onClick={() => {
            setPasscode("");
            setIsSuccess(false);
          }}
        >
          Reset
        </Button>
      </CardContent>
    </Card>
  );
};
