import './globals.css'

export const metadata = {
  title: 'Troubled Waters: Sailing with AI in Supply Chain',
  description: 'Accelalpha & Oracle exclusive event - Navigate the Complexities of Gulf Supply Chain & Logistics',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-poppins">
        {children}
      </body>
    </html>
  )
}
