import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import NavbarUi from "@/components/NavbarUi";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Numerify - Calculator App",
  description: "All in One Calculator App - Age Calculator, Math Calculator, Scientific Calculator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavbarUi />
        {children}
      </body>
    </html>
  );
}