import React, { useState } from "react";
import { Button } from "../../base/Button";
import { Card } from "../../base/Card";
import { useTheme } from "../../../hooks/useTheme";
import { useApi } from "../../../hooks/useApi";
import { cn } from "../../../utils/cn";
import {
  Code2,
  Settings,
  Loader2,
  Copy,
  Play,
  Check,
  FileCode,
  TestTube2,
  MessageSquare,
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  vs,
} from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeSettings {
  language: string;
  includeComments: boolean;
  includeTests: boolean;
  style: "modern" | "classic" | "minimal";
}

interface CodeResponse {
  code: string;
  explanation: string;
  language: string;
  settings: CodeSettings;
}

interface AICodeAssistantProps {
  className?: string;
  onCodeGenerated?: (code: CodeResponse) => void;
  placeholder?: string;
  initialLanguage?: string;
}

export const AICodeAssistant: React.FC<AICodeAssistantProps> = ({
  className,
  onCodeGenerated,
  placeholder = "Describe the code you want to generate...",
  initialLanguage = "typescript",
}) => {
  const { theme } = useTheme();
  const { callApi, loading, error } = useApi();
  const [prompt, setPrompt] = useState("");
  const [generatedCode, setGeneratedCode] = useState<CodeResponse | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [copied, setCopied] = useState(false);
  const [settings, setSettings] = useState<CodeSettings>({
    language: initialLanguage,
    includeComments: true,
    includeTests: false,
    style: "modern",
  });

  const handleGenerateCode = async () => {
    if (!prompt.trim()) return;

    try {
      const response = await callApi<CodeResponse>("/api/generate-code", {
        method: "POST",
        body: JSON.stringify({
          prompt,
          settings,
        }),
      });

      setGeneratedCode(response);
      onCodeGenerated?.(response);
    } catch (error) {
      console.error("Error generating code:", error);
    }
  };

  const handleCopyCode = async () => {
    if (!generatedCode?.code) return;

    try {
      await navigator.clipboard.writeText(generatedCode.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Error copying code:", error);
    }
  };

  const handleRunCode = async () => {
    if (!generatedCode?.code) return;

    try {
      await callApi("/api/run-code", {
        method: "POST",
        body: JSON.stringify({
          code: generatedCode.code,
          language: generatedCode.language,
        }),
      });
    } catch (error) {
      console.error("Error running code:", error);
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
        <h2 className="text-lg font-semibold">AI Code Assistant</h2>
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
              <label className="text-sm font-medium">Language</label>
              <select
                value={settings.language}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    language: e.target.value,
                  }))
                }
                className="w-full mt-1 px-3 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="typescript">TypeScript</option>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="csharp">C#</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Style</label>
              <select
                value={settings.style}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    style: e.target.value as CodeSettings["style"],
                  }))
                }
                className="w-full mt-1 px-3 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="modern">Modern</option>
                <option value="classic">Classic</option>
                <option value="minimal">Minimal</option>
              </select>
            </div>
            <div className="col-span-2 flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.includeComments}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      includeComments: e.target.checked,
                    }))
                  }
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm">Include Comments</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.includeTests}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      includeTests: e.target.checked,
                    }))
                  }
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm">Include Tests</span>
              </label>
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
            onClick={handleGenerateCode}
            disabled={!prompt.trim() || loading}
            className="transition-colors"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Code2 className="w-5 h-5" />
            )}
            <span className="ml-2">Generate</span>
          </Button>
        </div>

        {/* Generated Code */}
        {generatedCode && (
          <div className="space-y-4">
            <div className="relative group">
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={handleCopyCode}
                  className="bg-white/90 hover:bg-white"
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={handleRunCode}
                  className="bg-white/90 hover:bg-white"
                >
                  <Play className="w-4 h-4" />
                </Button>
              </div>
              <SyntaxHighlighter
                language={generatedCode.language}
                style={theme === "dark" ? vscDarkPlus : vs}
                className="rounded-lg !bg-muted/50 !m-0"
                customStyle={{
                  margin: 0,
                  borderRadius: "0.5rem",
                  background: "transparent",
                }}
              >
                {generatedCode.code}
              </SyntaxHighlighter>
            </div>

            {/* Explanation */}
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-4 h-4" />
                <h3 className="text-sm font-medium">Explanation</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {generatedCode.explanation}
              </p>
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
