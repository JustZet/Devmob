import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL("https://devmob.app"),
  title: "Devmob — Native & Cross-Platform Mobile App Development",
  description:
    "Devmob builds high-quality mobile apps. Pure Android with Java & Kotlin, and cross-platform apps with Flutter. Get in touch at contact@devmob.app.",
  icons: {
    icon: [
      { url: "/logo/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo/favicon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/logo/devmob-logo-rounded.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/logo/favicon-192.png",
  },
  openGraph: {
    type: "website",
    title: "Devmob — Native & Cross-Platform Mobile App Development",
    description:
      "We build production-grade mobile apps. Native Android (Java/Kotlin) and cross-platform Flutter for iOS + Android.",
    url: "https://devmob.app",
    siteName: "Devmob",
    images: [
      {
        url: "/logo/devmob-logo-bg.png",
        width: 1200,
        height: 1200,
        alt: "Devmob — Mobile app development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Devmob — Native & Cross-Platform Mobile App Development",
    description:
      "Native Android (Java/Kotlin) and Flutter cross-platform apps.",
    images: ["/logo/devmob-logo-bg.png"],
  },
  verification: {
    google: "afcf8a5bda80306e",
  },
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
