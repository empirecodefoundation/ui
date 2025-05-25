import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AIImageGenerator } from "../index";
import { useApi } from "../../../../hooks/useApi";
import { useTheme } from "../../../../hooks/useTheme";

// Mock the hooks
jest.mock("../../../../hooks/useApi");
jest.mock("../../../../hooks/useTheme");

describe("AIImageGenerator", () => {
  const mockOnImageGenerated = jest.fn();

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
  });

  it("renders the image generator interface", () => {
    render(<AIImageGenerator onImageGenerated={mockOnImageGenerated} />);

    expect(screen.getByText("AI Image Generator")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Describe the image you want to generate...")
    ).toBeInTheDocument();
    expect(screen.getByText("Generate Image")).toBeInTheDocument();
  });

  it("handles image generation", async () => {
    const mockImageUrl = "https://example.com/image.png";
    (useApi as jest.Mock).mockReturnValue({
      callApi: jest.fn().mockResolvedValue({ imageUrl: mockImageUrl }),
      loading: false,
      error: null,
    });

    render(<AIImageGenerator onImageGenerated={mockOnImageGenerated} />);

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

    // Verify callback
    expect(mockOnImageGenerated).toHaveBeenCalledWith(mockImageUrl);
  });

  it("displays loading state during generation", async () => {
    (useApi as jest.Mock).mockReturnValue({
      callApi: jest
        .fn()
        .mockImplementation(
          () => new Promise((resolve) => setTimeout(resolve, 100))
        ),
      loading: true,
      error: null,
    });

    render(<AIImageGenerator onImageGenerated={mockOnImageGenerated} />);

    const input = screen.getByPlaceholderText(
      "Describe the image you want to generate..."
    );
    fireEvent.change(input, { target: { value: "Test prompt" } });

    const generateButton = screen.getByText("Generate Image");
    fireEvent.click(generateButton);

    expect(
      screen.getByRole("button", { name: /generate image/i })
    ).toBeDisabled();
  });

  it("handles settings panel", () => {
    render(<AIImageGenerator onImageGenerated={mockOnImageGenerated} />);

    // Open settings
    const settingsButton = screen.getByRole("button", { name: /settings/i });
    fireEvent.click(settingsButton);

    // Verify settings options
    expect(screen.getByLabelText("Image Size")).toBeInTheDocument();
    expect(screen.getByLabelText("Style")).toBeInTheDocument();
    expect(screen.getByLabelText("Quality")).toBeInTheDocument();

    // Change settings
    const sizeSelect = screen.getByLabelText("Image Size");
    fireEvent.change(sizeSelect, { target: { value: "1024x1024" } });

    const styleSelect = screen.getByLabelText("Style");
    fireEvent.change(styleSelect, { target: { value: "artistic" } });

    const qualitySelect = screen.getByLabelText("Quality");
    fireEvent.change(qualitySelect, { target: { value: "high" } });
  });

  it("handles image download", async () => {
    const mockImageUrl = "https://example.com/image.png";
    (useApi as jest.Mock).mockReturnValue({
      callApi: jest.fn().mockResolvedValue({ imageUrl: mockImageUrl }),
      loading: false,
      error: null,
    });

    // Mock fetch and URL.createObjectURL
    global.fetch = jest.fn().mockResolvedValue({
      blob: () => Promise.resolve(new Blob()),
    });
    global.URL.createObjectURL = jest.fn();
    global.URL.revokeObjectURL = jest.fn();

    render(<AIImageGenerator onImageGenerated={mockOnImageGenerated} />);

    // Generate an image first
    const input = screen.getByPlaceholderText(
      "Describe the image you want to generate..."
    );
    fireEvent.change(input, { target: { value: "Test prompt" } });
    fireEvent.click(screen.getByText("Generate Image"));

    await waitFor(() => {
      expect(screen.getByText("Download Image")).toBeInTheDocument();
    });

    // Download the image
    fireEvent.click(screen.getByText("Download Image"));

    expect(global.fetch).toHaveBeenCalledWith(mockImageUrl);
    expect(global.URL.createObjectURL).toHaveBeenCalled();
  });

  it("displays error messages", async () => {
    const errorMessage = "Failed to generate image";
    (useApi as jest.Mock).mockReturnValue({
      callApi: jest.fn().mockRejectedValue(new Error(errorMessage)),
      loading: false,
      error: { message: errorMessage },
    });

    render(<AIImageGenerator onImageGenerated={mockOnImageGenerated} />);

    const input = screen.getByPlaceholderText(
      "Describe the image you want to generate..."
    );
    fireEvent.change(input, { target: { value: "Test prompt" } });
    fireEvent.click(screen.getByText("Generate Image"));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
