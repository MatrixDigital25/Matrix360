import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/app/components/Footer'

export const metadata: Metadata = {
  title: 'Matrix360 - Hybrid Intelligence Platform',
  description: 'Transform Enterprise Decisions with Hybrid Intelligence',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
