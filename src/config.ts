import { VectorDB } from "./db/vectorDBInterface";
import { WeaviateDB } from "./db/weaviateDB";
import { LocalVectorDB } from "./db/localVectorDB";

export function getVectorDB(): VectorDB {
  // Logic to determine which DB to use, e.g., based on environment variables
  // Example: if (process.env.VECTOR_DB === 'PINECONE') return new PineconeDB();
  // Default to one, e.g., LocalVectorDB
  return new LocalVectorDB();
}
