"use client"

import Link from "next/link"
import type { Activity } from "@/lib/microcms"
import { useLocale } from "@/lib/i18n"

type ActivitiesListProps = {
  activities: Activity[]
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
    month: "short",
    day: "numeric",
  })
}

export function ActivitiesList({ activities }: ActivitiesListProps) {
  const locale = useLocale()

  if (activities.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">No activities found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {activities.map((activity) => {
        const title = locale === "en" && activity.titleEn ? activity.titleEn : activity.title

        return (
          <Link
            key={activity.id}
            href={`/activities/${activity.slug}`}
            className="block group"
          >
            <article className="border-b border-border pb-6 transition-colors hover:border-foreground/20">
              <div className="flex flex-col gap-2">
                <time className="text-sm text-muted-foreground">
                  {formatDate(activity.date, locale)}
                </time>
                <h2 className="text-lg font-medium group-hover:text-muted-foreground transition-colors">
                  {title}
                </h2>
              </div>
            </article>
          </Link>
        )
      })}
    </div>
  )
}
