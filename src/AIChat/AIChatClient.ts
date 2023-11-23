export interface AIChatClient {
  chat(chatHistory: any[], message: string, documents: any[]): Promise<any>;
}
