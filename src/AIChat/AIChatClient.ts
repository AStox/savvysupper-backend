export interface AIChatClient {
  chat(chatHistory: any[], documents: any[]): Promise<any>;
}
