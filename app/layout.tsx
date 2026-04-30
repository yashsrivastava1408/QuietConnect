import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppFrame } from "@/components/app-frame";
import { BoardProvider } from "@/components/board-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Campus Connect",
  description: "A low-pressure campus networking platform for students"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <BoardProvider>
          <AppFrame>{children}</AppFrame>
        </BoardProvider>
      </body>
    </html>
  );
}
