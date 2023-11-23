// src/ai-chat/cohere/CohereChatClient.ts

import { AIChatClient } from "./AIChatClient";
import { CohereClient } from "cohere-ai";

export class CohereChatClient implements AIChatClient {
  private cohere: CohereClient;

  constructor(apiKey: string) {
    this.cohere = new CohereClient({ token: apiKey });
  }

  async chat(chatHistory: any[], message: string, documents: any[]): Promise<any> {
    try {
      const response = await this.cohere.chat({
        chatHistory: chatHistory,
        message: message,
        documents: documents,
        temperature: 0.9,
      });
      return response;
    } catch (error) {
      console.error("Error with Cohere chat:", error);
      throw error;
    }
  }
}
