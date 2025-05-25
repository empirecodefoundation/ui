import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  theme?: "light" | "dark";
  fullWidth?: boolean;
}

const styles = {
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    fontWeight: 500,
    transition: "all 0.2s ease",
    cursor: "pointer",
    border: "none",
    outline: "none",
  },
  variants: {
    primary: {
      backgroundColor: "#0070f3",
      color: "white",
      "&:hover": {
        backgroundColor: "#0051a8",
      },
    },
    secondary: {
      backgroundColor: "#f3f4f6",
      color: "#1f2937",
      "&:hover": {
        backgroundColor: "#e5e7eb",
      },
    },
    danger: {
      backgroundColor: "#dc2626",
      color: "white",
      "&:hover": {
        backgroundColor: "#b91c1c",
      },
    },
  },
  sizes: {
    sm: {
      padding: "0.5rem 1rem",
      fontSize: "0.875rem",
    },
    md: {
      padding: "0.75rem 1.5rem",
      fontSize: "1rem",
    },
    lg: {
      padding: "1rem 2rem",
      fontSize: "1.125rem",
    },
  },
  dark: {
    primary: {
      backgroundColor: "#3b82f6",
      "&:hover": {
        backgroundColor: "#2563eb",
      },
    },
    secondary: {
      backgroundColor: "#374151",
      color: "#f3f4f6",
      "&:hover": {
        backgroundColor: "#4b5563",
      },
    },
    danger: {
      backgroundColor: "#ef4444",
      "&:hover": {
        backgroundColor: "#dc2626",
      },
    },
  },
  loading: {
    opacity: 0.7,
    cursor: "not-allowed",
  },
  fullWidth: {
    width: "100%",
  },
} as const;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  theme = "light",
  fullWidth = false,
  disabled,
  className = "",
  ...props
}) => {
  const buttonStyles = {
    ...styles.base,
    ...styles.variants[variant],
    ...styles.sizes[size],
    ...(theme === "dark" && styles.dark[variant]),
    ...(isLoading && styles.loading),
    ...(fullWidth && styles.fullWidth),
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      style={buttonStyles}
      disabled={disabled || isLoading}
      className={className}
      {...props}
    >
      {isLoading ? (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div
            style={{
              width: "1rem",
              height: "1rem",
              border: "2px solid currentColor",
              borderTopColor: "transparent",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          Loading...
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
};
