import { NextApiRequest, NextApiResponse } from "next";
import { query as chromaQuery } from "@/lib/chroma";
import { NextResponse } from "next/server";
import axios from "axios";
import { models } from "@/app/constants";

const defaultModel = "text-embedding-3-small";

import OpenAI from "openai";

const baseUrl = process.env.OPENAI_BASE_URL;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: baseUrl,
});

export async function POST(request: Request) {
  const { method } = request;

  if (method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  const data = await request.json();

  const { query, vectorQuery, model } = data;

  if (model && typeof model !== "string") {
    return NextResponse.json(
      { error: "Model must be a string" },
      { status: 400 }
    );
  }

  const queryModel = model || defaultModel;

  if (models.includes(queryModel) === false) {
    return NextResponse.json(
      { error: "Invalid model provided" },
      { status: 400 }
    );
  }

  if (!query && !vectorQuery) {
    return NextResponse.json({ error: "No query provided" }, { status: 400 });
  }

  if (vectorQuery) {
    const res = await chromaQuery({
      queryEmbedding: vectorQuery,
      model: queryModel,
    });

    return NextResponse.json({ res });
  }

  if (query && model === "text-embedding-3-small") {
    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: query,
      encoding_format: "float",
    });

    const res = await chromaQuery({
      queryEmbedding: embedding.data[0].embedding,
      model: "text-embedding-3-small",
    });

    return NextResponse.json({ res });
  }

  return NextResponse.json({ error: "Invalid request" }, { status: 400 });
}
