import "server-only";

import { ChromaClient, Embedding, Embeddings, IncludeEnum } from "chromadb";

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

    console.log("Chroma client initialized");

    return client;
  } catch (error) {
    console.error(error);
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

const query = async ({
  queryEmbedding,
  model,
}: {
  queryEmbedding: Embedding;
  model: "text-embedding-3-small" | "setu4993/LaBSE";
}) => {
  const c = await init();

  let collection;

  if (model === "setu4993/LaBSE") {
    collection = await c?.getCollection({ name: "products" });
  } else if (model === "text-embedding-3-small") {
    collection = await c?.getCollection({ name: "products_openai" });
  }

  if (!collection) {
    throw new Error("Collection products not found");
  }

  const results = await collection.query({
    queryEmbeddings: [queryEmbedding],
    nResults: 5,
    include: [IncludeEnum.Metadatas],
  });

  return results;
};

export { heartbeat, listCollections, getCollectionDetails, query };
