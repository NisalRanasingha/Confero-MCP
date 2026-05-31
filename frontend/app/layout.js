import './globals.css'

const SITE_URL = 'https://event-managment-frontend-chi.vercel.app' 

export const metadata = {
  title: 'Troubled Waters: Sailing with AI in Supply Chain',
  description: 'Accelalpha & Oracle exclusive event - Navigate the Complexities of Gulf Supply Chain & Logistics',
  
  metadataBase: new URL(SITE_URL), 

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: 'Troubled Waters: Sailing with AI in Supply Chain',
    description: 'Accelalpha & Oracle exclusive event - Navigate the Complexities of Gulf Supply Chain & Logistics',
    url: SITE_URL,
    siteName: 'Accelalpha Events',
    images: [
      {
        url: '/og-image.png', 
        width: 1200,
        height: 630,
        alt: 'Troubled Waters Event Banner',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Troubled Waters: Sailing with AI in Supply Chain',
    description: 'Accelalpha & Oracle exclusive event - Navigate the Complexities of Gulf Supply Chain & Logistics',
    images: ['/og-image.png'], 
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-poppins antialiased">
        {children}
      </body>
    </html>
  )
}