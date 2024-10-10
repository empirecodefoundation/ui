"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Loader2, RefreshCw, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIImageCaptionButtonProps {
  cardClassName?: string;
  buttonClassName?: string;
  inputClassName?: string;
  imageClassName?: string;
  captionClassName?: string;
  onCaptionGenerated?: (caption: string) => void;
}

export const AIImageCaptionButton: React.FC<AIImageCaptionButtonProps> = ({
  cardClassName,
  buttonClassName,
  inputClassName,
  imageClassName,
  captionClassName,
  onCaptionGenerated,
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [caption, setCaption] = useState<string>("");
  const [generating, setGenerating] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateCaption = async () => {
    if (imageFile && imageUrl) {
      setGenerating(true);
      try {
        const response = await fetch("/api/buttons/AIImageCaptionButton", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageUrl }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Caption generation failed");
        }

        const data = await response.json();
        setCaption(data.result);

        if (onCaptionGenerated) {
          onCaptionGenerated(data.result);
        }
      } catch (error) {
        console.error("Error generating caption:", error);
      } finally {
        setGenerating(false);
      }
    } else {
      console.log("No file selected or image URL generated.");
    }
  };

  return (
    <Card className={cn("w-full max-w-lg mx-auto rounded-xl", cardClassName)}>
      <CardHeader className="pb-0">
        <CardTitle className="flex items-center gap-x-2 justify-between">
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={cn(
              "w-full border border-zinc-800 rounded-3xl text-xs",
              inputClassName
            )}
          />
          <motion.button
            onClick={handleGenerateCaption}
            whileTap={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            className={cn(
              "p-2 bg-white text-zinc-800 border-2 border-black rounded-full transition-colors duration-200 hover:bg-zinc-100 hover:text-zinc-700",
              buttonClassName
            )}
            disabled={!imageFile || generating}
          >
            {generating ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : caption ? (
              <RefreshCw className="w-5 h-5" />
            ) : (
              <Sparkles className="w-5 h-5" />
            )}
          </motion.button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Uploaded for captioning"
            className={cn(
              "w-full h-auto max-h-64 rounded-lg my-2",
              imageClassName
            )}
          />
        )}
        {caption && (
          <div className="w-full text-center">
            <p className="text-sm text-muted-foreground border-t-2 py-2">
              Generated Caption
            </p>
            <Textarea
              value={caption}
              readOnly
              className={cn(
                "w-full border h-auto border-zinc-800 rounded-xl resize-none py-2 px-3",
                captionClassName
              )}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
