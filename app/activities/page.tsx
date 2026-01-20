import { getActivities } from "@/lib/microcms"
import { ActivitiesContent } from "@/components/activities-content"

export const metadata = {
  title: "Activities | Akihiro Kato",
  description: "Latest activities and updates by Akihiro Kato",
}

export default async function ActivitiesPage() {
  const activities = await getActivities()

  return <ActivitiesContent activities={activities} />
}
