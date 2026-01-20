import { notFound } from "next/navigation"
import { getActivityBySlug, getActivities } from "@/lib/microcms"
import { ActivityDetailContent } from "@/components/activity-detail-content"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const { contents: activities } = await getActivities(100, 0)
  return activities.map((activity) => ({ slug: activity.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const activity = await getActivityBySlug(slug)
  if (!activity) return { title: "Activity Not Found" }

  const plainContent = activity.content
    ? activity.content.replace(/<[^>]*>/g, "").slice(0, 160)
    : undefined

  return {
    title: `${activity.title} | Akihiro Kato`,
    description: plainContent,
  }
}

export default async function ActivityDetailPage({ params }: Props) {
  const { slug } = await params
  const activity = await getActivityBySlug(slug)

  if (!activity) {
    notFound()
  }

  return <ActivityDetailContent activity={activity} />
}
