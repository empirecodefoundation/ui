"use client";
import React, { useRef, useEffect, useCallback } from "react";

interface ClickAnimationProps {
    sparkColor?: string;
    sparkSize?: number;
    sparkRadius?: number;
    sparkCount?: number;
    duration?: number;
    easing?: "linear" | "ease-in" | "ease-out" | "ease-in-out";
    extraScale?: number;
}

interface Spark {
    x: number;
    y: number;
    angle: number;
    startTime: number;
}

const GlobalClickAnimation: React.FC<ClickAnimationProps> = ({
    sparkColor = "#ffffff",
    sparkSize = 3,
    sparkRadius = 25,
    sparkCount = 8,
    duration = 200,
    easing = "ease-out",
    extraScale = 1.0,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sparksRef = useRef<Spark[]>([]);
    const startTimeRef = useRef<number | null>(null);

    // Setup canvas to cover the entire viewport
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const handleResize = () => {
            resizeCanvas();
        };

        window.addEventListener('resize', handleResize);
        resizeCanvas();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const easeFunc = useCallback(
        (t: number) => {
            switch (easing) {
                case "linear":
                    return t;
                case "ease-in":
                    return t * t;
                case "ease-in-out":
                    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
                default:
                    return 1 - Math.pow(1 - t, 3);
            }
        },
        [easing]
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;

        const draw = (timestamp: number) => {
            if (!startTimeRef.current) {
                startTimeRef.current = timestamp;
            }
            ctx?.clearRect(0, 0, canvas.width, canvas.height);

            sparksRef.current = sparksRef.current.filter((spark: Spark) => {
                const elapsed = timestamp - spark.startTime;
                if (elapsed >= duration) {
                    return false;
                }

                const progress = elapsed / duration;
                const eased = easeFunc(progress);

                const distance = eased * sparkRadius * extraScale;
                const x = spark.x + distance * Math.cos(spark.angle);
                const y = spark.y + distance * Math.sin(spark.angle);

                // Create white dots that shrink and fade
                const currentSize = sparkSize * (1 - eased * 0.5);
                const opacity = Math.pow(1 - eased, 2);

                ctx.save();
                ctx.globalAlpha = opacity;
                ctx.fillStyle = sparkColor;
                ctx.beginPath();
                ctx.arc(x, y, currentSize, 0, 2 * Math.PI);
                ctx.fill();
                ctx.restore();

                return true;
            });

            animationId = requestAnimationFrame(draw);
        };

        animationId = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration, easeFunc, extraScale]);

    // Global click handler for the entire document
    useEffect(() => {
        const handleGlobalClick = (e: MouseEvent): void => {
            // Get click position relative to viewport
            const x = e.clientX;
            const y = e.clientY;

            const now = performance.now();
            const newSparks: Spark[] = Array.from({length: sparkCount}, (_, i) => ({
                x,
                y,
                angle: (2 * Math.PI * i) / sparkCount,
                startTime: now,
            }));

            sparksRef.current.push(...newSparks);
        };

        document.addEventListener('click', handleGlobalClick);

        return () => {
            document.removeEventListener('click', handleGlobalClick);
        };
    }, [sparkCount]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                pointerEvents: "none",
                zIndex: 9999,
            }}
        />
    );
};

export default GlobalClickAnimation; 