"use client"

import Image from "next/image"
import type { About, HistoryItem, ExhibitionItem } from "@/lib/microcms"
import { useI18n, useLocale, type Locale } from "@/lib/i18n"

const platformNames: Record<string, string> = {
  x: "X (Twitter)",
  twitter: "X (Twitter)",
  instagram: "Instagram",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  github: "GitHub",
  youtube: "YouTube",
  tiktok: "TikTok",
  website: "Website",
}

function formatDateFromISO(isoDate: string): string {
  const date = new Date(isoDate)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  return `${year}.${month}`
}

function formatDateRange(
  startDate: string,
  endDate?: string,
  locale: Locale = "ja"
): string {
  const start = formatDateFromISO(startDate)
  if (!endDate) {
    const present = locale === "ja" ? "現在" : "Present"
    return `${start} - ${present}`
  }
  const end = formatDateFromISO(endDate)
  if (start === end) {
    return start
  }
  return `${start} - ${end}`
}

function HistorySection({
  title,
  items,
  yearOnly = false,
  yearMonthOnly = false,
}: {
  title: string
  items: HistoryItem[]
  yearOnly?: boolean
  yearMonthOnly?: boolean
}) {
  const locale = useLocale()

  if (!items || items.length === 0) return null

  const formatDisplay = (item: HistoryItem) => {
    if (yearOnly) {
      const date = new Date(item.startDate)
      return `${date.getFullYear()}`
    }
    if (yearMonthOnly) {
      return formatDateFromISO(item.startDate)
    }
    return formatDateRange(item.startDate, item.endDate, locale)
  }

  const widthClass = yearOnly ? "w-16" : yearMonthOnly ? "w-24" : "w-32"

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{title}</h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.fieldId} className="flex gap-4">
            <span className={`text-muted-foreground text-sm shrink-0 ${widthClass}`}>
              {formatDisplay(item)}
            </span>
            <div className="flex-1">
              <p className="text-sm">
                {locale === "en" && item.titleEn ? item.titleEn : item.title}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ExhibitionsSection({
  title,
  items,
}: {
  title: string
  items: ExhibitionItem[]
}) {
  const locale = useLocale()

  if (!items || items.length === 0) return null

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{title}</h3>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.fieldId} className="flex gap-4">
            <span className="text-muted-foreground text-sm w-32 shrink-0">
              {formatDateRange(item.startDate, item.endDate, locale)}
            </span>
            <div className="flex-1">
              <p className="text-sm">
                {locale === "en" && item.titleEn ? item.titleEn : item.title}
              </p>
              {(item.venue || item.venueEn) && (
                <p className="text-sm text-muted-foreground">
                  {locale === "en" && item.venueEn ? item.venueEn : item.venue}
                  {(item.location || item.locationEn) && (
                    <span>
                      {" "}
                      ({locale === "en" && item.locationEn ? item.locationEn : item.location})
                    </span>
                  )}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

type AboutContentProps = {
  about: About | null
}

export function AboutContent({ about }: AboutContentProps) {
  const { t } = useI18n()
  const locale = useLocale()

  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-2xl">
        <h1 className="text-2xl font-medium mb-12">{t.about}</h1>

        <div className="space-y-12">
          {about?.profileImage && (
            <div className="w-32 h-32 relative rounded-full overflow-hidden bg-muted">
              <Image
                src={about.profileImage.url || "/placeholder.svg"}
                alt={about.name || "Profile"}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-medium">
                {locale === "en" && about?.nameEn
                  ? about.nameEn
                  : about?.name || "Akihiro Kato"}
              </h2>
            </div>

            {about?.bio || about?.bioEn ? (
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html:
                    locale === "en" && about?.bioEn ? about.bioEn : about?.bio || "",
                }}
              />
            ) : (
              <p className="text-foreground/80 leading-relaxed">
                Designer / Developer based in Japan.
              </p>
            )}
          </div>

          {about?.social && about.social.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-lg font-medium">{t.links}</h3>
              <ul className="space-y-1">
                {about.social.map((link, index) => (
                  <li key={`${link.fieldId}-${index}`}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:text-muted-foreground transition-colors underline underline-offset-4"
                    >
                      {platformNames[link.platformId] || link.platformId}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {about?.education && (
            <HistorySection
              title={t.educationAndJobHistory}
              items={about.education}
            />
          )}

          {about?.awards && (
            <HistorySection title={t.awards} items={about.awards} yearMonthOnly />
          )}

          {about?.exhibitions && (
            <ExhibitionsSection
              title={t.exhibitions}
              items={about.exhibitions}
            />
          )}

          {about?.grants && (
            <HistorySection
              title={t.grantsAndResidences}
              items={about.grants}
              yearMonthOnly
            />
          )}
        </div>
      </div>
    </main>
  )
}
