import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "@/components/context/shared/providers";
import './globals.css';
import { Toaster } from "sonner";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Exam App - Smart Learning Platform",
  description: "Empower your learning journey with our smart exam platform. Access specialized tracks like Frontend, Backend, and Mobile Development with focused, topic-specific tests.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // throw new Error('Failed to fetch layout');
  return (
    <html lang="en">
      <body
        className={`${geistMono.variable} ${geistSans.variable}  antialiased`}
      >
        <Providers>
          {children}
         <Toaster />
        </Providers>
      </body>
    </html>
  );
}
