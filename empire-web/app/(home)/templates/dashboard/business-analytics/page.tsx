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
            <div className="text-white font-bold text-lg">LOGO HERE</div>
            <div className="text-white text-sm">Dashboard</div>
            <div className="text-white text-sm">Goals 2024 - 70%</div>
          </div>
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-12 gap-4 h-full">
            {/* Sidebar */}
            <div className="col-span-2 space-y-2">
              {['Dashboard', 'Team', 'Clients', 'Decision Making', 'Finance', 'Data Analysis', 'AI Advisor'].map((item, i) => (
                <div key={i} className="text-gray-300 text-xs py-1 px-2">{item}</div>
              ))}
            </div>
            
            {/* Revenue Section */}
            <div className="col-span-3 bg-gray-800 p-4 rounded">
              <div className="text-gray-300 text-xs mb-2">TOTAL REVENUE</div>
              <div className="text-white text-2xl font-bold mb-1">$136,265</div>
              <div className="text-green-400 text-lg font-bold mb-4">$6,325</div>
              <div className="h-16 flex items-end justify-between">
                {[30, 45, 25, 60, 40, 35, 50].map((height, i) => (
                  <div key={i} className="w-2 bg-blue-400 rounded-t" style={{height: `${height}%`}}></div>
                ))}
              </div>
            </div>
            
            {/* Earning Overview */}
            <div className="col-span-4 bg-gray-800 p-4 rounded">
              <div className="flex justify-between items-center mb-4">
                <div className="text-gray-300 text-xs">EARNING OVERVIEW</div>
                <div className="text-blue-400 text-xs">Monthly</div>
              </div>
              <div className="flex gap-4 mb-4">
                <div className="bg-blue-600 px-3 py-1 rounded text-white text-xs">$24,342</div>
                <div className="bg-green-600 px-3 py-1 rounded text-white text-xs">$546</div>
              </div>
              <div className="h-32 relative">
                <svg className="w-full h-full">
                  <path d="M0,20 Q50,10 100,25 T200,15 T300,20" stroke="#10b981" strokeWidth="2" fill="none"/>
                  <path d="M0,40 Q50,30 100,45 T200,35 T300,40" stroke="#3b82f6" strokeWidth="2" fill="none"/>
                </svg>
              </div>
            </div>
            
            {/* Goals Progress */}
            <div className="col-span-3 bg-gray-800 p-4 rounded">
              <div className="text-gray-300 text-xs mb-4">GOALS 2024</div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-300">4 Startups</span>
                    <span className="text-blue-400">84%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '84%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-300">Build a Company</span>
                    <span className="text-blue-400">36%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '36%'}}></div>
                  </div>
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
        <div className="mb-2">npx create-next-app@latest business-dashboard</div>
        <div className="mb-2">cd business-dashboard</div>
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
{`// Business Analytics Dashboard Component
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { BarChart3, TrendingUp, DollarSign, Users, Target } from 'lucide-react';

export default function BusinessDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div className={\`min-h-screen transition-colors duration-300 \${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }\`}>
      {/* Header */}
      <header className="p-6 border-b border-gray-700">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">LOGO HERE</h1>
            <nav className="hidden md:flex space-x-6">
              <span className="text-sm">Dashboard</span>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Dark Mode</span>
              <Switch
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
              />
            </div>
            <div className="text-sm">Goals 2024 - 70%</div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 p-6 border-r border-gray-700">
          <nav className="space-y-4">
            {[
              { icon: BarChart3, label: 'Dashboard', active: true },
              { icon: Users, label: 'Team' },
              { icon: Users, label: 'Clients' },
              { icon: Target, label: 'Decision Making' },
              { icon: DollarSign, label: 'Finance' },
              { icon: TrendingUp, label: 'Data Analysis' },
              { icon: BarChart3, label: 'AI Advisor' }
            ].map((item, index) => (
              <div
                key={index}
                className={\`flex items-center gap-3 p-2 rounded cursor-pointer transition-colors \${
                  item.active ? 'bg-blue-600 text-white' : 'hover:bg-gray-800'
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
            {/* Total Revenue */}
            <Card className="col-span-3 p-6 bg-gray-800 border-gray-700">
              <div className="mb-4">
                <h3 className="text-sm text-gray-400 mb-2">TOTAL REVENUE</h3>
                <div className="text-3xl font-bold text-white mb-1">$136,265</div>
                <div className="text-lg font-bold text-green-400">$6,325</div>
              </div>
              
              {/* Mini Chart */}
              <div className="h-16 flex items-end justify-between">
                {[30, 45, 25, 60, 40, 35, 50, 65, 30, 45].map((height, i) => (
                  <div
                    key={i}
                    className="w-2 bg-blue-400 rounded-t transition-all duration-300"
                    style={{ height: \`\${height}%\` }}
                  />
                ))}
              </div>
            </Card>

            {/* Earning Overview */}
            <Card className="col-span-6 p-6 bg-gray-800 border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm text-gray-400">EARNING OVERVIEW</h3>
                <select className="bg-gray-700 text-white text-xs px-2 py-1 rounded">
                  <option>Monthly</option>
                  <option>Weekly</option>
                  <option>Yearly</option>
                </select>
              </div>
              
              <div className="flex gap-4 mb-6">
                <div className="bg-blue-600 px-4 py-2 rounded text-white">
                  <div className="text-sm opacity-80">Cost</div>
                  <div className="font-bold">$24,342</div>
                </div>
                <div className="bg-green-600 px-4 py-2 rounded text-white">
                  <div className="text-sm opacity-80">Profit</div>
                  <div className="font-bold">$546</div>
                </div>
              </div>
              
              {/* Chart Area */}
              <div className="h-32 relative">
                <svg className="w-full h-full">
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
                    </linearGradient>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  
                  <path
                    d="M0,80 Q60,60 120,70 T240,50 T360,60"
                    stroke="#10b981"
                    strokeWidth="3"
                    fill="url(#gradient1)"
                  />
                  <path
                    d="M0,100 Q60,80 120,90 T240,70 T360,80"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    fill="url(#gradient2)"
                  />
                </svg>
              </div>
            </Card>

            {/* Goals 2024 */}
            <Card className="col-span-3 p-6 bg-gray-800 border-gray-700">
              <h3 className="text-sm text-gray-400 mb-6">GOALS 2024</h3>
              
              <div className="space-y-6">
                {[
                  { label: '4 Startups', progress: 84, color: 'bg-blue-500' },
                  { label: 'MRR Reach to $5000', progress: 52, color: 'bg-purple-500' },
                  { label: 'Build a Company', progress: 36, color: 'bg-blue-500' },
                  { label: 'Start Trading', progress: 11, color: 'bg-gray-500' }
                ].map((goal, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300">{goal.label}</span>
                      <span className="text-blue-400">{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className={\`h-2 rounded-full \${goal.color}\`}
                        initial={{ width: 0 }}
                        animate={{ width: \`\${goal.progress}%\` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Projects Status */}
            <Card className="col-span-4 p-6 bg-gray-800 border-gray-700">
              <h3 className="text-sm text-gray-400 mb-6">PROJECTS</h3>
              
              <div className="space-y-4">
                {[
                  { name: 'Not Started', count: 6, color: 'text-gray-400' },
                  { name: 'In Progress', count: 4, color: 'text-blue-400' },
                  { name: 'Done', count: 12, color: 'text-green-400' },
                  { name: 'Deadline', count: 10, color: 'text-red-400' }
                ].map((project, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className={\`flex items-center gap-3 \${project.color.replace('text-', 'bg-')}\`}>
                      <div className={\`w-2 h-2 rounded-full \${project.color.replace('text-', 'bg-')}\`} />
                      <span className="text-sm text-gray-300">{project.name}</span>
                    </div>
                    <span className={\`text-sm font-bold \${project.color}\`}>{project.count}</span>
                  </div>
                ))}
              </div>
              
              {/* Donut Chart */}
              <div className="mt-6 flex justify-center">
                <div className="relative w-32 h-32">
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
                      stroke="#10b981"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={\`\${(12/32) * 314} 314\`}
                      strokeDashoffset="0"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="50"
                      stroke="#3b82f6"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={\`\${(4/32) * 314} 314\`}
                      strokeDashoffset={\`-\${(12/32) * 314}\`}
                    />
                  </svg>
                </div>
              </div>
            </Card>

            {/* Client Status */}
            <Card className="col-span-8 p-6 bg-gray-800 border-gray-700">
              <h3 className="text-sm text-gray-400 mb-6">CLIENTS STATUS</h3>
              
              {/* Chart placeholder */}
              <div className="h-48 relative">
                <svg className="w-full h-full">
                  <path
                    d="M0,150 Q100,100 200,120 T400,90 T600,110 T800,80"
                    stroke="#ec4899"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="4,4"
                  />
                  <path
                    d="M0,170 Q100,140 200,160 T400,130 T600,150 T800,120"
                    stroke="#8b5cf6"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M0,180 Q100,160 200,170 T400,150 T600,160 T800,140"
                    stroke="#06b6d4"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
            </Card>
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
{`/* Business Analytics Dashboard Styles */
:root {
  --bg-dark: #111827;
  --bg-card-dark: #1f2937;
  --bg-light: #f9fafb;
  --bg-card-light: #ffffff;
  --text-primary-dark: #ffffff;
  --text-primary-light: #111827;
  --text-secondary-dark: #9ca3af;
  --text-secondary-light: #6b7280;
  --border-dark: #374151;
  --border-light: #e5e7eb;
}

.dashboard-container {
  font-family: 'Inter', sans-serif;
  transition: all 0.3s ease;
}

/* Dark Theme */
.dark .dashboard-container {
  background-color: var(--bg-dark);
  color: var(--text-primary-dark);
}

.dark .dashboard-card {
  background-color: var(--bg-card-dark);
  border-color: var(--border-dark);
}

.dark .sidebar {
  background-color: var(--bg-card-dark);
  border-color: var(--border-dark);
}

/* Light Theme */
.light .dashboard-container {
  background-color: var(--bg-light);
  color: var(--text-primary-light);
}

.light .dashboard-card {
  background-color: var(--bg-card-light);
  border-color: var(--border-light);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.light .sidebar {
  background-color: var(--bg-card-light);
  border-color: var(--border-light);
}

/* Revenue Card Animations */
.revenue-chart {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 4rem;
  gap: 2px;
}

.revenue-bar {
  background: linear-gradient(to top, #3b82f6, #60a5fa);
  border-radius: 2px 2px 0 0;
  transition: all 0.3s ease;
  animation: growUp 0.8s ease-out;
}

.revenue-bar:hover {
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

/* Progress Bars */
.progress-container {
  background-color: #374151;
  border-radius: 9999px;
  height: 8px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  border-radius: 9999px;
  transition: width 1s ease-out;
  position: relative;
}

.progress-bar::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Chart Animations */
.chart-line {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: drawLine 2s ease-out forwards;
}

@keyframes drawLine {
  to {
    stroke-dashoffset: 0;
  }
}

/* Donut Chart */
.donut-segment {
  transition: stroke-width 0.3s ease;
}

.donut-segment:hover {
  stroke-width: 16;
}

/* Navigation */
.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-item:hover {
  background-color: #374151;
}

.nav-item.active {
  background-color: #2563eb;
  color: white;
}

/* Cards */
.metric-card {
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
  border: 1px solid #374151;
  border-radius: 0.5rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.metric-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Theme Toggle */
.theme-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  background-color: #374151;
  transition: all 0.2s ease;
}

.theme-toggle:hover {
  background-color: #4b5563;
}

/* Responsive Design */
@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    height: auto;
    padding: 1rem;
    border-top: 1px solid var(--border-dark);
    border-right: none;
  }
  
  .nav-item {
    flex-direction: column;
    gap: 0.25rem;
    font-size: 0.75rem;
  }
  
  .main-content {
    padding-bottom: 6rem;
  }
  
  .grid-cols-12 {
    grid-template-columns: 1fr;
  }
  
  .col-span-3,
  .col-span-4,
  .col-span-6,
  .col-span-8 {
    grid-column: span 1;
  }
}

/* Loading States */
.loading-skeleton {
  background: linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}`}
        </pre>
      </div>
    )
  }
];

export default function BusinessAnalyticsPage() {
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
npx create-next-app@latest business-dashboard
cd business-dashboard
npm install framer-motion lucide-react recharts

# Install Empire UI
npm install @empire-ui/components
npm install tailwindcss postcss autoprefixer

# Run development server
npm run dev`;

  const getCodeContent = () => `// Business Analytics Dashboard Component
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { BarChart3, TrendingUp, DollarSign, Users, Target } from 'lucide-react';

export default function BusinessDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div className={\`min-h-screen transition-colors duration-300 \${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }\`}>
      {/* Header */}
      <header className="p-6 border-b border-gray-700">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">LOGO HERE</h1>
            <nav className="hidden md:flex space-x-6">
              <span className="text-sm">Dashboard</span>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Dark Mode</span>
              <Switch
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
              />
            </div>
            <div className="text-sm">Goals 2024 - 70%</div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 p-6 border-r border-gray-700">
          <nav className="space-y-4">
            {[
              { icon: BarChart3, label: 'Dashboard', active: true },
              { icon: Users, label: 'Team' },
              { icon: Users, label: 'Clients' },
              { icon: Target, label: 'Decision Making' },
              { icon: DollarSign, label: 'Finance' },
              { icon: TrendingUp, label: 'Data Analysis' },
              { icon: BarChart3, label: 'AI Advisor' }
            ].map((item, index) => (
              <div
                key={index}
                className={\`flex items-center gap-3 p-2 rounded cursor-pointer transition-colors \${
                  item.active ? 'bg-blue-600 text-white' : 'hover:bg-gray-800'
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
            {/* Revenue, Charts, Goals sections... */}
            {/* Full implementation available in complete component */}
          </div>
        </main>
      </div>
    </div>
  );
}`;

  const getCssContent = () => `/* Business Analytics Dashboard Styles */
:root {
  --bg-dark: #111827;
  --bg-card-dark: #1f2937;
  --bg-light: #f9fafb;
  --bg-card-light: #ffffff;
  --text-primary-dark: #ffffff;
  --text-primary-light: #111827;
  --text-secondary-dark: #9ca3af;
  --text-secondary-light: #6b7280;
  --border-dark: #374151;
  --border-light: #e5e7eb;
}

.dashboard-container {
  font-family: 'Inter', sans-serif;
  transition: all 0.3s ease;
}

/* Dark Theme */
.dark .dashboard-container {
  background-color: var(--bg-dark);
  color: var(--text-primary-dark);
}

.dark .dashboard-card {
  background-color: var(--bg-card-dark);
  border-color: var(--border-dark);
}

/* Progress Bars */
.progress-container {
  background-color: #374151;
  border-radius: 9999px;
  height: 8px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  border-radius: 9999px;
  transition: width 1s ease-out;
  position: relative;
}

/* Chart Animations */
.chart-line {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: drawLine 2s ease-out forwards;
}

@keyframes drawLine {
  to {
    stroke-dashoffset: 0;
  }
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
                  BUSINESS ANALYTICS DASHBOARD
                </h1>
                <p className={cn("text-gray-600 mt-1", MinecartLCD.className)}>
                  COMPREHENSIVE BUSINESS DASHBOARD WITH REVENUE TRACKING & PROJECT MANAGEMENT
                </p>
              </div>
            </div>
            
            <Button
              onClick={() => navigateTo("/templates/dashboard/business-analytics/demo")}
              className={cn("bg-orange-600 text-white hover:bg-orange-700", MinecartLCD.className)}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              VIEW LIVE DEMO
            </Button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Badge className="bg-blue-100 text-blue-800 border border-blue-300">BUSINESS</Badge>
            <Badge className="bg-green-100 text-green-800 border border-green-300">ANALYTICS</Badge>
            <Badge className="bg-purple-100 text-purple-800 border border-purple-300">DARK THEME</Badge>
            <Badge className="bg-orange-100 text-orange-800 border border-orange-300">REVENUE</Badge>
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