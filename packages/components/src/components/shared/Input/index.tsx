import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

export interface InputProps extends Omit<HTMLMotionProps<"input">, "ref"> {
  label?: string;
  error?: string;
  theme?: "light" | "dark";
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.5rem",
  },
  label: {
    fontSize: "0.875rem",
    fontWeight: 500,
  },
  inputWrapper: {
    position: "relative" as const,
    display: "flex",
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    fontSize: "0.875rem",
    outline: "none",
    transition: "all 0.2s ease",
  },
  dark: {
    label: {
      color: "#f3f4f6",
    },
    input: {
      backgroundColor: "#374151",
      color: "#f3f4f6",
      borderColor: "#4b5563",
      "&:focus": {
        borderColor: "#6366f1",
      },
    },
  },
  error: {
    borderColor: "#dc2626",
    "&:focus": {
      borderColor: "#dc2626",
    },
  },
  errorMessage: {
    color: "#dc2626",
    fontSize: "0.75rem",
  },
  icon: {
    position: "absolute" as const,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#6b7280",
  },
  leftIcon: {
    left: "0.75rem",
  },
  rightIcon: {
    right: "0.75rem",
  },
  withLeftIcon: {
    paddingLeft: "2.5rem",
  },
  withRightIcon: {
    paddingRight: "2.5rem",
  },
} as const;

export const Input: React.FC<InputProps> = ({
  label,
  error,
  theme = "light",
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = "",
  style,
  ...props
}) => {
  const inputStyles = {
    ...styles.input,
    ...(theme === "dark" && styles.dark.input),
    ...(error && styles.error),
    ...(leftIcon && styles.withLeftIcon),
    ...(rightIcon && styles.withRightIcon),
    ...(fullWidth && { width: "100%" }),
    ...style,
  };

  return (
    <div style={{ ...styles.container, ...(fullWidth && { width: "100%" }) }}>
      {label && (
        <label
          style={{
            ...styles.label,
            ...(theme === "dark" && styles.dark.label),
          }}
        >
          {label}
        </label>
      )}
      <div style={styles.inputWrapper}>
        {leftIcon && (
          <div style={{ ...styles.icon, ...styles.leftIcon }}>{leftIcon}</div>
        )}
        <motion.input
          whileFocus={{ scale: 1.01 }}
          style={inputStyles}
          className={className}
          {...props}
        />
        {rightIcon && (
          <div style={{ ...styles.icon, ...styles.rightIcon }}>{rightIcon}</div>
        )}
      </div>
      {error && <span style={styles.errorMessage}>{error}</span>}
    </div>
  );
};
