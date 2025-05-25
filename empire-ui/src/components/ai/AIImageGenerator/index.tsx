import React, { useState } from "react";
import { Button } from "../../base/Button";
import { Card } from "../../base/Card";
import { useTheme } from "../../../hooks/useTheme";
import { useApi } from "../../../hooks/useApi";
import { cn } from "../../../utils/cn";
import {
  Image as ImageIcon,
  Download,
  Settings,
  Loader2,
  Wand2,
  Palette,
  Maximize2,
  Minimize2,
} from "lucide-react";

interface ImageSettings {
  size: "256x256" | "512x512" | "1024x1024";
  style: "natural" | "vivid" | "artistic";
  quality: "standard" | "hd";
}

interface ImageResponse {
  url: string;
  prompt: string;
  settings: ImageSettings;
}

interface AIImageGeneratorProps {
  className?: string;
  onImageGenerated?: (image: ImageResponse) => void;
  placeholder?: string;
  maxImages?: number;
}

export const AIImageGenerator: React.FC<AIImageGeneratorProps> = ({
  className,
  onImageGenerated,
  placeholder = "Describe the image you want to generate...",
  maxImages = 4,
}) => {
  const { theme } = useTheme();
  const { callApi, loading, error } = useApi();
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState<ImageResponse | null>(
    null
  );
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<ImageSettings>({
    size: "512x512",
    style: "natural",
    quality: "standard",
  });

  const handleGenerateImage = async () => {
    if (!prompt.trim()) return;

    try {
      const response = await callApi<ImageResponse>("/api/generate-image", {
        method: "POST",
        body: JSON.stringify({
          prompt,
          settings,
        }),
      });

      setGeneratedImage(response);
      onImageGenerated?.(response);
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  const handleDownload = async () => {
    if (!generatedImage?.url) return;

    try {
      const response = await fetch(generatedImage.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `generated-image-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <Card
      className={cn(
        "flex flex-col h-[600px] w-full max-w-2xl mx-auto bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">AI Image Generator</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowSettings(!showSettings)}
        >
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="border-b p-4 bg-muted/50">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Image Size</label>
              <select
                value={settings.size}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    size: e.target.value as ImageSettings["size"],
                  }))
                }
                className="w-full mt-1 px-3 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="256x256">256x256</option>
                <option value="512x512">512x512</option>
                <option value="1024x1024">1024x1024</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Style</label>
              <select
                value={settings.style}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    style: e.target.value as ImageSettings["style"],
                  }))
                }
                className="w-full mt-1 px-3 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="natural">Natural</option>
                <option value="vivid">Vivid</option>
                <option value="artistic">Artistic</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Quality</label>
              <select
                value={settings.quality}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    quality: e.target.value as ImageSettings["quality"],
                  }))
                }
                className="w-full mt-1 px-3 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="standard">Standard</option>
                <option value="hd">HD</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 space-y-4">
        {/* Input Area */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={placeholder}
            className="flex-1 min-w-0 px-3 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button
            onClick={handleGenerateImage}
            disabled={!prompt.trim() || loading}
            className="transition-colors"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Wand2 className="w-5 h-5" />
            )}
            <span className="ml-2">Generate</span>
          </Button>
        </div>

        {/* Generated Image */}
        {generatedImage && (
          <div className="relative group">
            <img
              src={generatedImage.url}
              alt={generatedImage.prompt}
              className="w-full h-auto rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center gap-2">
              <Button
                variant="secondary"
                size="icon"
                onClick={handleDownload}
                className="bg-white/90 hover:bg-white"
              >
                <Download className="w-5 h-5" />
              </Button>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <p className="text-destructive text-sm animate-in fade-in slide-in-from-bottom-4">
            {error.message}
          </p>
        )}
      </div>
    </Card>
  );
};
