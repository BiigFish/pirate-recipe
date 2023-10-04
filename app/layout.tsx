import LoginButton from "@/assets/login-button";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pirate Recipe",
  description: "My recipes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="max-w-3xl mx-2 md:mx-auto">
          <header>
            <Link href="/">
              <h1 className="sm:text-center text-4xl font-bold">
                Pirate Recipe
              </h1>
            </Link>
            <LoginButton />
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
