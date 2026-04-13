import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { DebugPanel } from "@/components/ui/DebugPanel";
import { PageTransition } from "@/components/ui/PageTransition";
import { TransitionProvider } from "@/components/ui/TransitionProvider";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "JT DiMartile",
    template: "%s — JT DiMartile",
  },
  description: "Product designer. Work, projects, experiments, and writing.",
  metadataBase: new URL("https://vmedium.xyz"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vmedium.xyz",
    siteName: "JT DiMartile",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <TransitionProvider>
            <Nav />
            <DebugPanel />
            <main style={{ paddingBlockStart: "calc(64px + var(--space-7))", minHeight: "100dvh" }}>
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </TransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
