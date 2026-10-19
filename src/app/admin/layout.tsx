import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "@/app/[locale]/globals.css";

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm_plex_sans",
});

export const metadata = {
  title: "GSO Dashboard",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body
      className={`${ibmPlexSansArabic.variable} font-sans min-h-screen bg-gray-200 text-gray-950 antialiased`}
    >
      {children}
    </body>
  );
}
