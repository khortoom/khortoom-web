import React from "react";
export const dynamic = "force-dynamic";

function DetailsError() {
  return (
    <main className=" flex min-h-screen w-full flex-col items-center bg-base-100 px-5 pt-44 sm:pt-32">
      <div className="w-full max-w-4xl flex flex-col items-center">
        <h2 className="text-4xl font-bold">جزئیات خرطوم</h2>
        <p className="max-w-3xl py-3">در لحظه مشکل جدی پیش اومده رفیق!</p>

        <div className="border w-full p-5 flex flex-row justify-between items-center rounded-lg">
          <p>وضعیت</p>

          <p className="text-red-700 flex flex-row justify-center items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="relative inline-flex rounded-full h-3 w-3  bg-red-400"></span>
            </span>
            <span>مرده</span>
          </p>
        </div>
      </div>
    </main>
  );
}

export default DetailsError;
