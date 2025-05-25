import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../index";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/extend-expect";

describe("Button Component", () => {
  describe("Rendering", () => {
    it("renders with default props", () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole("button", { name: /click me/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass("bg-blue-600");
    });

    it("renders with different variants", () => {
      const { rerender } = render(<Button variant="primary">Primary</Button>);
      expect(screen.getByRole("button")).toHaveClass("bg-blue-600");

      rerender(<Button variant="secondary">Secondary</Button>);
      expect(screen.getByRole("button")).toHaveClass("bg-gray-600");

      rerender(<Button variant="outline">Outline</Button>);
      expect(screen.getByRole("button")).toHaveClass("border");
    });

    it("renders with different sizes", () => {
      const { rerender } = render(<Button size="sm">Small</Button>);
      expect(screen.getByRole("button")).toHaveClass("h-8");

      rerender(<Button size="md">Medium</Button>);
      expect(screen.getByRole("button")).toHaveClass("h-10");

      rerender(<Button size="lg">Large</Button>);
      expect(screen.getByRole("button")).toHaveClass("h-12");
    });

    it("renders with icon", () => {
      const icon = <span data-testid="icon">🚀</span>;
      render(<Button icon={icon}>With Icon</Button>);
      expect(screen.getByTestId("icon")).toBeInTheDocument();
    });

    it("renders with icon after text", () => {
      const icon = <span data-testid="icon">→</span>;
      render(<Button iconAfter={icon}>With Icon After</Button>);
      expect(screen.getByTestId("icon")).toBeInTheDocument();
    });

    it("applies full width class when fullWidth prop is true", () => {
      render(<Button fullWidth>Full Width</Button>);
      expect(screen.getByRole("button")).toHaveClass("w-full");
    });

    it("merges custom className with default classes", () => {
      render(<Button className="custom-class">Custom Class</Button>);
      expect(screen.getByRole("button")).toHaveClass("custom-class");
    });
  });

  describe("Interactions", () => {
    it("handles click events", () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("disables button when loading", () => {
      render(<Button loading>Click me</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(button).toHaveClass("opacity-50");
    });
  });
});
