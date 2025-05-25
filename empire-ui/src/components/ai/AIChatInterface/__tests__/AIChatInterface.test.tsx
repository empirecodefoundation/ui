import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AIChatInterface } from "../index";
import { useApi } from "../../../../hooks/useApi";
import { useTheme } from "../../../../hooks/useTheme";

// Mock the hooks
vi.mock("../../../../hooks/useApi");
vi.mock("../../../../hooks/useTheme");

describe("AIChatInterface", () => {
  const mockCallApi = vi.fn();
  const mockTheme = { theme: "light" };

  beforeEach(() => {
    vi.clearAllMocks();
    (useApi as any).mockReturnValue({
      callApi: mockCallApi,
      loading: false,
      error: null,
    });
    (useTheme as any).mockReturnValue(mockTheme);
  });

  it("renders with initial messages", () => {
    const initialMessages = [
      {
        id: "1",
        content: "Hello",
        role: "user" as const,
        timestamp: new Date(),
      },
    ];

    render(<AIChatInterface initialMessages={initialMessages} />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("sends a message when clicking send button", async () => {
    mockCallApi.mockResolvedValueOnce({ reply: "Hi there!" });

    render(<AIChatInterface />);
    const input = screen.getByPlaceholderText("Type your message...");
    const sendButton = screen.getByRole("button", { name: /send/i });

    fireEvent.change(input, { target: { value: "Hello" } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(mockCallApi).toHaveBeenCalledWith("/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: "Hello" }),
      });
    });
  });

  it("sends a message when pressing Enter", async () => {
    mockCallApi.mockResolvedValueOnce({ reply: "Hi there!" });

    render(<AIChatInterface />);
    const input = screen.getByPlaceholderText("Type your message...");

    fireEvent.change(input, { target: { value: "Hello" } });
    fireEvent.keyPress(input, { key: "Enter", code: 13, charCode: 13 });

    await waitFor(() => {
      expect(mockCallApi).toHaveBeenCalledWith("/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: "Hello" }),
      });
    });
  });

  it("handles speech-to-text recording", async () => {
    const mockMediaRecorder = {
      start: vi.fn(),
      stop: vi.fn(),
      ondataavailable: null as any,
      onstop: null as any,
    };

    const mockStream = {
      getTracks: () => [{ stop: vi.fn() }],
    };

    global.MediaRecorder = vi.fn().mockImplementation(() => mockMediaRecorder);
    global.navigator.mediaDevices = {
      getUserMedia: vi.fn().mockResolvedValue(mockStream),
    } as any;

    mockCallApi.mockResolvedValueOnce({ text: "Hello from speech" });
    mockCallApi.mockResolvedValueOnce({ reply: "Hi there!" });

    render(<AIChatInterface />);
    const micButton = screen.getByRole("button", { name: /microphone/i });

    // Start recording
    fireEvent.click(micButton);
    expect(mockMediaRecorder.start).toHaveBeenCalled();

    // Simulate recording data
    const audioBlob = new Blob(["test"], { type: "audio/wav" });
    mockMediaRecorder.ondataavailable({ data: audioBlob });

    // Stop recording
    fireEvent.click(micButton);
    expect(mockMediaRecorder.stop).toHaveBeenCalled();

    // Simulate recording stop
    mockMediaRecorder.onstop();

    await waitFor(() => {
      expect(mockCallApi).toHaveBeenCalledWith("/api/speech-to-text", {
        method: "POST",
        body: expect.any(FormData),
      });
    });
  });

  it("handles text-to-speech", async () => {
    const mockAudio = {
      play: vi.fn().mockResolvedValue(undefined),
      onended: null as any,
    };

    global.Audio = vi.fn().mockImplementation(() => mockAudio);

    mockCallApi.mockResolvedValueOnce({ audioUrl: "test-audio.mp3" });

    render(<AIChatInterface />);
    const ttsButton = screen.getByRole("button", { name: /speak/i });

    fireEvent.click(ttsButton);

    await waitFor(() => {
      expect(mockCallApi).toHaveBeenCalledWith("/api/text-to-speech", {
        method: "POST",
        body: JSON.stringify({ text: "" }),
      });
    });
  });

  it("displays error message when API call fails", async () => {
    const error = new Error("API Error");
    (useApi as any).mockReturnValue({
      callApi: vi.fn().mockRejectedValue(error),
      loading: false,
      error,
    });

    render(<AIChatInterface />);
    const input = screen.getByPlaceholderText("Type your message...");
    const sendButton = screen.getByRole("button", { name: /send/i });

    fireEvent.change(input, { target: { value: "Hello" } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText("API Error")).toBeInTheDocument();
    });
  });

  it("limits the number of messages", async () => {
    const initialMessages = Array.from({ length: 60 }, (_, i) => ({
      id: i.toString(),
      content: `Message ${i}`,
      role: "user" as const,
      timestamp: new Date(),
    }));

    render(
      <AIChatInterface initialMessages={initialMessages} maxMessages={50} />
    );

    // Should only show the last 50 messages
    expect(screen.queryByText("Message 0")).not.toBeInTheDocument();
    expect(screen.getByText("Message 59")).toBeInTheDocument();
  });
});
