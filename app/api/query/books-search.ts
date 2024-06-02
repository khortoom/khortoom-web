import { IncludeEnum } from "chromadb";
import openaiClient from "./openai-client";
import { query as chromaQuery } from "@/lib/chroma";
import reorder from "./reorder";

const booksSearch = async (query: string) => {
  const embedding = await openaiClient.embeddings.create({
    model: "text-embedding-3-small",
    input: query,
    encoding_format: "float",
  });

  const productResults = await chromaQuery({
    queryEmbedding: embedding.data[0].embedding,
    collectionName: "products_books_openai",
    include: [
      IncludeEnum.Metadatas,
      IncludeEnum.Documents,
      IncludeEnum.Distances,
    ],
    nResults: 20,
  });

  const productIds = productResults.ids[0];

  const commentResults = await chromaQuery({
    queryEmbedding: embedding.data[0].embedding,
    collectionName: "comments_books_openai",
    include: [IncludeEnum.Documents, IncludeEnum.Distances],
    where: { product_id: { $in: productIds } },
  });

  if (commentResults.ids === undefined) {
    return productResults;
  }

  const reordered_metadata = await reorder(productResults, commentResults);

  const res = {
    metadatas: [reordered_metadata],
  };

  return res;
};

export default booksSearch;
