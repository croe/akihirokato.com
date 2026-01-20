"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Activity } from "@/lib/microcms"
import { useI18n, useLocale } from "@/lib/i18n"

type ActivityDetailContentProps = {
  activity: Activity
}

function formatDate(dateString: string, locale: "ja" | "en"): string {
  const date = new Date(dateString)
  if (locale === "ja") {
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  }
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function ActivityDetailContent({ activity }: ActivityDetailContentProps) {
  const { t } = useI18n()
  const locale = useLocale()

  const title = locale === "en" && activity.titleEn ? activity.titleEn : activity.title
  const content =
    locale === "en" && activity.contentEn ? activity.contentEn : activity.content

  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-3xl">
        <Link
          href="/activities"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.backToActivities}
        </Link>

        <article className="space-y-6">
          <header className="space-y-2">
            <time className="text-sm text-muted-foreground">
              {formatDate(activity.date, locale)}
            </time>
            <h1 className="text-3xl font-medium">{title}</h1>
          </header>

          {content && (
            <div
              className="prose max-w-none prose-headings:font-medium prose-a:text-foreground prose-a:underline hover:prose-a:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </article>
      </div>
    </main>
  )
}
