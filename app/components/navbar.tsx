import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/public/logo.jpg";

function Navbar() {
  return (
    <div className="fixed z-50 w-full flex flex-row items-center justify-center">
      <div className="backdrop glass navbar w-[calc(100%-48px)] md:w-[calc(100%-96px)] shadow-md rounded-md mx-auto my-2 flex flex-col sm:flex-row items-center justify-center">
        <div className="flex-1 w-full">
          <Link
            href="/"
            className="btn btn-ghost text-xl flex flex-row items-center bg-white/80 w-full sm:w-auto"
          >
            <Image
              src={logo}
              alt="Khortoom"
              width={40}
              height={40}
              className=" bg-primary mask mask-hexagon-2"
            />
            <h1>خرطوم</h1>
          </Link>
        </div>

        <ul className="menu menu-horizontal px-1 gap-1">
          <li>
            <Link href="/team" className="btn btn-ghost bg-white/60">
              تیم ما
            </Link>
          </li>
          <li>
            <Link href="/details" className="btn btn-ghost bg-white/60">
              جزئیات
            </Link>
          </li>
          <li>
            <button className="btn btn-disabled">
              ورود
              <div className="badge">به زودی</div>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
