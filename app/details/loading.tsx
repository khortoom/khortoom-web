export const dynamic = "force-dynamic";

async function Details() {
  return (
    <main className=" flex min-h-screen w-full flex-col items-center bg-base-100 px-5 pt-44 sm:pt-32">
      <div className="w-full max-w-4xl flex flex-col items-center">
        <h2 className="text-4xl font-bold">جزئیات خرطوم</h2>
        <p className="max-w-3xl py-3">لطفا منتظر بمانید...</p>

        <div className="border w-full p-5 flex flex-row justify-between items-center rounded-lg">
          <p>وضعیت</p>

          <p className="text-yellow-500 flex flex-row justify-center items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="relative inline-flex rounded-full h-3 w-3  bg-yellow-300"></span>
            </span>
            <span>در حال بارگذاری</span>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Details;
