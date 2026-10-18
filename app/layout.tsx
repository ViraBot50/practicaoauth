import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Práctica OAuth 2.0",
  description: "Inicio de sesión con Google y otros proveedores usando OAuth 2.0.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Fuentes cargadas desde Google Fonts en el layout raíz (aplica a todas las páginas). */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400..700&family=JetBrains+Mono:wght@400;600&family=Space+Grotesk:wght@500..700&display=swap"
        />
      </head>
      <body>
        <header className="topbar">
          <Link href="/" className="brand">
            <span className="brand-mark">O</span> Práctica OAuth 2.0
          </Link>
          <span className="topbar-note">OAuth 2.0 · Next.js + Auth.js</span>
        </header>
        <main className="container">{children}</main>
        <footer className="footer">
          Demo educativa de inicio de sesión con OAuth 2.0.
        </footer>
      </body>
    </html>
  );
}
