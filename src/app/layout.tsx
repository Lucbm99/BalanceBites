import type { Metadata } from "next";
import { Cabin, Merriweather_Sans } from "next/font/google";
import "../styles/globals.css";

import { setDefaultOptions } from "date-fns";
import { ptBR } from "date-fns/locale";

import { ClientProviders } from "@/components/shared/client-providers";
import { cn } from "@/lib/utils";

const fontSans = Merriweather_Sans({ subsets: ["latin"], variable: "--font-sans" });
const fontTitle = Cabin({ subsets: ["latin"], variable: "--font-title" });

export const metadata: Metadata = {
  title: "BalanceBites",
  icons: {
    icon: "/favicon.svg",
  }
};

setDefaultOptions({ locale: ptBR });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased", 
          fontTitle.variable, 
          fontSans.variable
        )}
      >
        <ClientProviders>
            {children}
        </ClientProviders>
      </body>
    </html>
  );
}
