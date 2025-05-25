export interface SpeechToTextResponse {
  text: string;
}

export interface TextToSpeechResponse {
  audioUrl: string;
}

export interface ChatResponse {
  reply: string;
}

export interface ApiError {
  message: string;
}

export interface ApiResponse<T = any> {
  data?: T;
  error?: ApiError;
}
