import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TODO List",
  description: "Organise your life",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head><link rel="icon" href="./favicon.png" type="image/x-icon" sizes="16x16"/></head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
