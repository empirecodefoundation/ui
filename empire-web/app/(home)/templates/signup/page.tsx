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
      <div className="relative w-full h-[600px] bg-gradient-to-br from-blue-50 to-indigo-100 border-4 border-dotted border-orange-600 overflow-hidden">
        <div className="absolute inset-0 flex">
          {/* Left Side - Signup Form */}
          <div className="w-1/2 p-8 flex items-center justify-center">
            <div className="w-full max-w-md">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-blue-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">E</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
                <p className="text-gray-600">Join thousands of users today</p>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-3 mb-6">
                <button className="w-full flex items-center justify-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-5 h-5 bg-red-500 rounded"></div>
                  <span className="text-gray-700 font-medium">Continue with Google</span>
                </button>
                <button className="w-full flex items-center justify-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-5 h-5 bg-blue-600 rounded"></div>
                  <span className="text-gray-700 font-medium">Continue with Facebook</span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-500">or</span>
                </div>
              </div>

              {/* Signup Form */}
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="First name"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Last name"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />

                <div className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
                  <label className="ml-2 text-sm text-gray-600">
                    I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                  </label>
                </div>

                <button className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Create Account
                </button>
              </form>

              {/* Login Link */}
              <p className="text-center text-sm text-gray-600 mt-6">
                Already have an account? <a href="#" className="text-blue-600 hover:underline font-medium">Sign in</a>
              </p>
            </div>
          </div>

          {/* Right Side - Illustration/Image */}
          <div className="w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center relative overflow-hidden">
            <div className="text-center text-white z-10">
              <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🚀</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-4">Welcome aboard!</h2>
              <p className="text-blue-100 text-lg">Join our community and start your journey with us today.</p>
            </div>
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 border border-white rounded-full"></div>
              <div className="absolute top-32 right-16 w-16 h-16 border border-white rounded-full"></div>
              <div className="absolute bottom-20 left-20 w-12 h-12 border border-white rounded-full"></div>
              <div className="absolute bottom-40 right-10 w-8 h-8 border border-white rounded-full"></div>
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
        <div className="mb-2">npx create-next-app@latest signup-page</div>
        <div className="mb-2">cd signup-page</div>
        <div className="mb-4">npm install framer-motion lucide-react react-hook-form zod</div>
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
{`// Modern Signup Page Component
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Eye, EyeOff, Mail, Lock, User, Rocket } from 'lucide-react';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    agreeToTerms: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const socialLogins = [
    { name: 'Google', icon: '🔍', color: 'bg-red-500' },
    { name: 'Facebook', icon: '📘', color: 'bg-blue-600' },
    { name: 'Twitter', icon: '🐦', color: 'bg-sky-500' }
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Signup Form */}
      <motion.div 
        className="flex-1 flex items-center justify-center p-8 bg-white"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-full max-w-md">
          {/* Logo */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-600">Join thousands of users today</p>
          </motion.div>

          {/* Social Login Buttons */}
          <motion.div 
            className="space-y-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {socialLogins.map((social, index) => (
              <Button
                key={social.name}
                variant="outline"
                className="w-full flex items-center justify-center gap-3 p-3 border-gray-300 hover:bg-gray-50 transition-all duration-200"
              >
                <span className="text-lg">{social.icon}</span>
                <span className="text-gray-700 font-medium">Continue with {social.name}</span>
              </Button>
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div 
            className="relative mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or</span>
            </div>
          </motion.div>

          {/* Signup Form */}
          <motion.form 
            onSubmit={handleSubmit}
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
                className="pl-10"
                required
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                required
              />
              <label className="ml-2 text-sm text-gray-600">
                I agree to the{' '}
                <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
              </label>
            </div>

            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
              disabled={!formData.agreeToTerms}
            >
              Create Account
            </Button>
          </motion.form>

          {/* Login Link */}
          <motion.p 
            className="text-center text-sm text-gray-600 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Already have an account?{' '}
            <a href="#" className="text-blue-600 hover:underline font-medium">
              Sign in
            </a>
          </motion.p>
        </div>
      </motion.div>

      {/* Right Side - Illustration */}
      <motion.div 
        className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-600 to-indigo-700 items-center justify-center relative overflow-hidden"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="text-center text-white z-10 max-w-md">
          <motion.div 
            className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center backdrop-blur-sm"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center">
              <Rocket className="w-10 h-10 text-white" />
            </div>
          </motion.div>
          
          <motion.h2 
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            Welcome aboard!
          </motion.h2>
          
          <motion.p 
            className="text-blue-100 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            Join our community and start your journey with us today.
          </motion.p>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={\`absolute border border-white rounded-full\`}
              style={{
                top: \`\${Math.random() * 80}%\`,
                left: \`\${Math.random() * 80}%\`,
                width: \`\${20 + Math.random() * 40}px\`,
                height: \`\${20 + Math.random() * 40}px\`
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.1 }}
              transition={{ duration: 0.6, delay: 1.2 + i * 0.1 }}
            />
          ))}
        </div>
      </motion.div>
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
{`/* Modern Signup Page Styles */
:root {
  --primary-blue: #2563eb;
  --primary-indigo: #4f46e5;
  --gradient-from: #2563eb;
  --gradient-to: #4f46e5;
  --success-green: #10b981;
  --error-red: #ef4444;
  --warning-yellow: #f59e0b;
}

.signup-container {
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  display: flex;
}

/* Form Section */
.form-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: white;
}

.form-container {
  width: 100%;
  max-width: 28rem;
}

/* Logo Animation */
.logo-container {
  text-align: center;
  margin-bottom: 2rem;
}

.logo {
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, var(--primary-blue), var(--primary-indigo));
  border-radius: 0.75rem;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 25px rgba(37, 99, 235, 0.2);
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 35px rgba(37, 99, 235, 0.3);
}

/* Social Login Buttons */
.social-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  background: white;
  transition: all 0.2s ease;
  cursor: pointer;
}

.social-button:hover {
  background: #f9fafb;
  border-color: #9ca3af;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.social-button:active {
  transform: translateY(0);
}

/* Input Fields */
.input-group {
  position: relative;
  margin-bottom: 1rem;
}

.input-field {
  width: 100%;
  padding: 0.75rem;
  padding-left: 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  background: white;
}

.input-field:focus {
  outline: none;
  border-color: var(--primary-blue);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.input-field:invalid {
  border-color: var(--error-red);
}

.input-field:valid {
  border-color: var(--success-green);
}

.input-icon {
  position: absolute;
  left: 0.75rem;
  top: 0.75rem;
  width: 1.25rem;
  height: 1.25rem;
  color: #9ca3af;
  transition: color 0.2s ease;
}

.input-field:focus + .input-icon {
  color: var(--primary-blue);
}

/* Password Toggle */
.password-toggle {
  position: absolute;
  right: 0.75rem;
  top: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #9ca3af;
  transition: color 0.2s ease;
}

.password-toggle:hover {
  color: #6b7280;
}

/* Submit Button */
.submit-button {
  width: 100%;
  background: linear-gradient(135deg, var(--primary-blue), var(--primary-indigo));
  color: white;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: none;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(37, 99, 235, 0.4);
}

.submit-button:active:not(:disabled) {
  transform: translateY(0);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.2);
}

/* Checkbox */
.checkbox {
  width: 1rem;
  height: 1rem;
  accent-color: var(--primary-blue);
  margin-top: 0.25rem;
}

/* Illustration Section */
.illustration-section {
  flex: 1;
  background: linear-gradient(135deg, var(--primary-blue), var(--primary-indigo));
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.illustration-content {
  text-align: center;
  color: white;
  z-index: 10;
  max-width: 28rem;
  padding: 2rem;
}

.illustration-icon {
  width: 8rem;
  height: 8rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.illustration-inner {
  width: 5rem;
  height: 5rem;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Background Pattern */
.bg-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.1;
}

.pattern-circle {
  position: absolute;
  border: 1px solid white;
  border-radius: 50%;
  animation: pulse 4s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.1; transform: scale(1); }
  50% { opacity: 0.2; transform: scale(1.05); }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .illustration-section {
    display: none;
  }
  
  .form-section {
    flex: none;
    width: 100%;
  }
}

@media (max-width: 768px) {
  .form-section {
    padding: 1rem;
  }
  
  .form-container {
    max-width: 100%;
  }
  
  .grid-cols-2 {
    grid-template-columns: 1fr;
  }
}

/* Form Validation States */
.field-error {
  border-color: var(--error-red);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.field-success {
  border-color: var(--success-green);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

/* Loading States */
.loading {
  opacity: 0.7;
  pointer-events: none;
}

.loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin: -10px 0 0 -10px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Success Animation */
.success-checkmark {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--success-green);
  position: relative;
  animation: checkmark-appear 0.3s ease-out;
}

@keyframes checkmark-appear {
  0% { opacity: 0; transform: scale(0); }
  100% { opacity: 1; transform: scale(1); }
}`}
        </pre>
      </div>
    )
  }
];

export default function SignupPage() {
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
npx create-next-app@latest signup-page
cd signup-page
npm install framer-motion lucide-react react-hook-form zod

# Install Empire UI
npm install @empire-ui/components
npm install tailwindcss postcss autoprefixer

# Run development server
npm run dev`;

  const getCodeContent = () => `// Modern Signup Page Component
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Eye, EyeOff, Mail, Lock, User, Rocket } from 'lucide-react';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    agreeToTerms: false
  });

  // Complete component implementation
  return (
    <div className="min-h-screen flex">
      {/* Form and illustration sections */}
    </div>
  );
}`;

  const getCssContent = () => `/* Modern Signup Page Styles */
:root {
  --primary-blue: #2563eb;
  --primary-indigo: #4f46e5;
  --gradient-from: #2563eb;
  --gradient-to: #4f46e5;
  --success-green: #10b981;
  --error-red: #ef4444;
}

.signup-container {
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  display: flex;
}

.form-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: white;
}

/* Additional styles for animations, responsive design, etc. */`;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ResponsiveWrapper>
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigateTo("/templates")}
                variant="outline"
                size="sm"
                className={cn("border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white", MinecartLCD.className)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                BACK TO TEMPLATES
              </Button>
              <div>
                <h1 className={cn("text-3xl font-bold text-gray-900", MinecartLCD.className)}>
                  SIGNUP PAGE TEMPLATE
                </h1>
                <p className={cn("text-gray-600 mt-1", MinecartLCD.className)}>
                  MODERN SIGNUP PAGE WITH SOCIAL LOGIN & FORM VALIDATION
                </p>
              </div>
            </div>
            
            <Button
              onClick={() => navigateTo("/templates/signup/demo")}
              className={cn("bg-orange-600 text-white hover:bg-orange-700", MinecartLCD.className)}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              VIEW LIVE DEMO
            </Button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Badge className="bg-blue-100 text-blue-800 border border-blue-300">AUTHENTICATION</Badge>
            <Badge className="bg-green-100 text-green-800 border border-green-300">FORMS</Badge>
            <Badge className="bg-purple-100 text-purple-800 border border-purple-300">SOCIAL LOGIN</Badge>
            <Badge className="bg-orange-100 text-orange-800 border border-orange-300">RESPONSIVE</Badge>
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