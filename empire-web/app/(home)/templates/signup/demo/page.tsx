"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingProvider } from "@/components/core/loading-provider";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Rocket, 
  ArrowLeft,
  Github,
  Chrome
} from "lucide-react";
import { MinecartLCD } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useNavigation } from "@/lib/hooks/use-navigation";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  agreeToTerms: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  agreeToTerms?: string;
}

export default function SignupDemoPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const { navigateTo } = useNavigation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Account created successfully! (Demo)');
    }, 2000);
  };

  const socialLogins = [
    { 
      name: 'Google', 
      icon: Chrome, 
      color: 'border-red-200 hover:border-red-300 hover:bg-red-50',
      iconColor: 'text-red-500'
    },
    { 
      name: 'GitHub', 
      icon: Github, 
      color: 'border-gray-200 hover:border-gray-300 hover:bg-gray-50',
      iconColor: 'text-gray-700'
    }
  ];

  return (
    <LoadingProvider>
      <div className={cn("min-h-screen flex", MinecartLCD.className)}>
        {/* Left Side - Signup Form */}
        <motion.div 
          className="flex-1 flex items-center justify-center p-8 bg-white"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-full max-w-md">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <Button
                onClick={() => navigateTo("/templates/signup")}
                variant="outline"
                size="sm"
                className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                BACK TO TEMPLATE
              </Button>
            </motion.div>

            {/* Logo */}
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
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
                <motion.button
                  key={social.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "w-full flex items-center justify-center gap-3 p-3 border rounded-lg transition-all duration-200",
                    social.color
                  )}
                >
                  <social.icon className={cn("h-5 w-5", social.iconColor)} />
                  <span className="text-gray-700 font-medium">Continue with {social.name}</span>
                </motion.button>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={cn(
                        "pl-10 transition-all duration-200",
                        errors.firstName ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                      )}
                      required
                    />
                  </div>
                  {errors.firstName && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs mt-1"
                    >
                      {errors.firstName}
                    </motion.p>
                  )}
                </div>
                
                <div>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={cn(
                        "pl-10 transition-all duration-200",
                        errors.lastName ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                      )}
                      required
                    />
                  </div>
                  {errors.lastName && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs mt-1"
                    >
                      {errors.lastName}
                    </motion.p>
                  )}
                </div>
              </div>
              
              <div>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={cn(
                      "pl-10 transition-all duration-200",
                      errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                    )}
                    required
                  />
                </div>
                {errors.email && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs mt-1"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </div>
              
              <div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={cn(
                      "pl-10 pr-10 transition-all duration-200",
                      errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                    )}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs mt-1"
                  >
                    {errors.password}
                  </motion.p>
                )}
              </div>

              <div>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                  />
                  <label className="ml-2 text-sm text-gray-600">
                    I agree to the{' '}
                    <a href="#" className="text-blue-600 hover:underline transition-colors">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="text-blue-600 hover:underline transition-colors">Privacy Policy</a>
                  </label>
                </div>
                {errors.agreeToTerms && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs mt-1"
                  >
                    {errors.agreeToTerms}
                  </motion.p>
                )}
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Creating Account...
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </motion.div>
            </motion.form>

            {/* Login Link */}
            <motion.p 
              className="text-center text-sm text-gray-600 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Already have an account?{' '}
              <a href="#" className="text-blue-600 hover:underline font-medium transition-colors">
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
          <div className="text-center text-white z-10 max-w-md px-8">
            <motion.div 
              className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center backdrop-blur-sm"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.8, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
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
              className="text-blue-100 text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              Join our community and start your journey with us today. Discover amazing features and connect with like-minded individuals.
            </motion.p>

            <motion.div
              className="mt-8 flex justify-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              {[
                { label: '10K+', desc: 'Users' },
                { label: '50+', desc: 'Countries' },
                { label: '99%', desc: 'Uptime' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                >
                  <div className="text-2xl font-bold text-white">{stat.label}</div>
                  <div className="text-blue-200 text-sm">{stat.desc}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute border border-white rounded-full"
                style={{
                  top: `${10 + Math.random() * 80}%`,
                  left: `${10 + Math.random() * 80}%`,
                  width: `${20 + Math.random() * 60}px`,
                  height: `${20 + Math.random() * 60}px`
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1, 1.2, 1],
                  opacity: [0, 0.1, 0.2, 0.1]
                }}
                transition={{ 
                  duration: 3,
                  delay: 1.5 + i * 0.2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            ))}
          </div>

          {/* Floating Elements */}
          <motion.div
            className="absolute top-20 left-20 w-4 h-4 bg-white/20 rounded-full"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-32 right-16 w-6 h-6 bg-white/15 rounded-full"
            animate={{
              y: [0, 15, 0],
              x: [0, -15, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </motion.div>
      </div>
    </LoadingProvider>
  );
} 