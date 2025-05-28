import React from 'react'

import './globals.css'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'TextTo01',
  description: 'Draw text and convert it in 0s and 1s - Next App by @NachoJuanDev',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  )
}
