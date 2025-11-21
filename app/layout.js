import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/LayoutComponents/Footer/Footer";
import Header from "@/components/LayoutComponents/Header/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "OWLS Skills",
  description: "Outdoorsy Women Learning Survival Skills",
  icons: {
    icon: "/favicon.png",           
    shortcut: "/favicon.png",       
    apple: "/favicon.png",          
  },

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
=        <link
          href="https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap"
          rel="stylesheet"
        />

        <link rel="stylesheet" href={`${process.env.ADOBE_KEY}`}></link>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
