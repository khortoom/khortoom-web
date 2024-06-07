import { QueryResponse as ChromaQueryResponse, IDs } from "chromadb";
import Product from "@/app/types/product";

type Result = ChromaQueryResponse | OnlyMetadata;

interface OnlyMetadata {
  metadatas: Product[][];
  documents: never | null;
  ids: IDs[] | null;
}

interface QueryRequest {
  query?: string;
  descriptiveQuery?: string;
  vectorQuery?: number[];
  collection: string;
}

interface QueryResponse {
  result: Result;
}

export type { QueryRequest, QueryResponse, Result as QueryResult };
