import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Raju Mistri Playlist",
  description: "Raju Mistri Playlist - Single screen interactive artwork and audio player.",
  icons: {
    icon: [
      { url: "https://raju-mistri-playlist.pages.dev/favicon.ico" },
      { url: "https://raju-mistri-playlist.pages.dev/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "https://raju-mistri-playlist.pages.dev/favicon-64x64.png", sizes: "64x64", type: "image/png" },
    ],
    apple: [{ url: "https://raju-mistri-playlist.pages.dev/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${jetbrains.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Yatra+One&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
