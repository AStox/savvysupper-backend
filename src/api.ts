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
    const chatHistory = [
      {
        role: "system",
        content: `Use the provided documents containing grocery sale information to generate a recipe using as many of the items as reasonably possible.
          You should prioritize making a realistic recipe over using as many items as possible however. 
          Feel free to add in items that aren't on sale if you think it will make the recipe more realistic. 
          And tell me the pricing information for each ingredient where this information can be cited using the attached documents. 
          If you don't know an ingredients price then just say null. Here's an example recipe. 
          Always respond in valid JSON, following an identical structure to the following example. cost and savings fields should be numbers not strings. Always use double quotes instead of single quotes:
      
          {
            title: "Sweet Potato and Chicken Hash",
            ingredients: [
              "2 sweet potatoes",
              "4 chicken breasts",
              "1 red onion",
              "1 zucchini",
              "1 head of broccoli",
              "1/2 cup of cooked brown rice",
              "1/4 cup of olive oil",
              "1/2 teaspoon of salt",
              "1/4 teaspoon of black pepper"
            ],
            instructions: [
              "Preheat oven to 425°F.",
              "Chop all vegetables.",
              "In a large bowl, toss sweet potatoes, zucchini, onion, and broccoli with olive oil, salt, and pepper.",
              "Spread the vegetables on a baking sheet and roast in the oven for 25 minutes.",
              "Cook the brown rice as per the instructions on the package.",
              "Meanwhile, heat a large non-stick skillet over medium-high heat and cook the chicken breasts for 6-8 minutes on each side or until cooked through.",
              "Once the vegetables are roasted, add the rice and chicken to the bowl and toss to combine.",
              "Serve immediately and enjoy!"
            ],
            pricing: [
              { name: "Sweet Potato", cost: 1.12, savings: 3.27 },
              { name: "Chicken Breast", cost: 4.61, savings: 18.52 },
              { name: "Red Onion", cost: 1.32, savings: 4.61 },
              { name: "Zucchini", cost: 1.08, savings: 4.85 },
              { name: "Broccoli", cost: 0, savings: 0 },
              { name: "Brown Rice", cost: 0, savings: 0 },
              { name: "Olive Oil", cost: 0, savings: 0 },
              { name: "Salt", cost: 0, savings: 0 },
              { name: "Black Pepper", cost: 0, savings: 0 }
            ],
         }
      `,
      },
      {
        role: "system",
        content: `Here are the documents: ${documents}`,
      },
      {
        role: "user",
        content: "Generate the next recipe",
      },
    ];

    const response = await aiChatClient.chat(chatHistory, documents);

    // Send the response back to the client
    res.status(200).json(response);
  } catch (error) {
    console.error("Error in getMeal:", error);
    res.status(500).send("Internal Server Error");
  }
}
