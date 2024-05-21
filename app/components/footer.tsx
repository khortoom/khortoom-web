import React from "react";
import logo from "@/public/logo.jpg";
import Image from "next/image";

function Footer() {
  return (
    <footer className="footer footer-center p-10 bg-primary text-primary-content">
      <aside>
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
      </aside>
      <nav>
        <p>ساخته شده با مقدار زیادی قهوه</p>
      </nav>
    </footer>
  );
}

export default Footer;
