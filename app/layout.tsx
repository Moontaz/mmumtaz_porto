import type { Metadata, Viewport } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import "./globals.css";

export const metadata: Metadata = {
   metadataBase: new URL("https://example.com"),
   title: {
      default: "M Mumtaz — Frontend Developer",
      template: "%s — M Mumtaz",
   },
   description:
      "Frontend developer crafting considered digital experiences through code, interaction, and motion.",
   keywords: [
      "frontend developer",
      "React",
      "Next.js",
      "TypeScript",
      "GSAP",
      "web development",
   ],
   authors: [{ name: "M Mumtaz" }],
   creator: "M Mumtaz",
   openGraph: {
      title: "M Mumtaz — Frontend Developer",
      description:
         "Frontend developer crafting considered digital experiences through code, interaction, and motion.",
      url: "https://example.com",
      siteName: "M Mumtaz",
      type: "website",
      images: [
         {
            url: "/og-image.svg",
            width: 1200,
            height: 630,
            alt: "M Mumtaz — Frontend Developer",
         },
      ],
   },
   twitter: {
      card: "summary_large_image",
      title: "M Mumtaz — Frontend Developer",
      description:
         "Frontend developer crafting considered digital experiences through code, interaction, and motion.",
      images: ["/og-image.svg"],
   },
   icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
   themeColor: "#f4f4f1",
   colorScheme: "light",
};

export default function RootLayout({
   children,
}: Readonly<{ children: React.ReactNode }>) {
   return (
      <html lang="en">
         <body>
            <SiteShell>{children}</SiteShell>
         </body>
      </html>
   );
}
