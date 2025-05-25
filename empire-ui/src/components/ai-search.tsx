"use client";

import {
    Text,
    CheckCheck,
    ArrowDownWideNarrow,
    CornerRightDown,
    Sparkles,
    Bot,
} from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/lib/use-auto-resize-textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const MODELS = [
    { id: "gpt-4", name: "GPT-4", description: "Most capable model" },
    { id: "gpt-3.5", name: "GPT-3.5", description: "Fast and efficient" },
    { id: "claude", name: "Claude", description: "Balanced performance" },
];

const PROMPT_TAGS = [
    {
        text: "Tech Trends 2024",
        icon: Text,
        colors: {
            icon: "text-blue-600",
            border: "border-blue-500",
            bg: "bg-blue-100",
        },
    },
    {
        text: "AI & ML Insights",
        icon: Bot,
        colors: {
            icon: "text-purple-600",
            border: "border-purple-500",
            bg: "bg-purple-100",
        },
    },
    {
        text: "Future of Work",
        icon: ArrowDownWideNarrow,
        colors: {
            icon: "text-emerald-600",
            border: "border-emerald-500",
            bg: "bg-emerald-100",
        },
    },
    {
        text: "Digital Marketing",
        icon: Sparkles,
        colors: {
            icon: "text-orange-600",
            border: "border-orange-500",
            bg: "bg-orange-100",
        },
    },
];

export default function AISearch() {
    const [inputValue, setInputValue] = useState("");
    const [selectedModel, setSelectedModel] = useState("gpt-4");
    const [isEnhancing, setIsEnhancing] = useState(false);
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 52,
        maxHeight: 200,
    });

    const handleTagClick = (tagText: string) => {
        const newValue = inputValue ? `${inputValue}\n${tagText}: ` : `${tagText}: `;
        setInputValue(newValue);
        adjustHeight();
        textareaRef.current?.focus();
    };

    const enhancePrompt = async () => {
        if (!inputValue.trim()) return;
        
        setIsEnhancing(true);
        // Simulate AI enhancement
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const enhancedPrompt = `Enhanced version of: ${inputValue}`;
        setInputValue(enhancedPrompt);
        adjustHeight();
        setIsEnhancing(false);
    };

    const handleSubmit = () => {
        if (!inputValue.trim()) return;
        // Handle submission with selected model
        console.log("Submitting to model:", selectedModel, inputValue);
        setInputValue("");
        adjustHeight(true);
    };

    return (
        <div className="w-full py-4">
            <div className="relative max-w-xl w-full mx-auto space-y-4">
                {/* Model Selection */}
                <div className="relative border border-black/10 dark:border-white/10 focus-within:border-black/20 dark:focus-within:border-white/20 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] p-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Bot className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-muted-foreground">AI Model</span>
                        </div>
                        <Select value={selectedModel} onValueChange={setSelectedModel}>
                            <SelectTrigger className="w-[140px] h-8 bg-transparent border-none shadow-none focus:ring-0">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {MODELS.map((model) => (
                                    <SelectItem key={model.id} value={model.id} className="cursor-pointer">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">{model.name}</span>
                                            <span className="text-xs text-muted-foreground">({model.description})</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="relative border border-black/10 dark:border-white/10 focus-within:border-black/20 dark:focus-within:border-white/20 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03]">
                    <div className="flex flex-col">
                        <div className="overflow-y-auto max-h-[300px]">
                            <Textarea
                                ref={textareaRef}
                                id="ai-input"
                                placeholder="Enter your prompt here..."
                                className={cn(
                                    "max-w-xl w-full rounded-2xl pr-10 pt-4 pb-12 placeholder:text-black/70 dark:placeholder:text-white/70 border-none focus:ring-3 text-black dark:text-white resize-none text-wrap bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 leading-[1.4]",
                                    "min-h-[120px]",
                                    "max-h-[300px]"
                                )}
                                value={inputValue}
                                onChange={(e) => {
                                    setInputValue(e.target.value);
                                    adjustHeight();
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSubmit();
                                    }
                                }}
                            />
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-2 bg-gradient-to-t from-background/80 to-transparent rounded-b-2xl">
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={enhancePrompt}
                                disabled={isEnhancing || !inputValue.trim()}
                                className="h-8 px-3 gap-2 text-xs font-medium hover:bg-primary/10"
                            >
                                <Sparkles className={cn(
                                    "w-3.5 h-3.5",
                                    isEnhancing && "animate-spin"
                                )} />
                                Enhance Prompt
                            </Button>
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={handleSubmit}
                                disabled={!inputValue.trim()}
                                className="h-8 w-8 p-0 hover:bg-primary/10"
                            >
                                <CornerRightDown className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Prompt Tags */}
                <div className="flex flex-wrap gap-1.5 justify-start">
                    {PROMPT_TAGS.map(({ text, icon: Icon, colors }) => (
                        <button
                            type="button"
                            key={text}
                            onClick={() => handleTagClick(text)}
                            className={cn(
                                "px-3 py-1.5 text-xs font-medium rounded-full",
                                "border transition-all duration-200",
                                "hover:scale-105 active:scale-95",
                                colors.border,
                                colors.bg,
                                "shrink-0"
                            )}
                        >
                            <div className="flex items-center gap-1.5">
                                <Icon className={cn("h-3.5 w-3.5", colors.icon)} />
                                <span className={colors.icon}>
                                    {text}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
