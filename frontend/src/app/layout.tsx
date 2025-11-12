import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "./_components/header";
import { Providers } from "@/providers";

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
    <html lang="pt-BR">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 bg-gray-50">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
