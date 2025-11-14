import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/providers";
import { Header, Sidebar } from "./_components/header";

import { cn } from "@/utils/cn";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Latinhas LLC - Sistema de Demandas",
  description: "Sistema de planejamento de demandas de produção",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className={cn(inter.className, "h-full")}>
        <Providers>
          <div className="h-full flex flex-col">
            <Header />
            <div className="flex flex-1 overflow-hidden">
              <Sidebar />
              <main className="flex-1 bg-gray-50 overflow-y-auto">
                <div className="container mx-auto p-4 h-full flex flex-col">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
