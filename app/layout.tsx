import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppFrame } from "@/components/app-frame";
import { BoardProvider } from "@/components/board-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "TaskBoard OS",
  description: "Multi-page Next.js workflow board with local browser persistence"
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
