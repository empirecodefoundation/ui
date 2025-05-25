'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2 } from 'lucide-react'

const codeLines = [
    `"use client"`,
    '',
    'import { useState } from "react"',
    'import { Button } from "@/components/ui/button"',
    'import { Input } from "@/components/ui/input"',
    'import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"',
    'import { Label } from "@/components/ui/label"',
    'import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"',
    'import { Sparkles, MessageSquare, Palette, ImageIcon, Sun, User, Gauge, Wand2, Loader2, Monitor, Image } from "lucide-react"',
    '',
    'export default function AICardGenerator() {',
    '    const [prompt, setPrompt] = useState("Picture of a woman with orange background")',
    '    const [style, setStyle] = useState("professional")',
    '    const [background, setBackground] = useState("studio")',
    '    const [lighting, setLighting] = useState("soft")',
    '    const [pose, setPose] = useState("candid")',
    '    const [isEnhancing, setIsEnhancing] = useState(false)',
    '    const [isGenerating, setIsGenerating] = useState(false)',
    '    const [generatedImage, setGeneratedImage] = useState<string | null>(null)',
    '',
    '    const enhancePrompt = async () => {',
    '        setIsEnhancing(true)',
    '        await new Promise((resolve) => setTimeout(resolve, 2000))',
    '        const enhancedPrompt = `Professional portrait of a woman with vibrant orange background, ${style.toLowerCase()} style, ${lighting.toLowerCase()} lighting setup, ${pose.toLowerCase()} pose, high quality photography, detailed facial features, perfect composition, cinematic lighting`',
    '        setPrompt(enhancedPrompt)',
    '        setIsEnhancing(false)',
    '    }',
    '',
    '    const generatePortrait = async () => {',
    '        setIsGenerating(true)',
    '        await new Promise((resolve) => setTimeout(resolve, 3000))',
    '        setGeneratedImage("/placeholder.svg?height=400&width=400")',
    '        setIsGenerating(false)',
    '    }',
    '',
    '    )',
    '}',
  ]

const VISIBLE_LINES = 10
const LINE_HEIGHT = 28 // px
const SCROLL_DURATION = 6 // seconds

export default function VercelV0Loading() {
  // Repeat code lines to make scrolling effect
  const scrollingLines = Array(2).fill(codeLines).flat()
  const totalHeight = scrollingLines.length * LINE_HEIGHT
  const visibleHeight = VISIBLE_LINES * LINE_HEIGHT

  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // After scroll is done, fade out the block
    const timer = setTimeout(() => setFadeOut(true), SCROLL_DURATION * 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex h-screen w-full items-center justify-center bg-black px-4">
      <AnimatePresence>
        {!fadeOut && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.8 } }}
            className="w-[600px]"
          >
            {/* Loader and title, left-aligned */}
            <div className="flex items-center gap-2 mb-2">
              <Loader2 className="h-4 w-4 animate-spin text-white" />
              <span className="text-white font-semibold text-[20px]">
                Generating functional-sidebar.tsx
              </span>
            </div>

            {/* Code area with radial fade at corners */}
            <div
  className="relative overflow-hidden rounded-lg"
  style={{
    height: visibleHeight,
    background: '#000000',
    // Stronger radial mask for fade at corners
    WebkitMaskImage:
      'radial-gradient(ellipse 100% 80% at 50% 48%, white 40%, rgba(255,255,255,0.2) 60%, transparent 100%)',
    maskImage:
      'radial-gradient(ellipse 100% 80% at 50% 48%, white 40%, rgba(255,255,255,0.2) 60%, transparent 100%)',
  }}
>
  {/* Animated scrolling code */}
  <motion.div
    className="absolute top-0 left-0 w-full px-6 py-2"
    animate={{ y: [0, visibleHeight - totalHeight] }}
    transition={{
      duration: SCROLL_DURATION,
      ease: 'linear',
      repeat: 0,
    }}
  >
    <pre className="text-[16px] font-mono text-white leading-[28px]">
      {scrollingLines.map((line, index) => (
        <div key={index} className="mb-[2px]">
          <SyntaxHighlight line={line} />
        </div>
      ))}
    </pre>
  </motion.div>
</div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Simple syntax highlighter
function SyntaxHighlight({ line }: {line: string}) {
  const colored = line
    .replace(/(import|from|export|useState|useRef|useEffect)/g, '<span class="text-purple-400">$1</span>')
    .replace(/(".*?")/g, '<span class="text-green-400">$1</span>')
    .replace(/({|})/g, '<span class="text-pink-400">$1</span>')
  return <span dangerouslySetInnerHTML={{ __html: colored }} />
}
