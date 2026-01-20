"use client"

import type { Activity } from "@/lib/microcms"
import { ActivitiesList } from "./activities-list"
import { Pagination } from "./pagination"
import { useI18n } from "@/lib/i18n"

type ActivitiesContentProps = {
  activities: Activity[]
  currentPage: number
  totalPages: number
}

export function ActivitiesContent({
  activities,
  currentPage,
  totalPages,
}: ActivitiesContentProps) {
  const { t } = useI18n()

  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-3xl">
        <section className="mb-12">
          <h1 className="text-2xl font-medium mb-2">{t.activitiesTitle}</h1>
          <p className="text-muted-foreground text-sm">{t.activitiesSubtitle}</p>
        </section>
        <ActivitiesList activities={activities} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/activities"
        />
      </div>
    </main>
  )
}
