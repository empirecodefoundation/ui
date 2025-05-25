import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PromptEditor } from "../index";
import { vi } from "vitest";

// Mock the useApi hook
vi.mock("../../../hooks/useApi", () => ({
  useApi: () => ({
    callApi: vi.fn().mockResolvedValue({
      choices: [{ text: "Test response" }],
    }),
    isLoading: false,
    error: null,
  }),
}));

describe("PromptEditor", () => {
  const mockProps = {
    openAIApiKey: "test-api-key",
    onSave: vi.fn(),
    onTest: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default template", () => {
    render(<PromptEditor {...mockProps} />);

    expect(screen.getByLabelText("Template name")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Prompt template content")
    ).toBeInTheDocument();
    expect(screen.getByText("Test Prompt")).toBeInTheDocument();
    expect(screen.getByText("Save Template")).toBeInTheDocument();
  });

  it("renders with initial template", () => {
    const initialTemplate = {
      id: "test-id",
      name: "Test Template",
      content: "Test content",
      variables: ["var1", "var2"],
    };

    render(<PromptEditor {...mockProps} initialTemplate={initialTemplate} />);

    expect(screen.getByLabelText("Template name")).toHaveValue("Test Template");
    expect(screen.getByLabelText("Prompt template content")).toHaveValue(
      "Test content"
    );
    expect(screen.getByLabelText("Value for var1")).toBeInTheDocument();
    expect(screen.getByLabelText("Value for var2")).toBeInTheDocument();
  });

  it("extracts variables from content", () => {
    render(<PromptEditor {...mockProps} />);

    const textarea = screen.getByLabelText("Prompt template content");
    fireEvent.change(textarea, {
      target: { value: "Hello {{name}}, welcome to {{place}}!" },
    });

    expect(screen.getByLabelText("Value for name")).toBeInTheDocument();
    expect(screen.getByLabelText("Value for place")).toBeInTheDocument();
  });

  it("handles variable value changes", () => {
    render(<PromptEditor {...mockProps} />);

    const textarea = screen.getByLabelText("Prompt template content");
    fireEvent.change(textarea, {
      target: { value: "Hello {{name}}!" },
    });

    const variableInput = screen.getByLabelText("Value for name");
    fireEvent.change(variableInput, { target: { value: "John" } });

    expect(variableInput).toHaveValue("John");
  });

  it("calls onSave with template data", () => {
    render(<PromptEditor {...mockProps} />);

    const nameInput = screen.getByLabelText("Template name");
    const contentTextarea = screen.getByLabelText("Prompt template content");

    fireEvent.change(nameInput, { target: { value: "Test Template" } });
    fireEvent.change(contentTextarea, { target: { value: "Hello {{name}}!" } });

    const saveButton = screen.getByText("Save Template");
    fireEvent.click(saveButton);

    expect(mockProps.onSave).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Test Template",
        content: "Hello {{name}}!",
        variables: ["name"],
      })
    );
  });

  it("calls onTest with API response", async () => {
    render(<PromptEditor {...mockProps} />);

    const contentTextarea = screen.getByLabelText("Prompt template content");
    fireEvent.change(contentTextarea, { target: { value: "Test prompt" } });

    const testButton = screen.getByText("Test Prompt");
    fireEvent.click(testButton);

    await waitFor(() => {
      expect(mockProps.onTest).toHaveBeenCalledWith("Test response");
    });
  });

  it("disables buttons when content is empty", () => {
    render(<PromptEditor {...mockProps} />);

    expect(screen.getByText("Test Prompt")).toBeDisabled();
    expect(screen.getByText("Save Template")).toBeDisabled();
  });

  it("supports dark theme", () => {
    render(<PromptEditor {...mockProps} theme="dark" />);

    const card = screen.getByRole("article");
    expect(card).toHaveAttribute("data-theme", "dark");
  });

  it("supports different variants", () => {
    const { rerender } = render(
      <PromptEditor {...mockProps} variant="primary" />
    );
    expect(screen.getByText("Save Template")).toHaveClass("bg-blue-600");

    rerender(<PromptEditor {...mockProps} variant="secondary" />);
    expect(screen.getByText("Save Template")).toHaveClass("bg-gray-600");

    rerender(<PromptEditor {...mockProps} variant="outline" />);
    expect(screen.getByText("Save Template")).toHaveClass("border");
  });

  it("supports different sizes", () => {
    const { rerender } = render(<PromptEditor {...mockProps} size="sm" />);
    expect(screen.getByText("Save Template")).toHaveClass("text-sm");

    rerender(<PromptEditor {...mockProps} size="md" />);
    expect(screen.getByText("Save Template")).toHaveClass("text-base");

    rerender(<PromptEditor {...mockProps} size="lg" />);
    expect(screen.getByText("Save Template")).toHaveClass("text-lg");
  });

  it("handles keyboard navigation", () => {
    render(<PromptEditor {...mockProps} />);

    const textarea = screen.getByLabelText("Prompt template content");
    fireEvent.change(textarea, { target: { value: "Test prompt" } });

    // Test Enter key triggers test
    fireEvent.keyPress(textarea, { key: "Enter", code: "Enter" });
    expect(mockProps.onTest).toHaveBeenCalledWith("Test response");

    // Test Shift+Enter doesn't trigger test
    fireEvent.keyPress(textarea, {
      key: "Enter",
      code: "Enter",
      shiftKey: true,
    });
    expect(mockProps.onTest).toHaveBeenCalledTimes(1);
  });
});
