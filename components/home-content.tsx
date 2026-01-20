"use client"

import type { Work } from "@/lib/microcms"
import { WorksGrid } from "./works-grid"
import { useI18n } from "@/lib/i18n"

type HomeContentProps = {
  works: Work[]
}

export function HomeContent({ works }: HomeContentProps) {
  const { t } = useI18n()

  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-6">
        <section className="mb-12">
          <h1 className="text-2xl font-medium mb-2">{t.works}</h1>
          <p className="text-muted-foreground text-sm">{t.selectedProjects}</p>
        </section>
        <WorksGrid works={works} />
      </div>
    </main>
  )
}
