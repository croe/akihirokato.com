import { createClient } from "microcms-js-sdk"

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN
const apiKey = process.env.MICROCMS_API_KEY

// クライアントは環境変数がある場合のみ作成
export const client =
  serviceDomain && apiKey
    ? createClient({
        serviceDomain,
        apiKey,
      })
    : null

// 型定義
export type MicroCMSImage = {
  url: string
  width: number
  height: number
}

export type Work = {
  id: string
  title: string
  slug: string
  year: string
  thumbnail: MicroCMSImage
  description?: string
  image?: MicroCMSImage
  images?: MicroCMSImage[]
}

export type About = {
  name: string
  nameJa?: string
  bio: string
  profileImage?: {
    url: string
    width: number
    height: number
  }
  email?: string
  social?: {
    fieldId: string
    platform: string
    url: string
  }[]
}

export type MicroCMSListResponse<T> = {
  contents: T[]
  totalCount: number
  offset: number
  limit: number
}

const sampleWorks: Work[] = [
  {
    id: "1",
    title: "Crangers",
    slug: "crangers",
    year: "2024",
    thumbnail: {
      url: "/web-design-project-crangers.jpg",
      width: 800,
      height: 600,
    },
    description: "Web design project for Crangers.",
  },
  {
    id: "2",
    title: "Brand Identity",
    slug: "brand-identity",
    year: "2023",
    thumbnail: {
      url: "/brand-identity-design.png",
      width: 800,
      height: 600,
    },
    description: "Brand identity design project.",
  },
  {
    id: "3",
    title: "Mobile App",
    slug: "mobile-app",
    year: "2023",
    thumbnail: {
      url: "/mobile-app-ui-design.png",
      width: 800,
      height: 600,
    },
    description: "Mobile application UI/UX design.",
  },
]

// Works取得
export async function getWorks(): Promise<Work[]> {
  if (!client) {
    console.log("[v0] MicroCMS not configured, using sample data")
    return sampleWorks
  }

  try {
    const response = await client.get<MicroCMSListResponse<Work>>({
      endpoint: "works",
      queries: { orders: "-year" },
    })
    return response.contents
  } catch (error) {
    console.log("[v0] MicroCMS fetch error, using sample data:", error)
    return sampleWorks
  }
}

// Work詳細取得
export async function getWorkBySlug(slug: string): Promise<Work | null> {
  if (!client) {
    return sampleWorks.find((w) => w.slug === slug) || null
  }

  try {
    const response = await client.get<MicroCMSListResponse<Work>>({
      endpoint: "works",
      queries: { filters: `slug[equals]${slug}` },
    })
    return response.contents[0] || null
  } catch (error) {
    console.log("[v0] MicroCMS fetch error:", error)
    return sampleWorks.find((w) => w.slug === slug) || null
  }
}

// About取得
export async function getAbout(): Promise<About | null> {
  if (!client) {
    return null
  }

  try {
    const response = await client.get<About>({
      endpoint: "about",
    })
    return response
  } catch (error) {
    console.log("[v0] MicroCMS about fetch error:", error)
    return null
  }
}
