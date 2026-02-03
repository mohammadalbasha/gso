import type { Metadata } from "next";
//import { IBM_Plex_Sans_Arabic } from "next/font/google";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <html>{children}</html>;
}
