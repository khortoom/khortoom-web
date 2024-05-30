export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getCollectionDetails, heartbeat, listCollections } from "@/lib/chroma";

export async function GET() {
  try {
    const heartbeatRes = await heartbeat();
    const collections = await listCollections();
    const collectionDetails = [];
    if (collections) {
      for (const collection of collections) {
        const details = await getCollectionDetails({ name: collection.name });
        collectionDetails.push(details);
      }
    }

    const res = {
      heartbeat: heartbeatRes,
      collections: collections,
      collectionDetails: collectionDetails,
    };

    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
