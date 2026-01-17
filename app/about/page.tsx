import Image from "next/image"
import { getAbout } from "@/lib/microcms"

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

  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-2xl">
        <h1 className="text-2xl font-medium mb-12">About</h1>

        <div className="space-y-8">
          {about?.profileImage && (
            <div className="w-32 h-32 relative rounded-full overflow-hidden bg-muted">
              <Image
                src={about.profileImage.url || "/placeholder.svg"}
                alt={about.name || "Profile"}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-medium">{about?.name || "Akihiro Kato"}</h2>
              {about?.nameJa && <p className="text-muted-foreground text-sm">{about.nameJa}</p>}
            </div>

            <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
              {about?.bio || "Designer / Developer based in Japan."}
            </p>
          </div>

          {about?.social && about.social.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Links</h3>
              <ul className="space-y-1">
                {about.social.map((link) => (
                  <li key={link.fieldId}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:text-muted-foreground transition-colors underline underline-offset-4"
                    >
                      {link.platform}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
