export interface VectorDBClient {
  query(queryString: string, resultLimit?: number): Promise<any[]>;
}
