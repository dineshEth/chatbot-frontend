import axios from 'axios';
import { ChatRequest, ChatResponse, HealthResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://node-backend-deploy-xmwo.onrender.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Health check endpoint
export const checkHealth = async (): Promise<HealthResponse> => {
  try {
    const response = await apiClient.get<HealthResponse>('/health');
    return response.data;
  } catch (error) {
    console.error('Health check failed:', error);
    throw new Error('Failed to check health status');
  }
};

// Chatbot endpoint
export const sendMessage = async (request: ChatRequest): Promise<ChatResponse> => {
  try {
    const response = await apiClient.post<ChatResponse>('/api/chatbot', request);
    return response.data;
  } catch (error) {
    console.error('Chatbot request failed:', error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error('Failed to get response from chatbot');
  }
};

export default apiClient;
