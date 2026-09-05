import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Courier_Prime, Public_Sans } from "next/font/google";
import "./globals.css";
import "@/ui/shell.css";
import "@/ui/builder.css";
import "@/ui/sheets.css";
import "@/ui/states.css";

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-ui",
});

const courier = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-type",
});

export const metadata: Metadata = {
  title: "form-builder",
  description: "Collate a 3-ply NCR form, fill the white original, file the canary copies.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${publicSans.variable} ${courier.variable}`}>{children}</body>
    </html>
  );
}
