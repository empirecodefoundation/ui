import React from "react";
import { motion } from "framer-motion";

export interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  theme?: "light" | "dark";
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  hoverable?: boolean;
}

const styles = {
  card: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "1.5rem",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    transition: "all 0.2s ease",
  },
  dark: {
    backgroundColor: "#1f2937",
    color: "#f3f4f6",
  },
  hoverable: {
    cursor: "pointer",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
  },
  title: {
    fontSize: "1.25rem",
    fontWeight: 600,
    marginBottom: "0.5rem",
  },
  subtitle: {
    fontSize: "0.875rem",
    color: "#6b7280",
    marginBottom: "1rem",
  },
  darkSubtitle: {
    color: "#9ca3af",
  },
} as const;

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  theme = "light",
  className = "",
  style,
  onClick,
  hoverable = false,
}) => {
  const cardStyles = {
    ...styles.card,
    ...(theme === "dark" && styles.dark),
    ...(hoverable && styles.hoverable),
    ...style,
  };

  return (
    <motion.div
      whileHover={hoverable ? { scale: 1.01 } : undefined}
      whileTap={hoverable ? { scale: 0.99 } : undefined}
      style={cardStyles}
      className={className}
      onClick={onClick}
    >
      {title && <h3 style={styles.title}>{title}</h3>}
      {subtitle && (
        <p
          style={{
            ...styles.subtitle,
            ...(theme === "dark" && styles.darkSubtitle),
          }}
        >
          {subtitle}
        </p>
      )}
      {children}
    </motion.div>
  );
};
