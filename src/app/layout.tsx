import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Public_Sans } from "next/font/google";
import "./globals.css";
import "@/ui/shell.css";
import "@/ui/builder.css";
import "@/ui/sheets.css";
import "@/ui/states.css";

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ui",
});

export const metadata: Metadata = {
  title: "form-builder",
  description: "Build a form, preview it live, and review responses in a table.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={publicSans.variable}>{children}</body>
    </html>
  );
}
