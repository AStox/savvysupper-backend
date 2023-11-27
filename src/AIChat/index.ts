import { CohereChatClient } from "./CohereChatClient";
import { OpenAIChatClient } from "./OpenAIChatClient";

// const apiKey = process.env.COHERE_API_KEY || "";
// export const aiChatClient = new CohereChatClient(apiKey);
const apiKey = process.env.OPENAI_API_KEY || "";
export const aiChatClient = new OpenAIChatClient(apiKey);
