import { AIChatClient } from "./AIChatClient";
import OpenAI from "openai";

export class OpenAIChatClient implements AIChatClient {
  private openAI: OpenAI;

  constructor(apiKey: string) {
    this.openAI = new OpenAI({ apiKey: apiKey });
  }

  async chat(chatHistory: any[], documents: any[]): Promise<any> {
    try {
      const response = await this.openAI.chat.completions.create({
        model: "gpt-4-1106-preview",
        messages: chatHistory,
        response_format: { type: "json_object" },
      });
      console.log("response:", response.choices[0].message.content);
      return response.choices[0].message.content;
    } catch (error) {
      console.error("Error with OpenAI chat:", error);
      throw error;
    }
  }
}
