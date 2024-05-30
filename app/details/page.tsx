export const dynamic = "force-dynamic";
export const revalidate = 0;

async function Details() {
  try {
    const response = await fetch(`${process.env.SERVER_API_PATH}/api/details`, {
      cache: "no-store",
    });
    const data = await response.json();

    return (
      <main className="flex min-h-screen w-full flex-col items-center bg-base-100 px-5 pt-44 sm:pt-32">
        <div className="flex flex-col items-center w-full max-w-4xl">
          <h2 className="text-4xl font-bold">جزئیات خرطوم</h2>
          <p className="max-w-3xl py-3">
            در این صفحه میتوانید جزئیات لحظه‌ای خرطوم را مشاهده کنید.
          </p>
          <div className="flex flex-col gap-2 w-full">
            <div className="border w-full p-2 md:p-5 flex flex-row justify-between items-center rounded-lg">
              <p>وضعیت</p>
              {data.heartbeat ? (
                <p className="text-green-700 flex flex-row justify-center items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3  bg-green-700"></span>
                  </span>
                  <span>زنده</span>
                </p>
              ) : (
                <p className="text-red-700">مرده</p>
              )}
            </div>
            <div className="border w-full p-2 md:p-5 flex flex-row justify-between items-center rounded-lg">
              <p>تعداد کالکشن‌ها</p>
              <p>{data.collectionDetails.length}</p>
            </div>

            {data.collectionDetails.map((collection: any, index: number) => (
              <div
                key={index}
                className="border w-full p-2 md:p-5 flex flex-col justify-between items-start rounded-lg"
              >
                <p className="font-bold pb-2">جزئیات کالکشن - {index}</p>
                <div className="flex flex-col gap-2 w-full">
                  <div className="border w-full p-2 md:p-5 flex flex-row justify-between items-center rounded-lg">
                    <p>نام</p>
                    <p>{collection.name}</p>
                  </div>
                  <div className="border w-full p-2 md:p-5 flex flex-row justify-between items-center rounded-lg">
                    <p>تعداد آیتم‌ها</p>
                    <p>{collection.count}</p>
                  </div>

                  <div
                    tabIndex={0}
                    className="collapse collapse-plus border rounded-lg"
                  >
                    <div className="collapse-title font-medium">
                      داکیومنت‌های نمونه
                    </div>
                    <div className="collapse-content">
                      <div className="flex flex-col gap-1 w-full">
                        {collection.peek.documents.map(
                          (item: any, index: number) => (
                            <div
                              key={index}
                              className="border w-full p-2 md:p-5 flex flex-row justify-between items-center rounded-lg"
                            >
                              <p>{item}</p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  } catch (error) {
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
}

export default Details;
