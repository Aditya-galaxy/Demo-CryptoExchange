import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CryptoContext, { CryptoProvider } from "@/Helper/CryptoContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CryptoExchange",
  description: "A simple crypto exchange app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CryptoProvider>{children}</CryptoProvider>
      </body>
    </html>
  );
}
