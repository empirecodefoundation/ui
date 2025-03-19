"use client";

import React, { useState, useEffect, createContext, useContext, useCallback } from "react";
import { createPortal } from "react-dom";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ToastProps extends VariantProps<typeof toastVariants> {
  id: string;
  title?: string;
  description?: string;
  duration?: number;
  onClose: () => void;
  className?: string;
}

const toastVariants = cva(
  "relative pointer-events-auto flex w-full items-center justify-between space-x-4 overflow-hidden rounded-lg p-4 shadow-md backdrop-blur-sm border border-transparent",
  {
    variants: {
      variant: {
        default: "bg-background/80 border-border/60 text-foreground",
        success: "bg-background/80 border-[#18CCFC]/40 text-[#18CCFC]",
        warning: "bg-background/80 border-[#FF9900]/40 text-[#FF9900]",
        error: "bg-background/80 border-[#FF4444]/40 text-[#FF4444]",
        info: "bg-background/80 border-[#6344F5]/40 text-[#6344F5]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Toast = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div"> & ToastProps
>(({ className, variant, title, description, duration = 5000, onClose, ...props }, ref) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  // Stars effect
  const starCount = 6;
  const stars = Array.from({ length: starCount }).map((_, i) => {
    const size = Math.random() * 2 + 1;
    const left = Math.random() * 100;
    const animationDuration = Math.random() * 2 + 1;
    const delay = Math.random() * 2;
    
    return (
      <div
        key={i}
        className="absolute rounded-full bg-white opacity-70"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${left}%`,
          top: `${Math.random() * 100}%`,
          animation: `twinkle ${animationDuration}s infinite ${delay}s`
        }}
      />
    );
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={cn(
        toastVariants({ variant }),
        "clip-polygon overflow-hidden",
        "group space-y-1",
        className
      )}
      {...props}
    >
      {/* Space effect background */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 to-zinc-900 -z-10" />
      
      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden -z-5">
        {stars}
      </div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#18CCFC]/5 to-transparent -z-5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex-1">
        {title && <h4 className="font-semibold tracking-wide">{title}</h4>}
        {description && <div className="text-sm opacity-90">{description}</div>}
      </div>
      
      {/* <button 
        onClick={onClose}
        className="ml-auto shrink-0 rounded-full p-1 transition-colors hover:bg-white/10 focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button> */}
    </motion.div>
  );
});
Toast.displayName = "Toast";

// Toast Context and Provider
type ToastType = {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "success" | "warning" | "error" | "info";
  duration?: number;
};

interface ToastContextValue {
  toasts: ToastType[];
  addToast: (toast: Omit<ToastType, "id">) => void;
  removeToast: (id: string) => void;
}

// Create a default context value to avoid the error
const defaultToastContext: ToastContextValue = {
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
};

const ToastContext = createContext<ToastContextValue>(defaultToastContext);

function ToastContainer({ toasts, removeToast }: { 
  toasts: ToastType[]; 
  removeToast: (id: string) => void;
}) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  
  if (!isMounted) return null;
  
  return createPortal(
    <div className="fixed bottom-0 right-0 z-50 flex flex-col gap-3 p-4 max-w-sm w-full max-h-screen overflow-hidden pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            title={toast.title}
            description={toast.description}
            variant={toast.variant}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastType[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const addToast = useCallback((toast: Omit<ToastType, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, ...toast }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const contextValue = {
    toasts,
    addToast,
    removeToast,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {mounted && typeof window !== 'undefined' && <ToastContainer toasts={toasts} removeToast={removeToast} />}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  return context;
}

// Export the components
export { Toast, toastVariants }; 
