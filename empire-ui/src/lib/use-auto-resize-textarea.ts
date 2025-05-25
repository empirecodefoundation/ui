import { RefObject, useEffect, useRef } from "react";

interface UseAutoResizeTextareaProps {
    minHeight?: number;
    maxHeight?: number;
}

export function useAutoResizeTextarea({ minHeight = 0, maxHeight = Infinity }: UseAutoResizeTextareaProps = {}) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = (reset = false) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        if (reset) {
            textarea.style.height = `${minHeight}px`;
            return;
        }

        textarea.style.height = `${minHeight}px`;
        const scrollHeight = textarea.scrollHeight;
        textarea.style.height = `${Math.min(Math.max(scrollHeight, minHeight), maxHeight)}px`;
    };

    useEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const observer = new ResizeObserver(() => adjustHeight());
        observer.observe(textarea);

        return () => observer.disconnect();
    }, []);

    return { textareaRef, adjustHeight };
} 