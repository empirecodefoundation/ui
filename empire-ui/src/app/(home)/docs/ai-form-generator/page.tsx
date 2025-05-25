'use client';
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  ExternalLink
} from 'lucide-react';

const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Form field types
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

// Dynamic Form Preview Component
const FormPreview = ({ form }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    form.fields.forEach(field => {
      const value = formData[field.name];
      
      if (field.required && (!value || value === '')) {
        newErrors[field.name] = `${field.label} is required`;
      }
      
      if (field.type === 'email' && value && !/\S+@\S+\.\S+/.test(value)) {
        newErrors[field.name] = 'Please enter a valid email address';
      }
      
      if (field.type === 'password' && value && value.length < 6) {
        newErrors[field.name] = 'Password must be at least 6 characters';
      }
    });
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    setTimeout(() => {
      setSubmitted(false);
      setFormData({});
    }, 3000);
  };

  const renderField = (field) => {
    const commonProps = {
      id: field.name,
      name: field.name,
      className: cn(
        "w-full px-4 py-3 rounded-lg border transition-all duration-200",
        errors[field.name] 
          ? "border-red-300 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-400" 
          : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
      ),
      placeholder: field.placeholder || field.label,
      required: field.required,
      onChange: (e) => {
        handleInputChange(field.name, e.target.value);
      },
      value: formData[field.name] || ''
    };

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            {...commonProps}
            rows={4}
          />
        );
      
      case 'select':
        return (
          <select {...commonProps}>
            <option value="">Select {field.label}</option>
            {field.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      
      case 'checkbox':
        return (
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id={field.name}
              name={field.name}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              required={field.required}
              onChange={(e) => handleInputChange(field.name, e.target.checked)}
              checked={formData[field.name] || false}
            />
            <label htmlFor={field.name} className="text-sm text-gray-700">
              {field.label}
            </label>
          </div>
        );
      
      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map(option => (
              <div key={option} className="flex items-center gap-3">
                <input
                  type="radio"
                  id={`${field.name}-${option}`}
                  name={field.name}
                  value={option}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  checked={formData[field.name] === option}
                />
                <label htmlFor={`${field.name}-${option}`} className="text-sm text-gray-700">
                  {option}
                </label>
              </div>
            ))}
          </div>
        );
      
      default:
        return <input type={field.type} {...commonProps} />;
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Form Submitted Successfully!</h3>
        <p className="text-gray-600">Thank you for your submission.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{form.title}</h2>
          <p className="text-gray-600">{form.description}</p>
        </div>
        
        <div onSubmit={handleSubmit} className="space-y-6">
          {form.fields.map((field) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              {field.type !== 'checkbox' && (
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
              )}
              
              {renderField(field)}
              
              {errors[field.name] && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-600 mt-1"
                >
                  {errors[field.name]}
                </motion.p>
              )}
            </motion.div>
          ))}
          
          <motion.button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "w-full py-3 px-6 rounded-lg font-medium text-white transition-all duration-200",
              isSubmitting 
                ? "bg-blue-400 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-200"
            )}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Submitting...
              </div>
            ) : (
              form.submitText || 'Submit'
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// New Window Preview Component
const NewWindowPreview = ({ form }) => {
  const openInNewWindow = () => {
    const fullCode = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${form.title}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://unpkg.com/framer-motion@10/dist/framer-motion.js"></script>
</head>
<body class="bg-gray-50 min-h-screen p-8">
    <div id="root"></div>
    <script type="text/babel">
        const { useState } = React;
        const { motion } = FramerMotion;
        
        ${form.jsx}
        
        ReactDOM.render(React.createElement(FormComponent), document.getElementById('root'));
    </script>
</body>
</html>`;

    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(fullCode);
      newWindow.document.close();
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={openInNewWindow}
      className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
    >
      <ExternalLink className="h-4 w-4" />
    </motion.button>
  );
};

// Main AI Form Generator Component
export default function AIFormGenerator() {
  const [prompt, setPrompt] = useState("");
  const [generatedForm, setGeneratedForm] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('preview');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  
  const textareaRef = useRef(null);
  
  // Replace with your actual Gemini API key
  const apiKey = "AIzaSyDIgil7Utyc91uRuCk99FxpY1yGka-CcNk";
  const model = "gemini-1.5-flash";

  const examplePrompts = [
    "Generate a form with only name field and button, name field has placeholder 'Hello Kitty'",
    "Create a simple contact form with name, email and message fields",
    "Build a registration form with username, email, password and confirm password",
    "Make a survey form with rating (1-5 stars) and feedback textarea",
    "Create a booking form with date picker, time slots, and guest count",
    "Generate a newsletter signup with email and preferences checkboxes"
  ];

  const generateFormWithGemini = async (userPrompt) => {
    const prompt = `You are an expert React developer. Create a modern, functional form component based on this request: "${userPrompt}"

Requirements:
1. Generate a complete React functional component using modern hooks
2. Use Tailwind CSS for styling with modern, professional design
3. Include proper form validation where appropriate
4. Make it fully functional with proper state management
5. Include accessibility features
6. Add smooth animations with framer-motion
7. Make it responsive and mobile-friendly

Return your response in this EXACT JSON format (no markdown, no extra text):
{
  "title": "Form Title",
  "description": "Brief description of the form",
  "fields": [
    {
      "name": "fieldName",
      "type": "text|email|password|tel|number|select|checkbox|radio|textarea|date|file",
      "label": "Field Label",
      "placeholder": "placeholder text if specified",
      "required": true/false,
      "options": ["option1", "option2"] (only for select/radio),
      "validation": "validation rule description"
    }
  ],
  "submitText": "Submit Button Text",
  "imports": "import React, { useState } from 'react'; import { motion } from 'framer-motion';",
  "jsx": "const FormComponent = () => { const [formData, setFormData] = useState({}); return (<motion.div initial={{opacity: 0}} animate={{opacity: 1}} className='max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg'><h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>TITLE</h2><div className='space-y-4'>FIELDS</div><button className='w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition'>SUBMIT_TEXT</button></motion.div>); };"
}

Make the form visually appealing with:
- Modern card design with subtle shadows
- Proper spacing and typography
- Smooth animations
- Beautiful color scheme
- Professional form styling
- The JSX should be a complete, working component`;

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
      let cleanedResponse = responseText.replace(/```json|```/g, "").trim();
      
      // Remove any leading/trailing text that's not JSON
      const jsonStart = cleanedResponse.indexOf('{');
      const jsonEnd = cleanedResponse.lastIndexOf('}') + 1;
      if (jsonStart !== -1 && jsonEnd !== -1) {
        cleanedResponse = cleanedResponse.substring(jsonStart, jsonEnd);
      }
      
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

  const handleExampleClick = (example) => {
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
    <div className="min-h-screen bg- from-gray-50 via-blue-50/30 to-purple-50/30">
      <div className="container mx-auto py-12 px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            AI Form Generator
          </h1>
          <p className="text-xl text-gray-600 text-white max-w-2xl mx-auto">
            Generate beautiful, functional React forms with AI assistance using Gemini
          </p>
        </motion.div>

        {/* Main Generator Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl p-8 shadow-2xl overflow-hidden mb-8"
        >
          {/* Background decorative elements */}
          <div className="absolute inset-0 "></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-36 -translate-x-36"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Wand2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Create Your Form</h2>
                <p className="text-blue-100 text-lg">
                  Describe what you want and AI will generate it instantly
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="prompt" className="block text-sm font-medium text-white mb-3">
                  Describe Your Form
                </label>
                <textarea
                  ref={textareaRef}
                  id="prompt"
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder-blue-200 border border-white/20 focus:ring-2 focus:ring-white/30 focus:border-white/40 outline-none transition-all duration-200"
                  placeholder="e.g., Generate a form with only name field and button, name field has placeholder 'Hello Kitty'"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                
                <div className="flex gap-3 mt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "px-6 py-3 bg-white text-blue-600 font-medium rounded-xl flex items-center gap-2 shadow-lg transition-all duration-200",
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
                      className="px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-medium rounded-xl flex items-center gap-2 transition-all duration-200"
                      onClick={resetForm}
                    >
                      <RefreshCw className="h-5 w-5" />
                      Start Over
                    </motion.button>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-white mb-3">Try These Examples</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {examplePrompts.map((example, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full text-left p-3 text-sm bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-all duration-200 border border-white/10"
                      onClick={() => handleExampleClick(example)}
                    >
                      {example}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
            
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-red-500/20 backdrop-blur-sm text-red-100 rounded-xl flex items-start gap-3 border border-red-400/30"
              >
                <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>{error}</div>
              </motion.div>
            )}
          </div>
        </motion.div>
        
        {/* Generated Form Display */}
        {generatedForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between px-6 py-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{generatedForm.title}</h2>
                  <p className="text-gray-600 mt-1">{generatedForm.description}</p>
                </div>
                
                <div className="flex gap-2">
                  <NewWindowPreview form={generatedForm} />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={copyToClipboard}
                    className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                    title="Copy to clipboard"
                  >
                    {copied ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={downloadCode}
                    className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                    title="Download code"
                  >
                    <Download className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>
              
              {/* Tabs */}
              <div className="flex border-b border-gray-200">
                <motion.button
                  whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                  className={cn(
                    "px-6 py-3 font-medium flex items-center gap-2 transition-all duration-200",
                    activeTab === 'preview' 
                      ? "text-blue-600 border-b-2 border-blue-600 bg-white" 
                      : "text-gray-500 hover:text-gray-700"
                  )}
                  onClick={() => setActiveTab('preview')}
                >
                  <Eye className="h-5 w-5" />
                  Live Preview
                </motion.button>
                <motion.button
                  whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                  className={cn(
                    "px-6 py-3 font-medium flex items-center gap-2 transition-all duration-200",
                    activeTab === 'code' 
                      ? "text-blue-600 border-b-2 border-blue-600 bg-white" 
                      : "text-gray-500 hover:text-gray-700"
                  )}
                  onClick={() => setActiveTab('code')}
                >
                  <Code className="h-5 w-5" />
                  Generated Code
                </motion.button>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {activeTab === 'preview' ? (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="min-h-[400px] bg-gray-50 rounded-xl p-6"
                  >
                    <FormPreview form={generatedForm} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="code"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <div className="bg-gray-900 rounded-xl overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-gray-400 text-sm font-mono">
                          {generatedForm.title.replace(/\s+/g, '-').toLowerCase()}.tsx
                        </span>
                      </div>
                      <pre className="text-sm text-gray-100 p-6 overflow-x-auto max-h-96">
                        <code>{generatedForm.imports}\n\n{generatedForm.jsx}</code>
                      </pre>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}