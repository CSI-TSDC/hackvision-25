import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Hackvision",
  description: "24 Hour Hackathon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
