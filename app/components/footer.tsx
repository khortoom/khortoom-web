import React from "react";
import logo from "@/public/logo.jpg";
import Image from "next/image";

function Footer() {
  return (
    <footer className="footer footer-center p-6 bg-primary text-primary-content gap-2">
      <div className="flex flex-col">
        <Image
          src={logo}
          alt="Khortoom"
          width={100}
          height={100}
          className="mask mask-hexagon-2"
        />
        <p className="font-bold">
          خرطوم <br />
          خالق تجربه جدید جستجو
        </p>
        <p>Copyright © 2024 - All right reserved</p>
      </div>
      <p className="flex flex-row">
        <svg
          className="w-8 h-8 px-1 text-white inline"
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
            d="m8 8-4 4 4 4m8 0 4-4-4-4m-2-3-4 14"
          />
        </svg>
        ساخته شده با مقدار زیادی قهوه
        <svg
          className="w-7 h-7 px-1 text-white inline"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
        </svg>
      </p>
      <a
        className="text-indigo-300 hover:scale-105 transition-all"
        href="https://t.me/belikeben"
      >
        ارتباط با خرطوم
      </a>
    </footer>
  );
}

export default Footer;
