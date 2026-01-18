import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import LenisProvider from "@/components/utils/LenisProvider";

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
        <LenisProvider>
          <Navbar className={""} />
          {children}
          <Footer></Footer>
        </LenisProvider>
      </body>
    </html>
  );
}
