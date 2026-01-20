"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Work } from "@/lib/microcms"
import { ImageLightbox } from "@/components/image-lightbox"
import { VideoEmbed } from "@/components/video-embed"
import { useI18n, useLocale } from "@/lib/i18n"

type WorkDetailContentProps = {
  work: Work
}

export function WorkDetailContent({ work }: WorkDetailContentProps) {
  const { t } = useI18n()
  const locale = useLocale()

  const displayImageUrl = work.image?.url || work.thumbnail?.url || "/placeholder.svg"
  const title = locale === "en" && work.titleEn ? work.titleEn : work.title
  const description =
    locale === "en" && work.descriptionEn ? work.descriptionEn : work.description

  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.backToWorks}
        </Link>

        <article className="space-y-8">
          <header className="space-y-2">
            <h1 className="text-3xl font-medium">{title}</h1>
            <p className="text-muted-foreground">{work.year}</p>
          </header>

          {work.videoUrl ? (
            <VideoEmbed url={work.videoUrl} title={title} />
          ) : (
            <div className="aspect-video relative overflow-hidden bg-muted rounded-sm">
              <Image
                src={displayImageUrl}
                alt={title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
          )}

          {description && (
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}

          {work.images && work.images.length > 0 && (
            <ImageLightbox images={work.images} title={title} />
          )}
        </article>
      </div>
    </main>
  )
}
