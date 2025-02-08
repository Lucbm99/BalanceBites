import { ThemeProvider } from "@/components/shared/theme-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Cabin, Merriweather_Sans } from "next/font/google";
import "../styles/globals.css";

const fontSans = Merriweather_Sans({ subsets: ["latin"], variable: "--font-sans" });
const fontTitle = Cabin({ subsets: ["latin"], variable: "--font-title" });

export const metadata: Metadata = {
  title: "BalanceBites",
};

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
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
      </ThemeProvider>
      </body>
    </html>
  );
}
