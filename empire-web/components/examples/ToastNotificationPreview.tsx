"use client";

import React, { useState } from "react";
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Toast {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
}

const toastIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const toastStyles = {
  success: "bg-green-50 border-green-200 text-green-800",
  error: "bg-red-50 border-red-200 text-red-800",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
  info: "bg-blue-50 border-blue-200 text-blue-800",
};

const iconStyles = {
  success: "text-green-500",
  error: "text-red-500",
  warning: "text-yellow-500",
  info: "text-blue-500",
};

export default function ToastNotificationPreview() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (type: Toast["type"]) => {
    const messages = {
      success: { title: "Success!", message: "Your action was completed successfully." },
      error: { title: "Error!", message: "Something went wrong. Please try again." },
      warning: { title: "Warning!", message: "Please check your input before proceeding." },
      info: { title: "Info", message: "Here's some helpful information for you." },
    };

    const newToast: Toast = {
      id: Date.now().toString(),
      type,
      ...messages[type],
    };

    setToasts(prev => [...prev, newToast]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      removeToast(newToast.id);
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="space-y-6">
        {/* Demo Controls */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Toast Notification Demo</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={() => addToast("success")}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              Success Toast
            </button>
            <button
              onClick={() => addToast("error")}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
            >
              Error Toast
            </button>
            <button
              onClick={() => addToast("warning")}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
            >
              Warning Toast
            </button>
            <button
              onClick={() => addToast("info")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              Info Toast
            </button>
          </div>
        </div>

        {/* Toast Container */}
        <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
          <AnimatePresence>
            {toasts.map((toast) => {
              const Icon = toastIcons[toast.type];
              return (
                <motion.div
                  key={toast.id}
                  initial={{ opacity: 0, x: 300, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 300, scale: 0.8 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`p-4 rounded-lg border shadow-lg ${toastStyles[toast.type]}`}
                >
                  <div className="flex items-start space-x-3">
                    <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${iconStyles[toast.type]}`} />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm">{toast.title}</h4>
                      <p className="text-sm mt-1 opacity-90">{toast.message}</p>
                    </div>
                    <button
                      onClick={() => removeToast(toast.id)}
                      className="flex-shrink-0 p-1 hover:bg-black/10 rounded transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Features */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Toast Features</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Multiple notification types</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Smooth animations</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Auto-dismiss functionality</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Manual close option</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Stacking support</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Customizable positioning</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 