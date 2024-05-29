import { IncludeEnum } from "chromadb";
import openaiClient from "./openai-client";
import { query as chromaQuery } from "@/lib/chroma";

const openaiCommentSearch = async (query: string) => {
  const embedding = await openaiClient.embeddings.create({
    model: "text-embedding-3-small",
    input: query,
    encoding_format: "float",
  });

  const res = await chromaQuery({
    queryEmbedding: embedding.data[0].embedding,
    collectionName: "comments_openai",
    include: [IncludeEnum.Documents],
  });

  return res;
};

export { openaiCommentSearch };
