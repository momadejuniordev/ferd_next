// app/layout.tsx
import { ReactNode } from "react";
import "./globals.css";
import Script from "next/script";

type LayoutProps = {
  children: ReactNode;
};

export const metadata = {
  title: "Meu Projeto Next.js",
  description: "Um projeto Next.js com layout padrão",
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="pt">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* CSS externos */}
        <link href="/css/bootstrap.min.css" rel="stylesheet" />
        <link href="/css/plugins.css" rel="stylesheet" />
        <link href="/css/style.css" rel="stylesheet" />
        <link href="/css/coloring.css" rel="stylesheet" />
        <link href="/css/colors/scheme-01.css" rel="stylesheet" />
      </head>
      <body>
        <Menu />
        {children}
        <Footer />

        {/* Scripts externos */}
        <Script src="/js/plugins.js" strategy="beforeInteractive" />
        <Script src="/js/designesia.js" strategy="lazyOnload" />
        <Script src="/js/custom-marquee.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
