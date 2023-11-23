import { CohereChatClient } from "./CohereChatClient";

const apiKey = process.env.COHERE_API_KEY || "";
export const aiChatClient = new CohereChatClient(apiKey);
