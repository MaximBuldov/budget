import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import ClientProviders from "../providers/ClientProviders";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Budget",
  viewport:
    "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geistSans.variable}>
        <AntdRegistry>
          <ClientProviders>{children}</ClientProviders>
        </AntdRegistry>
      </body>
    </html>
  );
}
