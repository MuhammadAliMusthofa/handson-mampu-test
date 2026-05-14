import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "../providers/QueryProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MAMPU Users — Directory",
    template: "%s | MAMPU Users",
  },
  description:
    "Explore users, their posts, and todo activity in a clean, fast interface built with Next.js.",
  keywords: ["users", "directory", "JSONPlaceholder", "Next.js"],
  openGraph: {
    type: "website",
    locale: "id_ID",
    title: "MAMPU Users Directory",
    description: "Explore users and their activity signals.",
  },
  icons: {
    icon: "/assets/logo/speedometer.png",
    apple: "/assets/logo/speedometer.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}