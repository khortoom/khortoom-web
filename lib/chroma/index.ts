import "server-only";

import { ChromaClient, Embedding, IncludeEnum, Where } from "chromadb";

let client: ChromaClient | null = null;

const init = async () => {
  try {
    if (client) {
      return client;
    }

    client = new ChromaClient({
      path: "https://chroma.liara.run",

      auth: {
        provider: "token",
        credentials: process.env.CHROMA_SERVER_AUTH_CREDENTIALS,
      },
    });

    return client;
  } catch (error) {
    return null;
  }
};

const heartbeat = async () => {
  const c = await init();
  const heartbeat = await c?.heartbeat();

  return heartbeat;
};

const listCollections = async () => {
  const c = await init();
  const collections = await c?.listCollections();

  return collections;
};

const getCollectionDetails = async ({ name }: { name: string }) => {
  const c = await init();
  const collection = await c?.getCollection({ name });

  if (!collection) {
    return null;
  }

  const count = await collection.count();
  const peek = await collection.peek({
    limit: 5,
  });

  const details = {
    name,
    count,
    peek,
  };

  return details;
};

const getProductsById = async ({
  ids,
  collectionName,
}: {
  ids: string[];
  collectionName: string;
}) => {
  const c = await init();

  const collection = await c?.getCollection({ name: collectionName });

  if (!collection) {
    throw new Error("Collection products not found");
  }

  const results = await collection.get({
    ids: ids,
    include: [IncludeEnum.Metadatas, IncludeEnum.Documents],
  });

  return results;
};

const query = async ({
  queryEmbedding,
  collectionName,
  include,
  where,
  nResults,
}: {
  queryEmbedding: Embedding;
  collectionName: string;
  include?: IncludeEnum[] | undefined;
  where?: Where | undefined;
  nResults?: number | undefined;
}) => {
  const c = await init();

  const collection = await c?.getCollection({ name: collectionName });

  if (!collection) {
    throw new Error("Collection products not found");
  }

  const results = await collection.query({
    queryEmbeddings: [queryEmbedding],
    nResults: nResults ?? 5,
    include: include ?? [IncludeEnum.Metadatas],
    where: where,
  });

  return results;
};

export {
  heartbeat,
  listCollections,
  getCollectionDetails,
  query,
  getProductsById,
};
