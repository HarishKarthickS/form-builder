import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Barlow_Condensed, IBM_Plex_Mono, Spectral } from "next/font/google";
import "./globals.css";
import "@/ui/shell.css";
import "@/ui/builder.css";

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const stamp = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-stamp",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "form-builder",
  description: "Clip fields onto a form, fill it in, export the carbon copies.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${spectral.variable} ${stamp.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
