import { IncludeEnum } from "chromadb";
import openaiClient from "./openai-client";
import { openaiProductSearch } from "./product-search";
import { query as chromaQuery } from "@/lib/chroma";

const heroSearch = async (query: string) => {
  const embedding = await openaiClient.embeddings.create({
    model: "text-embedding-3-small",
    input: query,
    encoding_format: "float",
  });

  const productResults = await chromaQuery({
    queryEmbedding: embedding.data[0].embedding,
    collectionName: "products_openai",
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
    collectionName: "comments_openai",
    include: [IncludeEnum.Documents, IncludeEnum.Distances],
    where: { product_id: { $in: productIds } },
  });

  console.log("product distance", productResults.distances);
  console.log("comments distance", commentResults.distances);

  const commentIds = commentResults.ids[0];

  const metadatas = productResults.metadatas[0].map(
    (metadata: any, index: number) => {
      const productId = metadata["id"];
      const commentIndex = commentIds.indexOf(String(productId));
      const comment =
        commentIndex !== -1 ? commentResults.documents[0][commentIndex] : null;

      const commentDistance =
        (commentResults.distances![0][commentIndex] ?? 2) * 2;
      const productDistance = productResults.distances![0][index];
      const distance = productDistance + commentDistance;

      return {
        ...metadata,
        comment: comment,
        productDistance: productDistance,
        commentDistance: commentDistance,
        distance: distance,
      };
    }
  );

  // sort by distance lower is better
  const sorted_metadata = metadatas.sort(
    (a: any, b: any) => a.distance - b.distance
  );

  const res = {
    metadatas: [sorted_metadata],
  };

  return res;
};

export default heroSearch;
