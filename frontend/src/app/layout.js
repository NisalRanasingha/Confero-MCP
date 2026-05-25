import './globals.css';

export const metadata = {
  title: 'Confero Summit 2026 — The Enterprise AI Horizon',
  description:
    'The flagship assembly for tech executives orchestrating next-generation artificial intelligence, multi-agent frameworks, and data infrastructure. October 15th, 2026 | Colombo, Sri Lanka.',
  openGraph: {
    title: 'Confero Summit 2026',
    description: 'The Enterprise AI Horizon',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#050608" />
      </head>
      <body className="bg-void text-slate-100 font-body antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
