import Image from "next/image"
import Link from "next/link"
import type { Work } from "@/lib/microcms"

type WorkCardProps = {
  work: Work
}

export function WorkCard({ work }: WorkCardProps) {
  return (
    <Link href={`/works/${work.slug}`} className="group block">
      <article className="space-y-3">
        <div className="aspect-[4/3] relative overflow-hidden bg-muted rounded-sm">
          <Image
            src={work.thumbnail.url || "/placeholder.svg"}
            alt={work.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="space-y-1">
          <h2 className="text-sm font-medium group-hover:text-muted-foreground transition-colors">{work.title}</h2>
          <p className="text-xs text-muted-foreground">{work.year}</p>
        </div>
      </article>
    </Link>
  )
}
