import type { Work } from "@/lib/microcms"
import { WorkCard } from "./work-card"

type WorksGridProps = {
  works: Work[]
}

export function WorksGrid({ works }: WorksGridProps) {
  if (works.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">No works found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {works.map((work) => (
        <WorkCard key={work.id} work={work} />
      ))}
    </div>
  )
}
