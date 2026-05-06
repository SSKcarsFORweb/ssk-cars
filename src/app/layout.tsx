import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SSK CARS",
  description: "SSK Cars – Buy, sell, and explore top quality cars. Visit us for the best car deals. Just Don't Dream It Own It",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}