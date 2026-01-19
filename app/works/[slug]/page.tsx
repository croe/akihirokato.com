import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getWorkBySlug, getWorks } from "@/lib/microcms"
import { ImageLightbox } from "@/components/image-lightbox"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const works = await getWorks()
  return works.map((work) => ({ slug: work.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const work = await getWorkBySlug(slug)
  if (!work) return { title: "Work Not Found" }

  const plainDescription = work.description
    ? work.description.replace(/<[^>]*>/g, "").slice(0, 160)
    : undefined

  return {
    title: `${work.title} | Akihiro Kato`,
    description: plainDescription,
  }
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params
  const work = await getWorkBySlug(slug)

  if (!work) {
    notFound()
  }

  const displayImageUrl = work.image?.url || work.thumbnail?.url || "/placeholder.svg"

  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Works
        </Link>

        <article className="space-y-8">
          <header className="space-y-2">
            <h1 className="text-3xl font-medium">{work.title}</h1>
            <p className="text-muted-foreground">{work.year}</p>
          </header>

          <div className="aspect-video relative overflow-hidden bg-muted rounded-sm">
            <Image
              src={displayImageUrl}
              alt={work.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          {work.description && (
            <div
              className="prose prose-neutral dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: work.description }}
            />
          )}

          {work.images && work.images.length > 0 && (
            <ImageLightbox images={work.images} title={work.title} />
          )}
        </article>
      </div>
    </main>
  )
}
