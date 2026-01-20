import { notFound } from "next/navigation"
import { getWorkBySlug, getWorks } from "@/lib/microcms"
import { WorkDetailContent } from "@/components/work-detail-content"

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

  return <WorkDetailContent work={work} />
}
