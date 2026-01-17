import { getWorks } from "@/lib/microcms"
import { WorksGrid } from "@/components/works-grid"

export default async function HomePage() {
  const works = await getWorks()

  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-6">
        <section className="mb-12">
          <h1 className="text-2xl font-medium mb-2">Works</h1>
          <p className="text-muted-foreground text-sm">Selected projects</p>
        </section>
        <WorksGrid works={works} />
      </div>
    </main>
  )
}
