import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-AU" className={`${openSans.variable} h-full`}>
      <body className="min-h-full bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
