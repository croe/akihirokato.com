import { getWorks } from "@/lib/microcms"
import { HomeContent } from "@/components/home-content"

export default async function HomePage() {
  const works = await getWorks()

  return <HomeContent works={works} />
}
