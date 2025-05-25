"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, MessageSquare, Palette, ImageIcon, Sun, User, Gauge, Wand2, Loader2, Monitor, Image } from "lucide-react"

export default function AICardGenerator() {
    const [prompt, setPrompt] = useState("Picture of a woman with orange background")
    const [style, setStyle] = useState("professional")
    const [background, setBackground] = useState("studio")
    const [lighting, setLighting] = useState("soft")
    const [pose, setPose] = useState("candid")
    const [isEnhancing, setIsEnhancing] = useState(false)
    const [isGenerating, setIsGenerating] = useState(false)
    const [generatedImage, setGeneratedImage] = useState<string | null>(null)

    const enhancePrompt = async () => {
        setIsEnhancing(true)

        // Simulate AI enhancement
        await new Promise((resolve) => setTimeout(resolve, 2000))

        const enhancedPrompt = `Professional portrait of a woman with vibrant orange background, ${style.toLowerCase()} style, ${lighting.toLowerCase()} lighting setup, ${pose.toLowerCase()} pose, high quality photography, detailed facial features, perfect composition, cinematic lighting`

        setPrompt(enhancedPrompt)
        setIsEnhancing(false)
    }

    const generatePortrait = async () => {
        setIsGenerating(true)

        // Simulate image generation
        await new Promise((resolve) => setTimeout(resolve, 3000))

        // Set a placeholder image
        setGeneratedImage("/placeholder.svg?height=400&width=400")
        setIsGenerating(false)
    }

    return (
        <div className="min-h-screen bg-background p-6">
            <div className="max-w-md mx-auto space-y-6">
                <Card className="transition-all duration-200 hover:shadow-lg hover:scale-[1.01]">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-2xl font-semibold group">
                            <span className="inline-flex items-center gap-2">
                                AI Portrait Generation
                                <Sparkles className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                            </span>
                        </CardTitle>
                        <p className="text-muted-foreground text-sm">Create stunning portraits with AI</p>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Prompt Section */}
                        <div className="space-y-3 group">
                            <div className="flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
                                <MessageSquare className="w-4 h-4" />
                                <Label>Prompt</Label>
                            </div>
                            <div className="relative">
                                <Input
                                    value={prompt}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrompt(e.target.value)}
                                    className="pr-12 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                                    placeholder="Describe your portrait..."
                                />
                                <Button
                                    onClick={enhancePrompt}
                                    disabled={isEnhancing}
                                    size="sm"
                                    variant="ghost"
                                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-primary/10 transition-colors"
                                >
                                    <Wand2 className={`w-4 h-4 ${isEnhancing ? "animate-spin" : ""}`} />
                                </Button>
                            </div>
                        </div>

                        {/* Style Section */}
                        <div className="space-y-4 p-4 rounded-lg border bg-card transition-all duration-200  hover:shadow-sm">
                            <div className="flex items-center justify-between gap-4 group">
                                <div className="flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
                                    <Palette className="w-4 h-4" />
                                    <span className="text-sm">Style</span>
                                </div>
                                <Select
                                    value={style}
                                    onValueChange={(value: string) => setStyle(value)}
                                >
                                    <SelectTrigger className="w-[140px] transition-all duration-200 hover:border-primary/50">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="professional" className="cursor-pointer hover:bg-primary/10">Professional</SelectItem>
                                        <SelectItem value="artistic" className="cursor-pointer hover:bg-primary/10">Artistic</SelectItem>
                                        <SelectItem value="casual" className="cursor-pointer hover:bg-primary/10">Casual</SelectItem>
                                        <SelectItem value="vintage" className="cursor-pointer hover:bg-primary/10">Vintage</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center justify-between gap-4 group">
                                <div className="flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
                                    <Image className="w-4 h-4" />
                                    <span className="text-sm">Background</span>
                                </div>
                                <Select
                                    value={background}
                                    onValueChange={(value: string) => setBackground(value)}
                                >
                                    <SelectTrigger className="w-[140px] transition-all duration-200 hover:border-primary/50">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="studio" className="cursor-pointer hover:bg-primary/10">Studio</SelectItem>
                                        <SelectItem value="gradient" className="cursor-pointer hover:bg-primary/10">Gradient</SelectItem>
                                        <SelectItem value="solid" className="cursor-pointer hover:bg-primary/10">Solid Color</SelectItem>
                                        <SelectItem value="transparent" className="cursor-pointer hover:bg-primary/10">Transparent</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center justify-between gap-4 group">
                                <div className="flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
                                    <Sun className="w-4 h-4" />
                                    <span className="text-sm">Lighting</span>
                                </div>
                                <Select
                                    value={lighting}
                                    onValueChange={(value: string) => setLighting(value)}
                                >
                                    <SelectTrigger className="w-[140px] transition-all duration-200 hover:border-primary/50">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="soft" className="cursor-pointer hover:bg-primary/10">Soft</SelectItem>
                                        <SelectItem value="dramatic" className="cursor-pointer hover:bg-primary/10">Dramatic</SelectItem>
                                        <SelectItem value="natural" className="cursor-pointer hover:bg-primary/10">Natural</SelectItem>
                                        <SelectItem value="studio" className="cursor-pointer hover:bg-primary/10">Studio</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center justify-between gap-4 group">
                                <div className="flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
                                    <User className="w-4 h-4" />
                                    <span className="text-sm">Pose</span>
                                </div>
                                <Select
                                    value={pose}
                                    onValueChange={(value: string) => setPose(value)}
                                >
                                    <SelectTrigger className="w-[140px] transition-all duration-200 hover:border-primary/50">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="candid" className="cursor-pointer hover:bg-primary/10">Candid</SelectItem>
                                        <SelectItem value="front" className="cursor-pointer hover:bg-primary/10">Front</SelectItem>
                                        <SelectItem value="three-quarter" className="cursor-pointer hover:bg-primary/10">Three Quarter</SelectItem>
                                        <SelectItem value="profile" className="cursor-pointer hover:bg-primary/10">Profile</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center justify-between gap-4 group">
                                <div className="flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
                                    <Monitor className="w-4 h-4" />
                                    <span className="text-sm">Quality</span>
                                </div>
                                <span className="text-sm font-medium px-2 py-1 rounded-md bg-primary/10 text-primary">
                                    720p
                                </span>
                            </div>
                        </div>

                        {/* Generate Button */}
                        <Button
                            onClick={generatePortrait}
                            disabled={isGenerating}
                            className="w-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                            size="lg"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-4 h-4 mr-2" />
                                    Generate Portrait
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>

                {/* Generated Image Preview Card */}
                {(isGenerating || generatedImage) && (
                    <Card className="transition-all duration-200 hover:shadow-lg hover:scale-[1.01]">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl font-semibold group">
                                <span className="inline-flex items-center gap-2">
                                    Generated Portrait
                                    <ImageIcon className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                </span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isGenerating ? (
                                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-muted/80">
                                    <div className="text-center space-y-4">
                                        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground mx-auto" />
                                        <p className="text-muted-foreground text-sm">Creating your portrait...</p>
                                    </div>
                                </div>
                            ) : generatedImage ? (
                                <div className="space-y-4">
                                    <div className="aspect-square bg-muted rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg">
                                        <img
                                            src={generatedImage}
                                            alt="Generated portrait"
                                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            className="flex-1 transition-all duration-200 hover:bg-primary/10 hover:text-primary hover:border-primary/50"
                                        >
                                            Download
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="flex-1 transition-all duration-200 hover:bg-primary/10 hover:text-primary hover:border-primary/50"
                                            onClick={generatePortrait}
                                        >
                                            Regenerate
                                        </Button>
                                    </div>
                                </div>
                            ) : null}
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
