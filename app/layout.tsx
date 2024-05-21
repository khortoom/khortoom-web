import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

const vazir = Vazirmatn({ subsets: ["arabic", "latin"] });

export const metadata: Metadata = {
  title: "خرطوم",
  description: "خالق تجربه جدید جستجو",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="cupcake" dir="rtl">
      <body className={vazir.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
