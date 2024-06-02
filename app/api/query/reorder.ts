import { QueryResponse } from "chromadb";

const PRODUCT_COEFFICIENT = 10;
const COMMENT_COEFFICIENT = 2;
const ABSENT_COMMENT_DISTANCE = 2;

const reorder = async (
  productResults: QueryResponse,
  commentResults: QueryResponse
) => {
  const commentIds = commentResults.ids[0];

  const metadatas = productResults.metadatas[0].map(
    (metadata: any, index: number) => {
      const productId = metadata["id"];
      const commentIndex = commentIds.indexOf(String(productId));
      const comment =
        commentIndex !== -1 ? commentResults.documents[0][commentIndex] : null;

      const commentDistance =
        (commentResults.distances![0][commentIndex] ??
          ABSENT_COMMENT_DISTANCE) * COMMENT_COEFFICIENT;

      const productDistance =
        productResults.distances![0][index] * PRODUCT_COEFFICIENT;

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

  return sorted_metadata;
};

export default reorder;
