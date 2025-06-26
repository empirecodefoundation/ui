"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Copy, CheckCircle } from "lucide-react";
import { Navbar } from "@/components/common/navbar";
import { EmpireFooter } from "@/components/common/empire-footer";
import { MinecartLCD } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { ResponsiveWrapper } from "@/components/common/responsive-wrapper";
import { useNavigation } from "@/lib/hooks/use-navigation";

const tabsData = [
  {
    id: "preview",
    label: "PREVIEW",
    content: (
      <div className="relative w-full h-[600px] bg-gray-900 border-4 border-dotted border-orange-600 overflow-hidden">
        <div className="absolute inset-0 p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                <span className="text-white text-sm font-bold">AS</span>
              </div>
              <div>
                <div className="text-white font-bold">Abubakar Shenazi</div>
                <div className="text-gray-400 text-xs">theabubackathletic@gmail.com</div>
                <div className="bg-purple-600 text-white text-xs px-2 py-1 rounded mt-1">COACH</div>
              </div>
            </div>
            <div className="text-white font-bold text-lg">HITE EQ</div>
            <div className="text-white text-sm">Dashboard</div>
            <div className="text-purple-400 text-sm">Search</div>
          </div>
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-12 gap-4 h-full">
            {/* Sidebar */}
            <div className="col-span-2 space-y-2">
              {['Dashboard', 'Statistics', 'Team', 'Assessments', 'Chat', 'Athletes', 'Reports', 'Settings'].map((item, i) => (
                <div key={i} className={`text-gray-300 text-xs py-2 px-2 ${i === 0 ? 'bg-purple-600 rounded' : ''}`}>
                  {item}
                </div>
              ))}
            </div>
            
            {/* Athletes EQ Behavior */}
            <div className="col-span-3 bg-gray-800 p-4 rounded">
              <div className="text-gray-300 text-xs mb-4">Athletes EQ behavior</div>
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" r="50" stroke="#374151" strokeWidth="12" fill="none"/>
                  <circle cx="64" cy="64" r="50" stroke="#8b5cf6" strokeWidth="12" fill="none"
                    strokeDasharray="220 314" strokeDashoffset="0"/>
                  <circle cx="64" cy="64" r="50" stroke="#ec4899" strokeWidth="12" fill="none"
                    strokeDasharray="94 314" strokeDashoffset="-220"/>
                  <circle cx="64" cy="64" r="50" stroke="#f59e0b" strokeWidth="12" fill="none"
                    strokeDasharray="63 314" strokeDashoffset="-314"/>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">70%</div>
                    <div className="text-xs text-gray-400">20%</div>
                    <div className="text-xs text-gray-400">10%</div>
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <span className="text-gray-300">Arguing</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                  <span className="text-gray-300">Temper</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <span className="text-gray-300">Cooperation</span>
                </div>
              </div>
            </div>
            
            {/* Overall Athletes Score */}
            <div className="col-span-4 bg-gray-800 p-4 rounded">
              <div className="flex justify-between items-center mb-4">
                <div className="text-gray-300 text-xs">Overall Athletes Score</div>
                <div className="flex gap-2 text-xs">
                  <span className="text-gray-400">Daily</span>
                  <span className="text-gray-400">Weekly</span>
                  <span className="text-purple-400">Monthly</span>
                </div>
              </div>
              <div className="h-32 relative">
                <svg className="w-full h-full">
                  <path d="M0,80 Q50,60 100,70 T200,50 T300,60 T400,45" stroke="#ec4899" strokeWidth="3" fill="none"/>
                  <circle cx="350" cy="50" r="4" fill="#ec4899"/>
                </svg>
                <div className="absolute top-0 right-0 text-purple-400 text-sm">5%</div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>JAN</span>
                <span>FEB</span>
                <span>MAR</span>
                <span>APR</span>
                <span>MAY</span>
                <span>JUN</span>
                <span>JUL</span>
                <span>AUG</span>
                <span>SEP</span>
                <span>OCT</span>
                <span>NOV</span>
                <span>DEC</span>
              </div>
            </div>
            
            {/* Leadership & Positive Self Talk */}
            <div className="col-span-3 space-y-4">
              <div className="bg-gray-800 p-4 rounded">
                <div className="text-gray-300 text-xs mb-4">Leadership</div>
                <div className="h-20 relative">
                  <svg className="w-full h-full">
                    <path d="M0,40 Q60,20 120,30 T240,15 T300,25" stroke="#ec4899" strokeWidth="2" fill="none"/>
                    <circle cx="50" cy="30" r="3" fill="#ec4899"/>
                    <circle cx="150" cy="20" r="3" fill="#ec4899"/>
                    <circle cx="250" cy="25" r="3" fill="#ec4899"/>
                  </svg>
                  <div className="absolute top-0 right-0 text-purple-400 text-lg font-bold">$74</div>
                </div>
              </div>
              
              <div className="bg-gray-800 p-4 rounded text-center">
                <div className="text-gray-300 text-xs mb-2">Positive Self Talk</div>
                <div className="relative w-20 h-20 mx-auto">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="40" cy="40" r="30" stroke="#374151" strokeWidth="8" fill="none"/>
                    <circle cx="40" cy="40" r="30" stroke="#ec4899" strokeWidth="8" fill="none"
                      strokeDasharray="135 188" strokeDashoffset="0"/>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-2xl font-bold text-white">72%</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bottom Row */}
            <div className="col-span-12 grid grid-cols-3 gap-4 mt-4">
              {/* Grit */}
              <div className="bg-gray-800 p-4 rounded">
                <div className="text-gray-300 text-xs mb-4">Grit</div>
                <div className="h-20 flex items-end justify-between">
                  {[60, 40, 80, 30, 70, 50, 90, 45, 75].map((height, i) => (
                    <div key={i} className="w-2 bg-purple-500 rounded-t" style={{height: `${height}%`}}></div>
                  ))}
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                </div>
                <div className="text-xs text-gray-400 mt-2">300</div>
              </div>
              
              {/* Coach Ability */}
              <div className="bg-gray-800 p-4 rounded">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-gray-300 text-xs">Coach Ability</div>
                  <div className="bg-yellow-400 text-black text-xs px-2 py-1 rounded">24.3</div>
                </div>
                <div className="text-yellow-400 text-lg font-bold mb-2">Brilliant</div>
                <div className="h-16 relative">
                  <svg className="w-full h-full">
                    <path d="M0,30 Q50,10 100,20 T200,15 T300,10" stroke="#eab308" strokeWidth="2" fill="none"/>
                  </svg>
                </div>
              </div>
              
              {/* Overall HITE */}
              <div className="bg-gray-800 p-4 rounded">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-gray-300 text-xs">overall HITE</div>
                  <div className="bg-green-400 text-black text-xs px-2 py-1 rounded">+24.3%</div>
                </div>
                <div className="text-green-400 text-lg font-bold mb-2">2,900</div>
                <div className="h-16 relative">
                  <svg className="w-full h-full">
                    <path d="M0,40 Q50,30 100,35 T200,25 T300,20" stroke="#22c55e" strokeWidth="2" fill="none"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "cli",
    label: "CLI",
    content: (
      <div className="bg-gray-900 text-green-400 p-6 rounded-none font-mono text-sm border-4 border-dotted border-orange-600">
        <div className="mb-4">
          <span className="text-gray-500"># Install dependencies</span>
        </div>
        <div className="mb-2">npx create-next-app@latest sports-dashboard</div>
        <div className="mb-2">cd sports-dashboard</div>
        <div className="mb-4">npm install framer-motion lucide-react recharts</div>
        <div className="mb-4">
          <span className="text-gray-500"># Install Empire UI</span>
        </div>
        <div className="mb-2">npm install @empire-ui/components</div>
        <div className="mb-4">npm install tailwindcss postcss autoprefixer</div>
        <div className="mb-4">
          <span className="text-gray-500"># Run development server</span>
        </div>
        <div>npm run dev</div>
      </div>
    )
  },
  {
    id: "code",
    label: "CODE",
    content: (
      <div className="bg-gray-900 text-gray-300 p-6 rounded-none font-mono text-sm border-4 border-dotted border-orange-600 max-h-[600px] overflow-y-auto">
        <pre className="whitespace-pre-wrap">
{`// Sports Analytics Dashboard Component
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Avatar } from '@/components/ui/avatar';
import { BarChart3, TrendingUp, Target, Users, Trophy, Activity } from 'lucide-react';

export default function SportsAnalyticsDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div className={\`min-h-screen transition-colors duration-300 \${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }\`}>
      {/* Header */}
      <header className="p-6 border-b border-gray-700">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Avatar className="w-12 h-12">
              <div className="w-full h-full bg-purple-600 flex items-center justify-center text-white font-bold">
                AS
              </div>
            </Avatar>
            <div>
              <h2 className="font-bold">Abubakar Shenazi</h2>
              <p className="text-sm text-gray-400">theabubackathletic@gmail.com</p>
              <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded mt-1 inline-block">
                COACH
              </span>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold">HITE EQ</h1>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Dark Mode</span>
              <Switch
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
              />
            </div>
            <span className="text-sm">Dashboard</span>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 p-6 border-r border-gray-700">
          <nav className="space-y-4">
            {[
              { icon: BarChart3, label: 'Dashboard', active: true },
              { icon: TrendingUp, label: 'Statistics' },
              { icon: Users, label: 'Team' },
              { icon: Target, label: 'Assessments' },
              { icon: Activity, label: 'Chat' },
              { icon: Users, label: 'Athletes' },
              { icon: BarChart3, label: 'Reports' },
              { icon: Trophy, label: 'Settings' }
            ].map((item, index) => (
              <div
                key={index}
                className={\`flex items-center gap-3 p-2 rounded cursor-pointer transition-colors \${
                  item.active ? 'bg-purple-600 text-white' : 'hover:bg-gray-800'
                }\`}
              >
                <item.icon className="h-4 w-4" />
                <span className="text-sm">{item.label}</span>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Athletes EQ Behavior */}
            <Card className="col-span-3 p-6 bg-gray-800 border-gray-700">
              <h3 className="text-sm text-gray-400 mb-6">Athletes EQ behavior</h3>
              
              {/* Donut Chart */}
              <div className="relative w-32 h-32 mx-auto mb-6">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="50"
                    stroke="#374151"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="50"
                    stroke="#8b5cf6"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray="220 314"
                    strokeDashoffset="0"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="50"
                    stroke="#ec4899"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray="63 314"
                    strokeDashoffset="-220"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="50"
                    stroke="#f59e0b"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray="31 314"
                    strokeDashoffset="-283"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">70%</div>
                    <div className="text-xs text-pink-400">20%</div>
                    <div className="text-xs text-yellow-400">10%</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <span className="text-sm text-gray-300">Arguing</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-pink-500" />
                  <span className="text-sm text-gray-300">Temper</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <span className="text-sm text-gray-300">Cooperation</span>
                </div>
              </div>
            </Card>

            {/* Overall Athletes Score */}
            <Card className="col-span-6 p-6 bg-gray-800 border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm text-gray-400">Overall Athletes Score</h3>
                <div className="flex gap-4 text-xs">
                  <span className="text-gray-400">Daily</span>
                  <span className="text-gray-400">Weekly</span>
                  <span className="text-purple-400 font-bold">Monthly</span>
                </div>
              </div>
              
              {/* Line Chart */}
              <div className="h-32 relative mb-4">
                <svg className="w-full h-full">
                  <defs>
                    <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ec4899" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="#ec4899" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  
                  <path
                    d="M0,80 Q60,60 120,70 T240,50 T360,60 T480,45"
                    stroke="#ec4899"
                    strokeWidth="3"
                    fill="url(#purpleGradient)"
                  />
                  <circle cx="450" cy="50" r="4" fill="#ec4899" />
                </svg>
                
                <div className="absolute top-0 right-0">
                  <span className="text-purple-400 text-sm">5%</span>
                </div>
              </div>
              
              <div className="flex justify-between text-xs text-gray-400">
                {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'].map(month => (
                  <span key={month}>{month}</span>
                ))}
              </div>
            </Card>

            {/* Leadership & Positive Self Talk */}
            <div className="col-span-3 space-y-6">
              <Card className="p-6 bg-gray-800 border-gray-700">
                <h3 className="text-sm text-gray-400 mb-4">Leadership</h3>
                <div className="h-20 relative">
                  <svg className="w-full h-full">
                    <path
                      d="M0,40 Q60,20 120,30 T240,15 T300,25"
                      stroke="#ec4899"
                      strokeWidth="2"
                      fill="none"
                    />
                    <circle cx="50" cy="30" r="3" fill="#ec4899" />
                    <circle cx="150" cy="20" r="3" fill="#ec4899" />
                    <circle cx="250" cy="25" r="3" fill="#ec4899" />
                  </svg>
                  <div className="absolute top-0 right-0">
                    <span className="text-purple-400 text-lg font-bold">$74</span>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 bg-gray-800 border-gray-700 text-center">
                <h3 className="text-sm text-gray-400 mb-4">Positive Self Talk</h3>
                <div className="relative w-20 h-20 mx-auto">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="30"
                      stroke="#374151"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="30"
                      stroke="#ec4899"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray="135 188"
                      strokeDashoffset="0"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">72%</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Bottom Row - Grit, Coach Ability, Overall HITE */}
            <div className="col-span-12 grid grid-cols-3 gap-6">
              {/* Grit */}
              <Card className="p-6 bg-gray-800 border-gray-700">
                <h3 className="text-sm text-gray-400 mb-4">Grit</h3>
                <div className="h-20 flex items-end justify-between mb-4">
                  {[60, 40, 80, 30, 70, 50, 90, 45, 75].map((height, i) => (
                    <div
                      key={i}
                      className="w-2 bg-purple-500 rounded-t transition-all duration-500"
                      style={{ height: \`\${height}%\` }}
                    />
                  ))}
                  <div className="w-3 h-3 bg-purple-500 rounded-full" />
                </div>
                <div className="text-xs text-gray-400">300</div>
              </Card>
              
              {/* Coach Ability */}
              <Card className="p-6 bg-gray-800 border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm text-gray-400">Coach Ability</h3>
                  <div className="bg-yellow-400 text-black text-xs px-2 py-1 rounded font-bold">
                    24.3
                  </div>
                </div>
                <div className="text-yellow-400 text-lg font-bold mb-4">Brilliant</div>
                <div className="h-16 relative">
                  <svg className="w-full h-full">
                    <path
                      d="M0,30 Q50,10 100,20 T200,15 T300,10"
                      stroke="#eab308"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </div>
              </Card>
              
              {/* Overall HITE */}
              <Card className="p-6 bg-gray-800 border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm text-gray-400">overall HITE</h3>
                  <div className="bg-green-400 text-black text-xs px-2 py-1 rounded font-bold">
                    +24.3%
                  </div>
                </div>
                <div className="text-green-400 text-lg font-bold mb-4">2,900</div>
                <div className="h-16 relative">
                  <svg className="w-full h-full">
                    <path
                      d="M0,40 Q50,30 100,35 T200,25 T300,20"
                      stroke="#22c55e"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}`}
        </pre>
      </div>
    )
  },
  {
    id: "css",
    label: "CSS",
    content: (
      <div className="bg-gray-900 text-gray-300 p-6 rounded-none font-mono text-sm border-4 border-dotted border-orange-600 max-h-[600px] overflow-y-auto">
        <pre className="whitespace-pre-wrap">
{`/* Sports Analytics Dashboard Styles */
:root {
  --primary-purple: #8b5cf6;
  --secondary-pink: #ec4899;
  --accent-yellow: #eab308;
  --success-green: #22c55e;
  --bg-dark: #111827;
  --bg-card-dark: #1f2937;
  --text-primary: #ffffff;
  --text-secondary: #9ca3af;
}

.sports-dashboard {
  font-family: 'Inter', sans-serif;
  background: var(--bg-dark);
  color: var(--text-primary);
  min-height: 100vh;
}

/* Header Styles */
.dashboard-header {
  background: var(--bg-card-dark);
  border-bottom: 1px solid #374151;
  padding: 1.5rem;
}

.coach-profile {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.coach-avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: var(--primary-purple);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
}

.coach-badge {
  background: var(--primary-purple);
  color: white;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  display: inline-block;
  margin-top: 0.25rem;
}

/* Sidebar Navigation */
.sidebar {
  width: 16rem;
  background: var(--bg-card-dark);
  border-right: 1px solid #374151;
  padding: 1.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 0.5rem;
}

.nav-item:hover {
  background-color: #374151;
}

.nav-item.active {
  background-color: var(--primary-purple);
  color: white;
}

/* Card Styles */
.metric-card {
  background: var(--bg-card-dark);
  border: 1px solid #374151;
  border-radius: 0.5rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.metric-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* EQ Behavior Donut Chart */
.eq-donut {
  position: relative;
  width: 8rem;
  height: 8rem;
  margin: 0 auto;
}

.donut-segment {
  transition: stroke-width 0.3s ease;
}

.donut-segment:hover {
  stroke-width: 16;
}

.donut-labels {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

/* Chart Animations */
.line-chart path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: drawLine 2s ease-out forwards;
}

@keyframes drawLine {
  to {
    stroke-dashoffset: 0;
  }
}

.chart-point {
  animation: popIn 0.5s ease-out;
}

@keyframes popIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Progress Circles */
.progress-circle {
  transform: rotate(-90deg);
}

.progress-circle circle {
  transition: stroke-dasharray 1s ease-out;
}

/* Bar Charts */
.grit-bars {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 5rem;
  gap: 2px;
}

.grit-bar {
  background: linear-gradient(to top, var(--primary-purple), #a855f7);
  border-radius: 2px 2px 0 0;
  transition: all 0.3s ease;
  animation: growUp 0.8s ease-out;
}

.grit-bar:hover {
  opacity: 0.8;
  transform: scaleY(1.1);
}

@keyframes growUp {
  from {
    height: 0;
    opacity: 0;
  }
  to {
    height: var(--bar-height);
    opacity: 1;
  }
}

/* Metric Badges */
.metric-badge {
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  display: inline-block;
}

.metric-badge.yellow {
  background: var(--accent-yellow);
  color: #000;
}

.metric-badge.green {
  background: var(--success-green);
  color: #000;
}

/* Score Display */
.score-large {
  font-size: 1.125rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.score-large.yellow {
  color: var(--accent-yellow);
}

.score-large.green {
  color: var(--success-green);
}

/* Leadership Chart */
.leadership-chart {
  height: 5rem;
  position: relative;
}

.leadership-score {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 1.125rem;
  font-weight: bold;
  color: var(--secondary-pink);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .grid-cols-12 {
    grid-template-columns: 1fr;
  }
  
  .col-span-3,
  .col-span-6 {
    grid-column: span 1;
  }
  
  .sidebar {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    height: auto;
    border-top: 1px solid #374151;
    border-right: none;
  }
  
  .nav-item {
    flex-direction: column;
    gap: 0.25rem;
    font-size: 0.75rem;
  }
}

/* Theme Toggle */
.theme-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Loading States */
.loading-shimmer {
  background: linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}`}
        </pre>
      </div>
    )
  }
];

export default function SportsAnalyticsPage() {
  const [activeTab, setActiveTab] = React.useState("preview");
  const [copiedStates, setCopiedStates] = React.useState<{[key: string]: boolean}>({});
  const { navigateTo } = useNavigation();

  const copyToClipboard = (content: string, type: string) => {
    navigator.clipboard.writeText(content);
    setCopiedStates(prev => ({ ...prev, [type]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [type]: false }));
    }, 2000);
  };

  const getCliContent = () => `# Install dependencies
npx create-next-app@latest sports-dashboard
cd sports-dashboard
npm install framer-motion lucide-react recharts

# Install Empire UI
npm install @empire-ui/components
npm install tailwindcss postcss autoprefixer

# Run development server
npm run dev`;

  const getCodeContent = () => `// Sports Analytics Dashboard Component
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Avatar } from '@/components/ui/avatar';
import { BarChart3, TrendingUp, Target, Users, Trophy, Activity } from 'lucide-react';

export default function SportsAnalyticsDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div className={\`min-h-screen transition-colors duration-300 \${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }\`}>
      {/* Complete component implementation */}
    </div>
  );
}`;

  const getCssContent = () => `/* Sports Analytics Dashboard Styles */
:root {
  --primary-purple: #8b5cf6;
  --secondary-pink: #ec4899;
  --accent-yellow: #eab308;
  --success-green: #22c55e;
  --bg-dark: #111827;
  --bg-card-dark: #1f2937;
  --text-primary: #ffffff;
  --text-secondary: #9ca3af;
}

.sports-dashboard {
  font-family: 'Inter', sans-serif;
  background: var(--bg-dark);
  color: var(--text-primary);
  min-height: 100vh;
}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ResponsiveWrapper>
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigateTo("/templates/dashboard")}
                variant="outline"
                size="sm"
                className={cn("border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white", MinecartLCD.className)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                BACK TO DASHBOARD
              </Button>
              <div>
                <h1 className={cn("text-3xl font-bold text-gray-900", MinecartLCD.className)}>
                  SPORTS ANALYTICS DASHBOARD
                </h1>
                <p className={cn("text-gray-600 mt-1", MinecartLCD.className)}>
                  ATHLETIC PERFORMANCE DASHBOARD WITH BEHAVIOR ANALYSIS & COACHING METRICS
                </p>
              </div>
            </div>
            
            <Button
              onClick={() => navigateTo("/templates/dashboard/sports-analytics/demo")}
              className={cn("bg-orange-600 text-white hover:bg-orange-700", MinecartLCD.className)}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              VIEW LIVE DEMO
            </Button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Badge className="bg-purple-100 text-purple-800 border border-purple-300">SPORTS</Badge>
            <Badge className="bg-pink-100 text-pink-800 border border-pink-300">ANALYTICS</Badge>
            <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-300">COACHING</Badge>
            <Badge className="bg-blue-100 text-blue-800 border border-blue-300">PERFORMANCE</Badge>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="flex space-x-8">
              {tabsData.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "py-2 px-1 border-b-2 font-medium text-sm transition-colors",
                    activeTab === tab.id
                      ? "border-orange-600 text-orange-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                    MinecartLCD.className
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {activeTab !== "preview" && (
              <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
                <span className={cn("text-sm font-medium text-gray-700", MinecartLCD.className)}>
                  {activeTab === "cli" && "INSTALLATION COMMANDS"}
                  {activeTab === "code" && "REACT COMPONENT"}
                  {activeTab === "css" && "STYLESHEET"}
                </span>
                <Button
                  onClick={() => {
                    const content = activeTab === "cli" ? getCliContent() : 
                                   activeTab === "code" ? getCodeContent() : 
                                   getCssContent();
                    copyToClipboard(content, activeTab);
                  }}
                  variant="outline"
                  size="sm"
                  className={cn("", MinecartLCD.className)}
                >
                  {copiedStates[activeTab] ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      COPIED!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      COPY CODE
                    </>
                  )}
                </Button>
              </div>
            )}
            
            <div className="p-0">
              {tabsData.find(tab => tab.id === activeTab)?.content}
            </div>
          </div>
        </div>
      </ResponsiveWrapper>
      <EmpireFooter />
    </div>
  );
} 