import { Request, Response } from "express";
import { aiChatClient } from "./AIChat";
import { vectorDBClient } from "./vectorDB";

export async function getMeal(req: Request, res: Response): Promise<void> {
  try {
    // Query Weaviate (or any other vector DB currently configured)
    const proteinDocuments = await vectorDBClient.query("protein", 3);
    const vegetableDocuments = await vectorDBClient.query("vegetable", 6);
    const carbDocuments = await vectorDBClient.query("carbohydrate", 2);
    const documents = proteinDocuments.concat(vegetableDocuments, carbDocuments);

    // Assume 'chatHistory' and 'message' are provided in the request
    // You might need to adjust this based on how the data is sent in the request
    const { chatHistory, message } = req.body;

    const response = await aiChatClient.chat(chatHistory, message, documents);

    // Send the response back to the client
    res.status(200).json(response);
  } catch (error) {
    console.error("Error in getMeal:", error);
    res.status(500).send("Internal Server Error");
  }
}
