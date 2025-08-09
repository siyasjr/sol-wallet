// app/layout.tsx
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "@/app/globals.css"; // Tailwind & shadcn styles
import { Toaster } from "@/components/ui/sonner";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Web3 Wallet Generator",
  description: "Generate and manage Ethereum/Solana wallets securely.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontSans.variable}>
      <body className="bg-background text-foreground font-sans antialiased">
        <main className="mx-auto max-w-screen-xl px-[150px] min-h-screen flex flex-col items-center justify-start py-12">
          {children}
           <Toaster position="top-center" />
        </main>
      </body>
    </html>
  );
}
