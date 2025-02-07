import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/sidebar-config/theme-provider";
import { CryptoProvider } from "@/contexts/CryptoContext";
import { NextAuthProvider } from "@/providers/auth-provider";
import { ToasterProvider } from "@/providers/toaster-provider";

// Font configurations
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

// Metadata
export const metadata: Metadata = {
  title: "CoinFOMO - Crypto Dashboard",
  description: "Track your crypto portfolio and market trends",
  keywords: ["crypto", "dashboard", "portfolio", "tracking"],
  authors: [{ name: "Hanu Singh" }],
};

// Viewport (Fix)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <NextAuthProvider>
          <CryptoProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <ToasterProvider />
              <main className="relative flex min-h-screen flex-col">
                {children}
              </main>
            </ThemeProvider>
          </CryptoProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
