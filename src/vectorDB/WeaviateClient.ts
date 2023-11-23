// src/vector-db/weaviate/WeaviateClient.ts

import { VectorDBClient } from "./VectorDBClient";
import weaviate from "weaviate-ts-client";
import dotenv from "dotenv";

dotenv.config();

export class WeaviateClient implements VectorDBClient {
  async query(queryString: string, resultLimit = 20): Promise<any[]> {
    const weaviateApiKey = process.env.WEAVIATE_API_KEY || "";
    const cohereApiKey = process.env.COHERE_API_KEY || "";

    const client = weaviate.client({
      scheme: "https",
      host: "https://adcorp-vghi1hv6.weaviate.network",
      apiKey: new weaviate.ApiKey(weaviateApiKey),
      headers: { "X-Cohere-Api-Key": cohereApiKey },
    });

    try {
      const queryResult = await client.graphql
        .get()
        .withClassName("Sales")
        .withFields("title discountedPrice amountSaved")
        .withNearText({ concepts: [queryString] })
        .withLimit(resultLimit)
        .do();

      return queryResult.data.Get.Sales.map((item: any) => ({
        title: item.title || "",
        snippet: `${item.title} (price: $${
          item.discountedPrice
        }, Savings: $${item.amountSaved.toFixed(2)})`,
      }));
    } catch (error) {
      console.error("Error querying Weaviate:", error);
      throw error;
    }
  }
}
