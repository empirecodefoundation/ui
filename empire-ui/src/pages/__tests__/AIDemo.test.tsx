import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AIDemo } from "../AIDemo";
import { useTheme } from "../../hooks/useTheme";
import { useApi } from "../../hooks/useApi";

// Mock the hooks
jest.mock("../../hooks/useTheme");
jest.mock("../../hooks/useApi");

describe("AIDemo", () => {
  beforeEach(() => {
    // Mock theme hook
    (useTheme as jest.Mock).mockReturnValue({
      theme: "light",
      toggleTheme: jest.fn(),
    });

    // Mock API hook
    (useApi as jest.Mock).mockReturnValue({
      callApi: jest.fn(),
      loading: false,
      error: null,
    });
  });

  it("renders all AI tools tabs", () => {
    render(<AIDemo />);

    expect(screen.getByText("Chat")).toBeInTheDocument();
    expect(screen.getByText("Image Generator")).toBeInTheDocument();
    expect(screen.getByText("Code Assistant")).toBeInTheDocument();
  });

  it("switches between AI tools when clicking tabs", () => {
    render(<AIDemo />);

    // Initially shows chat interface
    expect(
      screen.getByPlaceholderText("Ask me anything...")
    ).toBeInTheDocument();

    // Switch to image generator
    fireEvent.click(screen.getByText("Image Generator"));
    expect(
      screen.getByPlaceholderText("Describe the image you want to generate...")
    ).toBeInTheDocument();

    // Switch to code assistant
    fireEvent.click(screen.getByText("Code Assistant"));
    expect(
      screen.getByPlaceholderText("Describe the code you want to generate...")
    ).toBeInTheDocument();
  });

  it("toggles settings panel", () => {
    render(<AIDemo />);

    const settingsButton = screen.getByRole("button", { name: /settings/i });
    fireEvent.click(settingsButton);

    expect(screen.getByText("Theme")).toBeInTheDocument();
    expect(screen.getByText("Light Mode")).toBeInTheDocument();
  });

  it("saves and loads chat history", async () => {
    render(<AIDemo />);

    // Type a message
    const input = screen.getByPlaceholderText("Ask me anything...");
    fireEvent.change(input, { target: { value: "Hello AI" } });
    fireEvent.keyPress(input, { key: "Enter", code: 13, charCode: 13 });

    // Save chat
    const settingsButton = screen.getByRole("button", { name: /settings/i });
    fireEvent.click(settingsButton);
    const saveButton = screen.getByText("Save Chat");
    fireEvent.click(saveButton);

    // Verify chat is saved
    await waitFor(() => {
      expect(screen.getByText("Chat 1 (1 messages)")).toBeInTheDocument();
    });

    // Load chat
    fireEvent.click(screen.getByText("Chat 1 (1 messages)"));
    expect(input).toHaveValue("Hello AI");
  });

  it("handles image generation", async () => {
    render(<AIDemo />);

    // Switch to image generator
    fireEvent.click(screen.getByText("Image Generator"));

    // Type a prompt
    const input = screen.getByPlaceholderText(
      "Describe the image you want to generate..."
    );
    fireEvent.change(input, { target: { value: "A beautiful sunset" } });

    // Generate image
    const generateButton = screen.getByText("Generate Image");
    fireEvent.click(generateButton);

    // Verify API call
    await waitFor(() => {
      expect(useApi().callApi).toHaveBeenCalledWith(
        "/api/generate-image",
        expect.objectContaining({
          method: "POST",
          body: expect.stringContaining("A beautiful sunset"),
        })
      );
    });
  });

  it("handles code generation", async () => {
    render(<AIDemo />);

    // Switch to code assistant
    fireEvent.click(screen.getByText("Code Assistant"));

    // Type a prompt
    const input = screen.getByPlaceholderText(
      "Describe the code you want to generate..."
    );
    fireEvent.change(input, {
      target: { value: "Create a React button component" },
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
          body: expect.stringContaining("Create a React button component"),
        })
      );
    });
  });

  it("handles theme switching", () => {
    render(<AIDemo />);

    const themeButton = screen.getByRole("button", { name: /theme/i });
    fireEvent.click(themeButton);

    expect(useTheme().toggleTheme).toHaveBeenCalled();
  });

  it("displays error messages when API calls fail", async () => {
    // Mock API error
    (useApi as jest.Mock).mockReturnValue({
      callApi: jest.fn().mockRejectedValue(new Error("API Error")),
      loading: false,
      error: { message: "API Error" },
    });

    render(<AIDemo />);

    // Switch to image generator
    fireEvent.click(screen.getByText("Image Generator"));

    // Try to generate image
    const input = screen.getByPlaceholderText(
      "Describe the image you want to generate..."
    );
    fireEvent.change(input, { target: { value: "Test prompt" } });
    fireEvent.click(screen.getByText("Generate Image"));

    // Verify error message
    await waitFor(() => {
      expect(screen.getByText("API Error")).toBeInTheDocument();
    });
  });
});
