"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n"

export function Header() {
  const { locale, setLocale, t } = useI18n()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-medium tracking-tight">
          Akihiro Kato
        </Link>
        <nav className="flex items-center gap-6 md:gap-8">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t.works}
          </Link>
          <Link href="/activities" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t.activities}
          </Link>
          <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t.about}
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t.contact}
          </Link>
          <button
            onClick={() => setLocale(locale === "ja" ? "en" : "ja")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors ml-2"
            aria-label="Toggle language"
          >
            {locale === "ja" ? "EN" : "JA"}
          </button>
        </nav>
      </div>
    </header>
  )
}
