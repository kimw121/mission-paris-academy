

import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({

  variable: "--font-geist-sans",

  subsets: ["latin"],

});

const geistMono = Geist_Mono({

  variable: "--font-geist-mono",

  subsets: ["latin"],

});

export const metadata: Metadata = {

  title: "Mission Paris | Mme Zoya Graham",

  description:

    "An interactive French language learning experience presented by Mme Zoya Graham, featuring educational games, 3D learning environments, and research on ICT integration in French pedagogy.",

};

export default function RootLayout({

  children,

}: Readonly<{

  children: React.ReactNode;

}>) {

  return (

    <html lang="en">

      <body

        className={`${geistSans.variable} ${geistMono.variable} antialiased`}

      >

        {children}

        {/* Mme Zoya Graham — visible on every page */}

        <div className="fixed bottom-5 right-5 z-[100] rounded-full border border-white/30 bg-[#24383e]/95 px-5 py-3 shadow-xl backdrop-blur-md">

          <p className="text-sm font-semibold tracking-wide text-white">

            Mme Zoya Graham

          </p>

        </div>

      </body>

    </html>

  );

}