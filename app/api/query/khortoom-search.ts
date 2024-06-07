import { IncludeEnum } from "chromadb";
import openaiClient from "./openai-client";
import { query as chromaQuery, getProductsById } from "@/lib/chroma";

const PRODUCT_TITLE_COEFFICIENT = 3;
const COMMENT_BODY_COEFFICIENT = 1;
const ABSENT_TITLE_DISTANCE = 2.0;
const ABSENT_COMMENT_BODY_DISTANCE = 2.0;

const khortoomSearch = async (query: string, descriptiveQuery: string) => {
  const queryEmbedding = (
    await openaiClient.embeddings.create({
      model: "text-embedding-3-small",
      input: query,
      encoding_format: "float",
    })
  ).data[0].embedding;

  const descriptiveQueryEmbedding = (
    await openaiClient.embeddings.create({
      model: "text-embedding-3-small",
      input: descriptiveQuery,
      encoding_format: "float",
    })
  ).data[0].embedding;

  const productResults = await chromaQuery({
    queryEmbedding: queryEmbedding,
    collectionName: "khortoom_products",
    include: [IncludeEnum.Distances, IncludeEnum.Documents],
    nResults: 20,
  });

  const productIdsOfProductQuery = productResults.ids[0];
  const productDistances = productResults.distances![0];

  const commentResults = await chromaQuery({
    queryEmbedding: descriptiveQueryEmbedding,
    collectionName: "khortoom_comments",
    where: { product_id: { $in: productIdsOfProductQuery } },
    include: [IncludeEnum.Distances, IncludeEnum.Documents],
  });

  const productIdsOfCommentQuery = commentResults.ids[0];
  const commentDistances = commentResults.distances![0];
  const comments = commentResults.documents![0];

  const uniqueIds = new Set([
    ...productIdsOfProductQuery,
    ...productIdsOfCommentQuery,
  ]);

  // Create a map to store distances for products and comments
  const productDistanceMap = new Map();
  const commentDistanceMap = new Map();

  // Populate product distance map
  productIdsOfProductQuery.forEach((id, index) => {
    productDistanceMap.set(id, productDistances[index]);
  });

  // Populate comment distance map
  productIdsOfCommentQuery.forEach((id, index) => {
    commentDistanceMap.set(id, commentDistances[index]);
  });

  const combinedResults = Array.from(uniqueIds).map((id) => {
    const productDistance = productDistanceMap.get(id) ?? ABSENT_TITLE_DISTANCE;
    const commentDistance =
      commentDistanceMap.get(id) ?? ABSENT_COMMENT_BODY_DISTANCE;

    return {
      id: id,
      distance:
        PRODUCT_TITLE_COEFFICIENT * productDistance +
        COMMENT_BODY_COEFFICIENT * commentDistance,
    };
  });

  const ids = combinedResults.map((result) => result.id);

  const result = await getProductsById({
    collectionName: "khortoom_products_by_id",
    ids: ids,
  });

  const products = result.metadatas.map((product) => {
    const id = String(product!["id"]);

    const commentIndex = productIdsOfCommentQuery.indexOf(id);
    const comment = commentIndex === -1 ? null : comments[commentIndex];
    const productDistance = productDistanceMap.get(id) ?? ABSENT_TITLE_DISTANCE;
    const commentDistance =
      commentDistanceMap.get(id) ?? ABSENT_COMMENT_BODY_DISTANCE;

    const { distance } = combinedResults.find((item) => item.id === id) ?? {
      distance: -1,
    };

    return {
      ...product,
      comment: comment,
      productDistance: productDistance,
      commentDistance: commentDistance,
      distance: distance,
    };
  });

  // sort by distance (lower is better)
  products.sort((a, b) => a.distance - b.distance);

  const res = {
    metadatas: [products],
    // un comment these fields if you want to see the productResults and commentResults separately
    // pRes: productResults,
    // cRes: commentResults,
  };

  return res;
};

export default khortoomSearch;
