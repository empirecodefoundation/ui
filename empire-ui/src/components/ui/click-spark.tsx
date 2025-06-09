import React, { useRef, useEffect, useCallback } from "react";

interface ClickSparkProps {
    sparkColor?: string;
    sparkSize?: number;
    sparkRadius?: number;
    sparkCount?: number;
    duration?: number;
    easing?: "linear" | "ease-in" | "ease-out" | "ease-in-out";
    extraScale?: number;
    children?: React.ReactNode;
}

interface Spark {
    x: number;
    y: number;
    angle: number;
    startTime: number;
}

const ClickSpark: React.FC<ClickSparkProps> = ({
    sparkColor = "#ffffff",
    sparkSize = 4,
    sparkRadius = 30,
    sparkCount = 8,
    duration = 400,
    easing = "ease-out",
    extraScale = 1.0,
    children
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sparksRef = useRef<Spark[]>([]);
    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const parent = canvas.parentElement;
        if (!parent) return;

        let resizeTimeout: NodeJS.Timeout;

        const resizeCanvas = () => {
            const { width, height } = parent.getBoundingClientRect();
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
            }
        };

        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resizeCanvas, 100);
        };

        const ro = new ResizeObserver(handleResize);
        ro.observe(parent);

        resizeCanvas();

        return () => {
            ro.disconnect();
            clearTimeout(resizeTimeout);
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

    const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const now = performance.now();
        const newSparks: Spark[] = Array.from({length: sparkCount}, (_, i) => ({
            x,
            y,
            angle: (2 * Math.PI * i) / sparkCount,
            startTime: now,
        }));

        sparksRef.current.push(...newSparks);
    };

    return (
        <div style={{
            width: "100%",
            height: "100%",
            position: "relative"
        }}
        onClick={handleClick}
        >
            <canvas
                ref={canvasRef}
                style={{
                   position: "absolute",
                   inset: 0,
                   pointerEvents: "none",
                   zIndex: 9999
                }}
            />
            {children}
        </div>
    );
};

export default ClickSpark; 