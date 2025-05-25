import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AICodeAssistant } from "../index";
import { useApi } from "../../../../hooks/useApi";
import { useTheme } from "../../../../hooks/useTheme";

// Mock the hooks
jest.mock("../../../../hooks/useApi");
jest.mock("../../../../hooks/useTheme");

describe("AICodeAssistant", () => {
  const mockOnCodeGenerated = jest.fn();

  beforeEach(() => {
    // Mock theme hook
    (useTheme as jest.Mock).mockReturnValue({
      theme: "light",
    });

    // Mock API hook
    (useApi as jest.Mock).mockReturnValue({
      callApi: jest.fn(),
      loading: false,
      error: null,
    });

    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    });
  });

  it("renders the code assistant interface", () => {
    render(<AICodeAssistant onCodeGenerated={mockOnCodeGenerated} />);

    expect(screen.getByText("AI Code Assistant")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Describe the code you want to generate...")
    ).toBeInTheDocument();
    expect(screen.getByText("Generate Code")).toBeInTheDocument();
  });

  it("handles code generation", async () => {
    const mockCode = 'const greeting = "Hello, World!";';
    const mockExplanation = "This code creates a greeting variable.";

    (useApi as jest.Mock).mockReturnValue({
      callApi: jest.fn().mockResolvedValue({
        code: mockCode,
        explanation: mockExplanation,
      }),
      loading: false,
      error: null,
    });

    render(<AICodeAssistant onCodeGenerated={mockOnCodeGenerated} />);

    // Type a prompt
    const input = screen.getByPlaceholderText(
      "Describe the code you want to generate..."
    );
    fireEvent.change(input, {
      target: { value: "Create a greeting variable" },
    });

    // Generate code
    const generateButton = screen.getByText("Generate Code");
    fireEvent.click(generateButton);

    // Verify API call
    await waitFor(() => {
      expect(useApi().callApi).toHaveBeenCalledWith(
        "/api/generate-code",
        expect.objectContaining({
          method: "POST",
          body: expect.stringContaining("Create a greeting variable"),
        })
      );
    });

    // Verify generated code and explanation
    expect(screen.getByText(mockCode)).toBeInTheDocument();
    expect(screen.getByText("Explanation")).toBeInTheDocument();
    expect(screen.getByText(mockExplanation)).toBeInTheDocument();

    // Verify callback
    expect(mockOnCodeGenerated).toHaveBeenCalledWith(mockCode);
  });

  it("handles code copying", async () => {
    const mockCode = 'const greeting = "Hello, World!";';
    (useApi as jest.Mock).mockReturnValue({
      callApi: jest.fn().mockResolvedValue({
        code: mockCode,
        explanation: "Test explanation",
      }),
      loading: false,
      error: null,
    });

    render(<AICodeAssistant onCodeGenerated={mockOnCodeGenerated} />);

    // Generate code first
    const input = screen.getByPlaceholderText(
      "Describe the code you want to generate..."
    );
    fireEvent.change(input, { target: { value: "Test prompt" } });
    fireEvent.click(screen.getByText("Generate Code"));

    await waitFor(() => {
      expect(screen.getByText(mockCode)).toBeInTheDocument();
    });

    // Copy code
    const copyButton = screen.getByRole("button", { name: /copy/i });
    fireEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockCode);
    expect(screen.getByText("Copied!")).toBeInTheDocument();
  });

  it("handles code execution", async () => {
    const mockCode = 'console.log("Hello, World!");';
    const mockOutput = "Hello, World!";

    (useApi as jest.Mock).mockReturnValue({
      callApi: jest
        .fn()
        .mockResolvedValueOnce({
          code: mockCode,
          explanation: "Test explanation",
        })
        .mockResolvedValueOnce({
          output: mockOutput,
        }),
      loading: false,
      error: null,
    });

    render(<AICodeAssistant onCodeGenerated={mockOnCodeGenerated} />);

    // Generate code first
    const input = screen.getByPlaceholderText(
      "Describe the code you want to generate..."
    );
    fireEvent.change(input, { target: { value: "Test prompt" } });
    fireEvent.click(screen.getByText("Generate Code"));

    await waitFor(() => {
      expect(screen.getByText(mockCode)).toBeInTheDocument();
    });

    // Run code
    const runButton = screen.getByRole("button", { name: /run/i });
    fireEvent.click(runButton);

    // Verify API call
    await waitFor(() => {
      expect(useApi().callApi).toHaveBeenCalledWith(
        "/api/run-code",
        expect.objectContaining({
          method: "POST",
          body: expect.stringContaining(mockCode),
        })
      );
    });

    // Verify output
    expect(screen.getByText(`Output:\n${mockOutput}`)).toBeInTheDocument();
  });

  it("handles settings panel", () => {
    render(<AICodeAssistant onCodeGenerated={mockOnCodeGenerated} />);

    // Open settings
    const settingsButton = screen.getByRole("button", { name: /settings/i });
    fireEvent.click(settingsButton);

    // Verify settings options
    expect(screen.getByLabelText("Language")).toBeInTheDocument();
    expect(screen.getByLabelText("Include Comments")).toBeInTheDocument();
    expect(screen.getByLabelText("Include Tests")).toBeInTheDocument();

    // Change settings
    const languageSelect = screen.getByLabelText("Language");
    fireEvent.change(languageSelect, { target: { value: "python" } });

    const commentsCheckbox = screen.getByLabelText("Include Comments");
    fireEvent.click(commentsCheckbox);

    const testsCheckbox = screen.getByLabelText("Include Tests");
    fireEvent.click(testsCheckbox);
  });

  it("displays error messages", async () => {
    const errorMessage = "Failed to generate code";
    (useApi as jest.Mock).mockReturnValue({
      callApi: jest.fn().mockRejectedValue(new Error(errorMessage)),
      loading: false,
      error: { message: errorMessage },
    });

    render(<AICodeAssistant onCodeGenerated={mockOnCodeGenerated} />);

    const input = screen.getByPlaceholderText(
      "Describe the code you want to generate..."
    );
    fireEvent.change(input, { target: { value: "Test prompt" } });
    fireEvent.click(screen.getByText("Generate Code"));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
