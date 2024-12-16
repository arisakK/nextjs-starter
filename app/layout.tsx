import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Providers from "./providers";
import { ClerkProvider } from "@clerk/nextjs";
import { Itim } from "next/font/google";

const itim = Itim({
  weight: "400",
  subsets: ["latin", "thai"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${itim.className} antialiased`}>
          <Providers>
            <Navbar />

            <main className="container">{children}</main>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
