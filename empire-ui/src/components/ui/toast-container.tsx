//import this file into your layout.tsx file

"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence } from "framer-motion";
import { useToast } from "./toast";
import { Toast } from "./toast";

export function ToastContainer() {
  const { toasts, removeToast } = useToast();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  
  if (!isMounted) return null;
  
  return createPortal(
    <div className="fixed bottom-0 right-0 z-[9999] flex flex-col gap-3 p-4 max-w-sm w-full max-h-screen overflow-hidden">
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
            className="pointer-events-auto"
          />
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
} 