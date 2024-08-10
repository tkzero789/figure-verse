import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";
import { CartProvider } from "@/components/CartContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Figure Verse",
  description: "E-commerce website with a twist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          {" "}
          <Header />
          {children}
        </CartProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
