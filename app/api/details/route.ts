import { NextRequest, NextResponse } from "next/server";
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

    return NextResponse.json({
      heartbeat: heartbeatRes,
      collections: collections,
      collectionDetails: collectionDetails,
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
