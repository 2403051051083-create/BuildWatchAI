import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "BuildWatch AI – Real-Time Construction Site Monitoring",
  description: "AI-powered construction site monitoring platform with 3D digital twin, live cameras, worker safety, and real-time analytics.",
  keywords: ["construction monitoring", "AI", "digital twin", "BIM", "safety", "3D visualization"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
