export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getCollectionDetails, heartbeat, listCollections } from "@/lib/chroma";
import { DetailsResponse } from "../types/details";

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

    const res: DetailsResponse = {
      heartbeat: heartbeatRes ?? null,
      collections: collections ?? null,
      collectionDetails: collectionDetails ?? null,
    };

    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
