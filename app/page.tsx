"use client";

import Product from "./components/product";
import Dialog from "./components/dialog";
import { useEffect, useState } from "react";
import { models } from "./constants";

export default function Home() {
  const [query, setQuery] = useState("");
  const [vectorQuery, setVectorQuery] = useState("");
  const [selectedModel, setSelectedModel] = useState(models[0]);

  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);

  useEffect(() => {
    if (!query) {
      setIsFirstTime(true);
    }
  }, [query]);

  useEffect(() => {
    async function getLoader() {
      const { quantum } = await import("ldrs");
      quantum.register();
    }
    getLoader();
  });

  const handleSearch = async () => {
    if (!vectorQuery && !query) return;

    setIsLoading(true);
    setIsError(false);
    setIsFirstTime(false);
    setResults(null);

    try {
      const res = await fetch("/api/query", {
        method: "POST",
        body: vectorQuery
          ? JSON.stringify({
              vectorQuery: JSON.parse(vectorQuery),
              model: selectedModel,
            })
          : JSON.stringify({ query: query, model: selectedModel }),
      });

      const data = await res.json();

      if (data.res.error || !data.res) {
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
        <h3 className="font-bold mb-2">انتخاب مدل</h3>
        <select
          className="select select-bordered w-full md:max-w-xs px-2"
          onChange={(e) => setSelectedModel(e.target.value)}
        >
          {models.map((model) => (
            <option selected={selectedModel === model} key={model}>
              {model}
            </option>
          ))}
        </select>
      </div>

      {/* <Dialog
        loading={isLoading}
        text="سلام من بلیک هستم دستیار هوشمند خرید شما در پلتفرم خرطوم! با توجه به
        جستجوی شما در مورد یک موبایل دخترانه پینشهاد من به شما..."
      /> */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center w-full h-52">
          <l-quantum size="45" speed="1.75" color="black"></l-quantum>
        </div>
      )}
      {results && !isLoading && (
        <>
          {results.metadatas.length === 0 ||
            (results.metadatas[0].length === 0 && (
              <div className="flex flex-col items-center justify-center w-full h-52">
                <p>گشتم نبود نگرد نیست</p>
              </div>
            ))}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-4">
            {results.metadatas[0].map((item: any, index: number) => (
              <Product key={index} product={item} />
            ))}
          </div>
        </>
      )}
      {!isFirstTime && isError && (
        <div className="flex flex-col items-center justify-center w-full h-52 gap-2">
          <p>مشکلی در جستجوی شما به وجود اومده!</p>
          <svg
            className="w-12 h-12 text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 5 9 4V3m5 2 1-1V3m-3 6v11m0-11a5 5 0 0 1 5 5m-5-5a5 5 0 0 0-5 5m5-5a4.959 4.959 0 0 1 2.973 1H15V8a3 3 0 0 0-6 0v2h.027A4.959 4.959 0 0 1 12 9Zm-5 5H5m2 0v2a5 5 0 0 0 10 0v-2m2.025 0H17m-9.975 4H6a1 1 0 0 0-1 1v2m12-3h1.025a1 1 0 0 1 1 1v2M16 11h1a1 1 0 0 0 1-1V8m-9.975 3H7a1 1 0 0 1-1-1V8"
            />
          </svg>
        </div>
      )}
      {!results && !isLoading && !isError && isFirstTime && (
        <div className="flex flex-col items-center justify-center w-full gap-2 h-52">
          <p>تو یکی نه‌ای هزاری تو جستجوی خود برافروز!</p>
          <svg
            className="w-12 h-12 text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
      )}
    </main>
  );
}
