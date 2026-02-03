import type { NextConfig } from "next";

import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  // output: "standalone", // Remove for Vercel deployment

  reactStrictMode: false,

  /** THIS FOR IMPROVE LCP - legacy js */
  // transpilePackages: ["next"],
  // turbopack: {
  //   resolveAlias: {
  //     "../build/polyfills/polyfill-module": path.relative(
  //       os.devNull,
  //       __dirname,
  //     ),
  //   },
  // },

  /** THIS FOR IMPROVE LCP - legace js */
  // Configure compiler to target modern browsers only
  // compiler: {
  //   // Remove console.log in production
  //   removeConsole:
  //     process.env.NODE_ENV === "production"
  //       ? {
  //           exclude: ["error", "warn"],
  //         }
  //       : false,
  // },

  /** THIS FOR APPLE APP SITE ASSOCIATION */
  async headers() {
    return [
      {
        source: "/.well-known/apple-app-site-association",
        headers: [{ key: "content-type", value: "application/json" }],
      },
    ];
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },

    /* THIS FOR APPLE APP SITE ASSOCIATION */

    /** THIS FOR IMPROVE LCP - legace js */
    // Optimize for modern browsers
    // optimizePackageImports: [
    //   "react-icons",
    //   "@radix-ui/react-alert-dialog",
    //   "@radix-ui/react-checkbox",
    //   "@radix-ui/react-dialog",
    //   "@radix-ui/react-label",
    //   "@radix-ui/react-popover",
    //   "@radix-ui/react-scroll-area",
    //   "@radix-ui/react-select",
    //   "@radix-ui/react-slot",
    //   "lucide-react",
    // ],
  },
  images: {
    //unoptimized: true, // TODO: Remove this after testing
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3-alpha-sig.figma.com",
        port: "",
        pathname: "/img/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        //pathname: "/img/**",
      },
      {
        protocol: "https",
        hostname: "assets.aqar.fm",
        port: "",
      },
      {
        protocol: "https",
        hostname: "videos.pexels.com",
        port: "",
        pathname: "/video-files/**",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
