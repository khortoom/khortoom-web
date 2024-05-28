import { NextApiRequest, NextApiResponse } from "next";
import { query as chromaQuery } from "@/lib/chroma";
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request, response: NextApiResponse) {
  const { method } = request;

  if (method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  const data = await request.json();

  const { query, vectorQuery } = data;

  if (!query && !vectorQuery) {
    return NextResponse.json({ error: "No query provided" }, { status: 400 });
  }

  if (vectorQuery) {
    const res = await chromaQuery({ queryEmbedding: vectorQuery });

    return NextResponse.json({ res });
  }

  if (typeof query !== "string") {
    return NextResponse.json(
      { error: "Query must be a string" },
      { status: 400 }
    );
  }

  // const queryEmbeddings = await axios.post("http://localhost:5000/embed", {
  //   query: query,
  // });

  // const res = await chromaQuery({ queryEmbeddings: queryEmbeddings });
  const res: any = [];

  return NextResponse.json({ res });
}
