import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Jost } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileTabBar } from "@/components/MobileTabBar";
import { CartProvider } from "@/lib/cart";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
});

const jost = Jost({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  title: {
    default: "Charlotte — Pâtisserie",
    template: "%s — Charlotte Pâtisserie",
  },
  description:
    "Hand-finished cakes and petite pâtisserie, baked to order for birthdays, weddings and quiet little celebrations.",
};

export const viewport: Viewport = {
  themeColor: "#FAF6F4",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${instrumentSerif.variable} ${jost.variable} antialiased`}
    >
      {/* 82px bottom padding below md keeps content clear of the fixed tab bar. */}
      <body className="min-h-dvh bg-ground font-sans text-ink max-md:pb-[82px]">
        <CartProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-xs focus:font-medium focus:tracking-[0.16em] focus:text-ground focus:uppercase"
          >
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <MobileTabBar />
        </CartProvider>
      </body>
    </html>
  );
}
