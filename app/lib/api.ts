'use client';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://node-backend-deploy-xmwo.onrender.com';

interface ChatbotRequest {
  prompt: string;
}

interface ChatbotResponse {
  response: {
    role: string;
    content: string;
  };
}

interface HealthResponse {
  status: string;
}

export async function checkHealth(): Promise<HealthResponse> {
  const response = await fetch(`${API_BASE_URL}/health`);
  if (!response.ok) {
    throw new Error('Health check failed');
  }
  return response.json();
}

export async function sendMessage(prompt: string): Promise<string> {
  const requestBody: ChatbotRequest = { prompt };

  const response = await fetch(`${API_BASE_URL}/api/chatbot`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to get response from chatbot');
  }

  const data: ChatbotResponse = await response.json();
  return data.response.content;
}
