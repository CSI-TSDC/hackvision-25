import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import LenisProvider from "@/components/utils/LenisProvider";

const quinque = localFont({
  src: "../../public/assets/Fonts/Quinque/Quinquefive-8OV1g.ttf",
  variable: "--font-quinque",
  display: "swap",
});

const pixelEmulator = localFont({
  src: "../../public/assets/Fonts/Pixel Emulator/PixelEmulator-xq08.ttf",
  variable: "--font-pixel-emulator",
  display: "swap",
});

const nikea = localFont({
  src: "../../public/assets/Fonts/Nikea/NIKEA.otf",
  variable: "--font-nikea",
  display: "swap",
});

const pixalic = localFont({
  src: "../../public/assets/Fonts/italic.ttf",
  variable: "--font-pixalic",
  display: "swap",
});

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
    <html lang="en" className={`${quinque.variable} ${pixelEmulator.variable} ${nikea.variable} ${pixalic.variable}`}>
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
