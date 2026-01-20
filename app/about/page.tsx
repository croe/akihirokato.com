import { getAbout } from "@/lib/microcms"
import { AboutContent } from "@/components/about-content"

export const metadata = {
  title: "About | Akihiro Kato",
  description: "About Akihiro Kato",
}

export default async function AboutPage() {
  let about = null

  try {
    about = await getAbout()
  } catch (error) {
    // MicroCMSにaboutが設定されていない場合はフォールバック
  }

  return <AboutContent about={about} />
}
