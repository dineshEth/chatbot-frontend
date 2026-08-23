export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatRequest {
  prompt: string;
}

export interface ChatResponse {
  response: {
    role: string;
    content: string;
  };
}

export interface HealthResponse {
  status: string;
}

export type Theme = 'light' | 'dark';
