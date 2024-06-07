import { NextResponse } from "next/server";
import { laBSEProductSearch, openaiProductSearch } from "./product-search";
import { openaiCommentSearch } from "./comment-search";
import heroSearch from "./hero-search";
import booksSearch from "./books-search";
import khortoomSearch from "./khortoom-search";
import { QueryRequest, QueryResponse } from "../types/query";

export async function POST(request: Request) {
  const { method } = request;

  if (method !== "POST") {
    return NextResponse.json(
      { error: "Method not allowed. Please use POST." },
      { status: 405 }
    );
  }

  let data: QueryRequest;
  try {
    data = await request.json();
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  const { query, descriptiveQuery, vectorQuery, collection } = data;

  if (!collection) {
    return NextResponse.json(
      { error: "Missing required field: 'collection'." },
      { status: 400 }
    );
  }

  if (!query && !vectorQuery) {
    return NextResponse.json(
      { error: "At least one of 'query' or 'vectorQuery' must be provided." },
      { status: 400 }
    );
  }

  try {
    let dbAnswer;

    switch (collection) {
      case "products":
        if (!vectorQuery) {
          return NextResponse.json(
            {
              error: "'vectorQuery' is required for the 'products' collection.",
            },
            { status: 400 }
          );
        }
        dbAnswer = await laBSEProductSearch(vectorQuery);
        break;

      case "products_openai":
        if (!query) {
          return NextResponse.json(
            {
              error:
                "'query' is required for the 'products_openai' collection.",
            },
            { status: 400 }
          );
        }
        dbAnswer = await openaiProductSearch(query);
        break;

      case "comments_openai":
        if (!query) {
          return NextResponse.json(
            {
              error:
                "'query' is required for the 'comments_openai' collection.",
            },
            { status: 400 }
          );
        }
        dbAnswer = await openaiCommentSearch(query);
        break;

      case "hero":
        if (!query) {
          return NextResponse.json(
            { error: "'query' is required for the 'hero' collection." },
            { status: 400 }
          );
        }
        dbAnswer = await heroSearch(query);
        break;

      case "products_books_openai":
        if (!query) {
          return NextResponse.json(
            {
              error:
                "'query' is required for the 'products_books_openai' collection.",
            },
            { status: 400 }
          );
        }
        dbAnswer = await booksSearch(query);
        break;

      case "khortoom_search":
        if (!query || !descriptiveQuery) {
          return NextResponse.json(
            {
              error:
                "'query' and 'descriptiveQuery' are required for the 'khortoom_search' collection.",
            },
            { status: 400 }
          );
        }
        dbAnswer = await khortoomSearch(query, descriptiveQuery);
        break;

      default:
        return NextResponse.json(
          { error: "Invalid 'collection' provided." },
          { status: 400 }
        );
    }

    const apiResult: QueryResponse = {
      result: { ...dbAnswer, ids: null, documents: null },
    };

    return NextResponse.json(apiResult);
  } catch (error) {
    return NextResponse.json(
      { error: "An internal server error occurred.", details: String(error) },
      { status: 500 }
    );
  }
}
