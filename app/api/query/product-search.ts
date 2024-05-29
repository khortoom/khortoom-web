import { query as chromaQuery } from "@/lib/chroma";
import openaiClient from "./openai-client";

const laBSEProductSearch = async (queryVector: number[]) => {
  const res = await chromaQuery({
    queryEmbedding: queryVector,
    collectionName: "products",
  });

  return res;
};

const openaiProductSearch = async (query: string) => {
  const embedding = await openaiClient.embeddings.create({
    model: "text-embedding-3-small",
    input: query,
    encoding_format: "float",
  });

  const res = await chromaQuery({
    queryEmbedding: embedding.data[0].embedding,
    collectionName: "products_openai",
  });

  return res;
};

export { laBSEProductSearch, openaiProductSearch };
