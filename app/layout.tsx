import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Greyhound Rescue & Adoption Portal",
    template: "%s | Greyhound Rescue & Adoption Portal",
  },
  description:
    "Connecting retired racing greyhounds with loving foster and adoptive homes across Australia.",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en-AU" className={`${openSans.variable} h-full`}>
      <body className="min-h-full bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
