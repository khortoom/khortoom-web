"use client";

import Image from "next/image";
import Product from "./components/product";
import Dialog from "./components/dialog";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getLoader() {
      const { quantum } = await import("ldrs");
      quantum.register();
    }
    getLoader();

    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  });
  return (
    <main className="flex min-h-screen flex-col items-center px-6 sm:px-12 pt-44 sm:pt-32 pb-12">
      <div className="w-full flex flex-row gap-2 prose">
        <label className="input input-bordered flex items-center gap-2 w-full">
          <input
            type="text"
            className="grow w-full"
            placeholder="موبایل دخترانه"
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
        <button className="btn btn-primary">جستجو</button>
      </div>
      <Dialog
        loading={isLoading}
        text="سلام من بلیک هستم دستیار هوشمند خرید شما در پلتفرم خرطوم! با توجه به
        جستجوی شما در مورد یک موبایل دخترانه پینشهاد من به شما..."
      />
      {isLoading && (
        <div className="flex flex-col items-center justify-center w-full h-52">
          <l-quantum size="45" speed="1.75" color="black"></l-quantum>
        </div>
      )}
      {!isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <Product key={item} />
          ))}
        </div>
      )}
    </main>
  );
}
