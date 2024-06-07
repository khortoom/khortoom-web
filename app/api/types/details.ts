import {
  QueryResponse as ChromaQueryResponse,
  CollectionType,
  GetResponse,
} from "chromadb";

interface Details {
  name: string;
  count: number;
  peek: GetResponse;
}

interface DetailsRequest {}

interface DetailsResponse {
  heartbeat: number | null;
  collections: CollectionType[] | null;
  collectionDetails: (Details | null)[] | null;
}

export type { DetailsRequest, DetailsResponse };
