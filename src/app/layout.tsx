import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Devmob — Native & Cross-Platform Mobile App Development",
  description:
    "Devmob builds high-quality mobile apps. Pure Android with Java & Kotlin, and cross-platform apps with Flutter. Get in touch at devmobplatform@gmail.com.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
