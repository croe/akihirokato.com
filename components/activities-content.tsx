"use client"

import type { Activity } from "@/lib/microcms"
import { ActivitiesList } from "./activities-list"
import { useI18n } from "@/lib/i18n"

type ActivitiesContentProps = {
  activities: Activity[]
}

export function ActivitiesContent({ activities }: ActivitiesContentProps) {
  const { t } = useI18n()

  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-3xl">
        <section className="mb-12">
          <h1 className="text-2xl font-medium mb-2">{t.activitiesTitle}</h1>
          <p className="text-muted-foreground text-sm">{t.activitiesSubtitle}</p>
        </section>
        <ActivitiesList activities={activities} />
      </div>
    </main>
  )
}
