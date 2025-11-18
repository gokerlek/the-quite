import { ReactNode } from 'react'
import { Geist, Geist_Mono, Inconsolata } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'

import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'

import Providers from './providers'

import type { Metadata, Viewport } from 'next'

import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const inconsolata = Inconsolata({
  variable: '--font-inconsolata',
  subsets: ['latin'],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: 'The Quiet',
  description: '',
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={
          `${geistSans.variable} ${geistMono.variable} ${inconsolata.variable} antialiased` +
          ' bg-offblack-50 relative w-full'
        }
      >
        <NextIntlClientProvider messages={messages}>
          <Providers>
            {children}

            {/* App-wide header and footer */}
            {/* They hide when localStorage 'loaded' is true via LoadingContext */}
            <Header />

            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
