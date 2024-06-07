import { NextResponse } from "next/server";

import { laBSEProductSearch, openaiProductSearch } from "./product-search";
import { openaiCommentSearch } from "./comment-search";
import heroSearch from "./hero-search";
import booksSearch from "./books-search";
import khortoomSearch from "./khortoom-search";

export async function POST(request: Request) {
  const { method } = request;

  if (method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  const data = await request.json();

  const { query, descriptiveQuery, vectorQuery, collection } = data;

  if (!collection) {
    return NextResponse.json(
      { error: "No collection provided" },
      { status: 400 }
    );
  }

  if (!query && !vectorQuery) {
    return NextResponse.json({ error: "No query provided" }, { status: 400 });
  }

  if (collection === "products" && vectorQuery) {
    const res = await laBSEProductSearch(vectorQuery);

    return NextResponse.json({ res });
  }

  if (collection === "products_openai" && query) {
    const res = await openaiProductSearch(query);

    return NextResponse.json({ res });
  }

  if (collection === "comments_openai" && query) {
    const res = await openaiCommentSearch(query);

    return NextResponse.json({ res });
  }

  if (collection === "hero" && query) {
    const res = await heroSearch(query);

    return NextResponse.json({ res });
  }

  if (collection === "products_books_openai" && query) {
    const res = await booksSearch(query);

    return NextResponse.json({ res });
  }

  if (collection === "khortoom_search" && query && descriptiveQuery) {
    const res = await khortoomSearch(query, descriptiveQuery);

    return NextResponse.json({ res });
  }

  return NextResponse.json({ error: "Invalid request" }, { status: 400 });
}
