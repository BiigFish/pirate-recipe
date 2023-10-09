import LoginButton from "@/assets/login-button";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

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
  config.autoAddCss = false;
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="max-w-3xl mx-2 md:mx-auto">
          <header className="relative">
            <Link href="/">
              <h1 className="text-4xl font-bold w-fit sm:mx-auto">
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
