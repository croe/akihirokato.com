import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { GoogleAnalytics } from "@/components/google-analytics"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { I18nProvider } from "@/lib/i18n"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://akihirokato.com"),
  title: "Akihiro Kato | Portfolio",
  description: "Portfolio of Akihiro Kato",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`font-sans antialiased min-h-screen flex flex-col`}>
        <GoogleAnalytics />
        <I18nProvider>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  )
}
