"use client";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Code, 
  Eye, 
  Copy, 
  Download, 
  Wand2, 
  CheckCircle,
  AlertCircle,
  Loader2,
  RefreshCw,
  LayoutDashboard,
  BarChart2,
  PieChart,
  Users,
  Settings,
  Bell,
  Search
} from "lucide-react";
import { useState, useRef } from "react";

const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

// ================ AI Form Generator ================
interface FormField {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  validation?: string;
}

interface GeneratedForm {
  title: string;
  description: string;
  fields: FormField[];
  submitText: string;
  jsx: string;
  imports: string;
}

// ================ AI Dashboard Generator ================
interface DashboardComponent {
  type: 'chart' | 'table' | 'stats' | 'list' | 'form';
  title: string;
  description: string;
  dataType?: string;
  columns?: string[];
  metrics?: string[];
}

interface GeneratedDashboard {
  title: string;
  description: string;
  components: DashboardComponent[];
  jsx: string;
  imports: string;
}

const AIFormGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedForm, setGeneratedForm] = useState<GeneratedForm | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const codeRef = useRef<HTMLPreElement>(null);

  const apiKey = "AIzaSyDIgil7Utyc91uRuCk99FxpY1yGka-CcNk";
  const model = "gemini-1.5-flash";

  const examplePrompts = [
    "Create a user registration form with name, email, password, confirm password, and terms checkbox",
    "Build a contact form with name, email, phone, subject, message, and preferred contact method",
    "Generate a job application form with personal info, experience, skills, and file upload",
    "Make a survey form about food preferences with ratings and multiple choice questions",
    "Create an event booking form with date picker, time slots, number of attendees, and special requests",
    "Build a product feedback form with ratings, categories, and improvement suggestions"
  ];

  const generateFormWithGemini = async (userPrompt: string): Promise<GeneratedForm> => {
    const prompt = `You are an expert React developer. Create a modern, functional form component based on this request: "${userPrompt}"

Requirements:
1. Generate a complete React functional component using TypeScript
2. Use modern React hooks (useState, useEffect if needed)
3. Include proper form validation
4. Use Tailwind CSS for styling with modern, professional design
5. Include animations with framer-motion
6. Make it fully functional with proper state management
7. Add proper TypeScript types
8. Include accessibility features (aria-labels, proper form structure)
9. Add loading states and success/error handling
10. Make it responsive and mobile-friendly

Return your response in this EXACT JSON format:
{
  "title": "Form Title",
  "description": "Brief description of the form",
  "fields": [
    {
      "name": "fieldName",
      "type": "text|email|password|tel|number|select|checkbox|radio|textarea|date|file",
      "label": "Field Label",
      "placeholder": "Optional placeholder",
      "required": true/false,
      "options": ["option1", "option2"],
      "validation": "validation rule description"
    }
  ],
  "submitText": "Submit Button Text",
  "imports": "import statements needed",
  "jsx": "complete JSX component code with typescript"
}

Make the form visually appealing with:
- Modern card design with subtle shadows
- Proper spacing and typography
- Smooth animations
- Beautiful color scheme
- Professional form styling
- Proper error states
- Success feedback

The JSX should be a complete, ready-to-use component that can be copied and pasted.`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const responseText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!responseText) {
        throw new Error("No response from Gemini API");
      }

      // Clean and parse the JSON response
      const cleanedResponse = responseText.replace(/```json|```/g, "").trim();
      const parsedForm = JSON.parse(cleanedResponse);
      
      return parsedForm;
    } catch (error) {
      console.error("Gemini API error:", error);
      throw error;
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a form description");
      return;
    }

    setIsLoading(true);
    setError("");
    
    try {
      const form = await generateFormWithGemini(prompt);
      setGeneratedForm(form);
      setActiveTab('preview');
    } catch (err) {
      setError("Failed to generate form. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!generatedForm) return;
    
    const fullCode = `${generatedForm.imports}\n\n${generatedForm.jsx}`;
    
    try {
      await navigator.clipboard.writeText(fullCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadCode = () => {
    if (!generatedForm) return;
    
    const fullCode = `${generatedForm.imports}\n\n${generatedForm.jsx}`;
    const blob = new Blob([fullCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generatedForm.title.replace(/\s+/g, '-').toLowerCase()}.tsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExampleClick = (example: string) => {
    setPrompt(example);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const resetForm = () => {
    setPrompt("");
    setGeneratedForm(null);
    setError("");
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 shadow-lg"
      >
        <div className="flex items-center gap-3 mb-6">
          <Wand2 className="h-8 w-8 text-white" />
          <h1 className="text-3xl font-bold text-white">AI Form Generator</h1>
        </div>
        
        <p className="text-blue-100 mb-6">
          Describe the form you want to create and our AI will generate a complete React component with Tailwind CSS and Framer Motion.
        </p>
        
        <div className="mb-6">
          <label htmlFor="prompt" className="block text-sm font-medium text-white mb-2">
            Form Description
          </label>
          <textarea
            ref={textareaRef}
            id="prompt"
            rows={4}
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-blue-200 border border-blue-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none transition"
            placeholder="e.g., Create a user registration form with name, email, password, and terms checkbox"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-3 mb-6">
          {examplePrompts.map((example, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-3 py-1.5 text-sm bg-white/20 text-white rounded-full hover:bg-white/30 transition"
              onClick={() => handleExampleClick(example)}
            >
              {example}
            </motion.button>
          ))}
        </div>
        
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "px-6 py-3 bg-white text-blue-600 font-medium rounded-lg flex items-center gap-2",
              isLoading && "opacity-80 cursor-not-allowed"
            )}
            onClick={handleGenerate}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Generate Form
              </>
            )}
          </motion.button>
          
          {generatedForm && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg flex items-center gap-2"
              onClick={resetForm}
            >
              <RefreshCw className="h-5 w-5" />
              Start Over
            </motion.button>
          )}
        </div>
        
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-start gap-2"
          >
            <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <div>{error}</div>
          </motion.div>
        )}
      </motion.div>
      
      {generatedForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="border-b border-gray-200">
            <div className="flex items-center justify-between px-6 py-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">{generatedForm.title}</h2>
                <p className="text-gray-600">{generatedForm.description}</p>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </button>
                <button
                  onClick={downloadCode}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg"
                  title="Download code"
                >
                  <Download className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="flex border-b border-gray-200">
              <button
                className={cn(
                  "px-6 py-3 font-medium flex items-center gap-2",
                  activeTab === 'preview' ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"
                )}
                onClick={() => setActiveTab('preview')}
              >
                <Eye className="h-5 w-5" />
                Preview
              </button>
              <button
                className={cn(
                  "px-6 py-3 font-medium flex items-center gap-2",
                  activeTab === 'code' ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"
                )}
                onClick={() => setActiveTab('code')}
              >
                <Code className="h-5 w-5" />
                Code
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {activeTab === 'preview' ? (
              <div className="bg-gray-50 p-6 rounded-lg">
                <div dangerouslySetInnerHTML={{ __html: generatedForm.jsx }} />
              </div>
            ) : (
              <div className="relative">
                <pre
                  ref={codeRef}
                  className="bg-gray-800 text-gray-100 p-6 rounded-lg overflow-x-auto text-sm"
                >
                  <code>{generatedForm.imports}\n\n{generatedForm.jsx}</code>
                </pre>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

// ================ AI Dashboard Generator ================
const AIDashboardGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedDashboard, setGeneratedDashboard] = useState<GeneratedDashboard | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const codeRef = useRef<HTMLPreElement>(null);

  const apiKey = "AIzaSyDIgil7Utyc91uRuCk99FxpY1yGka-CcNk";
  const model = "gemini-1.5-flash";

  const examplePrompts = [
    "Create an admin dashboard with user statistics, recent orders table, and revenue chart",
    "Build a project management dashboard with task progress, team activity, and deadline tracker",
    "Generate a sales dashboard with monthly revenue, top products, and customer acquisition metrics",
    "Make a health analytics dashboard with activity tracking, sleep analysis, and nutrition overview",
    "Create a social media dashboard with engagement metrics, post analytics, and follower growth",
    "Build an e-commerce dashboard with sales trends, inventory levels, and customer reviews"
  ];

  const generateDashboardWithGemini = async (userPrompt: string): Promise<GeneratedDashboard> => {
    const prompt = `You are an expert React developer. Create a modern, functional admin dashboard based on this request: "${userPrompt}"

Requirements:
1. Generate a complete React dashboard component using TypeScript and Next.js App Router
2. Use modern React hooks (useState, useEffect, etc.)
3. Include multiple components (charts, tables, stats cards)
4. Use Tailwind CSS for styling with modern, professional design
5. Include animations with framer-motion
6. Make it fully functional with mock data
7. Add proper TypeScript types
8. Include responsive layout with sidebar navigation
9. Add loading states and sample data
10. Make it responsive and mobile-friendly

Return your response in this EXACT JSON format:
{
  "title": "Dashboard Title",
  "description": "Brief description of the dashboard",
  "components": [
    {
      "type": "chart|table|stats|list|form",
      "title": "Component Title",
      "description": "Component purpose",
      "dataType": "Type of data displayed",
      "columns": ["column1", "column2"],
      "metrics": ["metric1", "metric2"]
    }
  ],
  "imports": "import statements needed",
  "jsx": "complete JSX component code with typescript"
}

Make the dashboard visually appealing with:
- Modern card design with subtle shadows
- Proper spacing and typography
- Smooth animations
- Beautiful color scheme
- Professional layout with navigation
- Responsive grid system
- Interactive elements

The JSX should be a complete, ready-to-use component that can be copied and pasted.`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const responseText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!responseText) {
        throw new Error("No response from Gemini API");
      }

      // Clean and parse the JSON response
      const cleanedResponse = responseText.replace(/```json|```/g, "").trim();
      const parsedDashboard = JSON.parse(cleanedResponse);
      
      return parsedDashboard;
    } catch (error) {
      console.error("Gemini API error:", error);
      throw error;
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a dashboard description");
      return;
    }

    setIsLoading(true);
    setError("");
    
    try {
      const dashboard = await generateDashboardWithGemini(prompt);
      setGeneratedDashboard(dashboard);
      setActiveTab('preview');
    } catch (err) {
      setError("Failed to generate dashboard. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!generatedDashboard) return;
    
    const fullCode = `${generatedDashboard.imports}\n\n${generatedDashboard.jsx}`;
    
    try {
      await navigator.clipboard.writeText(fullCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadCode = () => {
    if (!generatedDashboard) return;
    
    const fullCode = `${generatedDashboard.imports}\n\n${generatedDashboard.jsx}`;
    const blob = new Blob([fullCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generatedDashboard.title.replace(/\s+/g, '-').toLowerCase()}.tsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExampleClick = (example: string) => {
    setPrompt(example);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const resetDashboard = () => {
    setPrompt("");
    setGeneratedDashboard(null);
    setError("");
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-indigo-600 to-pink-600 rounded-xl p-8 shadow-lg"
      >
        <div className="flex items-center gap-3 mb-6">
          <LayoutDashboard className="h-8 w-8 text-white" />
          <h1 className="text-3xl font-bold text-white">AI Dashboard Generator</h1>
        </div>
        
        <p className="text-indigo-100 mb-6">
          Describe the dashboard you want to create and our AI will generate a complete React component with Tailwind CSS and Framer Motion.
        </p>
        
        <div className="mb-6">
          <label htmlFor="prompt" className="block text-sm font-medium text-white mb-2">
            Dashboard Description
          </label>
          <textarea
            ref={textareaRef}
            id="prompt"
            rows={4}
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-indigo-200 border border-indigo-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition"
            placeholder="e.g., Create an admin dashboard with user statistics, recent orders table, and revenue chart"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-3 mb-6">
          {examplePrompts.map((example, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-3 py-1.5 text-sm bg-white/20 text-white rounded-full hover:bg-white/30 transition"
              onClick={() => handleExampleClick(example)}
            >
              {example}
            </motion.button>
          ))}
        </div>
        
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg flex items-center gap-2",
              isLoading && "opacity-80 cursor-not-allowed"
            )}
            onClick={handleGenerate}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Generate Dashboard
              </>
            )}
          </motion.button>
          
          {generatedDashboard && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg flex items-center gap-2"
              onClick={resetDashboard}
            >
              <RefreshCw className="h-5 w-5" />
              Start Over
            </motion.button>
          )}
        </div>
        
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-start gap-2"
          >
            <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <div>{error}</div>
          </motion.div>
        )}
      </motion.div>
      
      {generatedDashboard && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="border-b border-gray-200">
            <div className="flex items-center justify-between px-6 py-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">{generatedDashboard.title}</h2>
                <p className="text-gray-600">{generatedDashboard.description}</p>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded-lg"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </button>
                <button
                  onClick={downloadCode}
                  className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded-lg"
                  title="Download code"
                >
                  <Download className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="flex border-b border-gray-200">
              <button
                className={cn(
                  "px-6 py-3 font-medium flex items-center gap-2",
                  activeTab === 'preview' ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500 hover:text-gray-700"
                )}
                onClick={() => setActiveTab('preview')}
              >
                <Eye className="h-5 w-5" />
                Preview
              </button>
              <button
                className={cn(
                  "px-6 py-3 font-medium flex items-center gap-2",
                  activeTab === 'code' ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500 hover:text-gray-700"
                )}
                onClick={() => setActiveTab('code')}
              >
                <Code className="h-5 w-5" />
                Code
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {activeTab === 'preview' ? (
              <div className="bg-gray-50 p-6 rounded-lg">
                <div dangerouslySetInnerHTML={{ __html: generatedDashboard.jsx }} />
              </div>
            ) : (
              <div className="relative">
                <pre
                  ref={codeRef}
                  className="bg-gray-800 text-gray-100 p-6 rounded-lg overflow-x-auto text-sm"
                >
                  <code>{generatedDashboard.imports}\n\n{generatedDashboard.jsx}</code>
                </pre>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

// ================ Main Page ================
export default function AIToolsPage() {
  const [activeTool, setActiveTool] = useState<'form' | 'dashboard'>('form');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI-Powered Development Tools</h1>
          <p className="text-xl text-gray-600">
            Generate ready-to-use React components with Tailwind CSS and Framer Motion
          </p>
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-full p-1 shadow-md">
            <button
              onClick={() => setActiveTool('form')}
              className={cn(
                "px-6 py-2 rounded-full font-medium",
                activeTool === 'form' ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <div className="flex items-center gap-2">
                <Wand2 className="h-5 w-5" />
                Form Generator
              </div>
            </button>
            <button
              onClick={() => setActiveTool('dashboard')}
              className={cn(
                "px-6 py-2 rounded-full font-medium",
                activeTool === 'dashboard' ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <div className="flex items-center gap-2">
                <LayoutDashboard className="h-5 w-5" />
                Dashboard Generator
              </div>
            </button>
          </div>
        </div>
        
        {activeTool === 'form' ? <AIFormGenerator /> : <AIDashboardGenerator />}
      </div>
    </div>
  );
}