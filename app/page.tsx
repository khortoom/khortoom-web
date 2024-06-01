"use client";

import { useEffect, useState } from "react";
import { collections } from "./constants";
import ProductResults from "./components/product-result";
import CommentResults from "./components/comments-result";
import InitialState from "./components/initial-state";
import ErrorState from "./components/error-state";
import { toast } from "sonner";

export default function Home() {
  const [query, setQuery] = useState("");
  const [vectorQuery, setVectorQuery] = useState("");
  const [selectedCollection, setSelectedCollection] = useState(collections[0]);

  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getLoader() {
      const { quantum } = await import("ldrs");
      quantum.register();
    }
    getLoader();
  });

  useEffect(() => {
    handleSearch();
  }, [selectedCollection]);

  const handleCollectionSelectChange = (e: any) => {
    setResults(null);
    setSelectedCollection(e.target.value);
  };

  const handleSearch = async () => {
    if (!vectorQuery && !query) return;

    setIsLoading(true);
    setIsError(false);
    setResults(null);

    try {
      const res = await fetch("/api/query", {
        method: "POST",
        body: vectorQuery
          ? JSON.stringify({
              vectorQuery: JSON.parse(vectorQuery),
              collection: selectedCollection,
            })
          : JSON.stringify({ query: query, collection: selectedCollection }),
      });

      if (res.status !== 200) {
        if (res.status === 429) {
          toast.error(
            "دوست عزیز خرطوم در مراحل ابتدایی است و نباید بیشتر از ۵ بار در دقیقه ازش استفاده کنی!",
            {
              duration: 5000,
            }
          );
        }
        setIsLoading(false);
        setIsError(true);
        return;
      }

      const data = await res.json();

      if (!data.res || data.res.error) {
        setIsLoading(false);
        setIsError(true);
        return;
      }

      setResults(data.res);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  const renderResult = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center w-full h-52">
          <l-quantum size="45" speed="1.75" color="black"></l-quantum>
        </div>
      );
    }

    if (results) {
      const { metadatas, documents } = results;
      const hasProducts = metadatas && metadatas.length > 0;
      const hasComments = documents && documents.length > 0;

      const products = hasProducts ? metadatas[0] : [];
      const comments = hasComments ? documents[0] : [];

      if (selectedCollection === "comments_openai") {
        return <CommentResults comments={comments} ids={results.ids[0]} />;
      }

      return <ProductResults products={products} />;
    }

    if (isError) {
      return <ErrorState />;
    }

    return <InitialState />;
  };

  return (
    <main className="flex min-h-screen flex-col items-center px-6 sm:px-12 pt-44 sm:pt-32 pb-12">
      <div className="join join-vertical w-full">
        <div className="collapse collapse-arrow join-item border border-base-300">
          <input
            type="radio"
            name="my-accordion-4"
            defaultChecked
            onClick={() => {
              setQuery("");
            }}
          />
          <div className="collapse-title text-xl font-medium">زیرو آیکیو </div>
          <div className="collapse-content">
            <div className="w-full flex flex-row gap-2 prose">
              <label className="input input-bordered flex items-center gap-2 w-full">
                <input
                  type="text"
                  className="grow w-full"
                  placeholder="موبایل دخترانه"
                  onChange={(e) => setQuery(e.target.value)}
                  value={query}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
              <button className="btn btn-primary" onClick={handleSearch}>
                جستجو
              </button>
            </div>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border border-base-300">
          <input
            type="radio"
            name="my-accordion-4"
            onClick={() => {
              setVectorQuery("");
            }}
          />
          <div className="collapse-title text-xl font-medium">آیکیو برداری</div>
          <div className="collapse-content">
            <p>بردار شما باید توسط مدل کنونی دیتابیس خرطوم ساخته شود.</p>

            <div className="w-full flex flex-row gap-2 items-center">
              <textarea
                className="textarea textarea-bordered grow w-full"
                placeholder="[-0.1, 1, 12, 0.2223, ...]"
                onChange={(e) => setVectorQuery(e.target.value)}
                value={vectorQuery}
                dir="ltr"
              />

              <button
                className="btn btn-primary rotate-90 mx-[-12px]"
                onClick={handleSearch}
              >
                جستجو
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-3">
        <h3 className="font-bold mb-2">انتخاب کالکشن</h3>
        <select
          className="select select-bordered w-full md:max-w-xs px-2"
          onChange={handleCollectionSelectChange}
        >
          {collections.map((collection) => (
            <option
              selected={selectedCollection === collection}
              key={collection}
            >
              {collection}
            </option>
          ))}
        </select>
      </div>

      {renderResult()}
    </main>
  );
}
