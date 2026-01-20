import { getActivities } from "@/lib/microcms"
import { ActivitiesContent } from "@/components/activities-content"

export const metadata = {
  title: "Activities | Akihiro Kato",
  description: "Latest activities and updates by Akihiro Kato",
}

const ITEMS_PER_PAGE = 10

type SearchParams = Promise<{ page?: string }>

type Props = {
  searchParams: SearchParams
}

export default async function ActivitiesPage({ searchParams }: Props) {
  const params = await searchParams
  const currentPage = Number(params.page) || 1
  const offset = (currentPage - 1) * ITEMS_PER_PAGE

  const { contents: activities, totalCount } = await getActivities(ITEMS_PER_PAGE, offset)
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  return (
    <ActivitiesContent
      activities={activities}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  )
}
