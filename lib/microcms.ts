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
  titleEn?: string
  slug: string
  year: string
  thumbnail: MicroCMSImage
  description?: string
  descriptionEn?: string
  image?: MicroCMSImage
  images?: MicroCMSImage[]
  videoUrl?: string
}

export type HistoryItem = {
  fieldId: string
  startDate: string // ISO 8601形式 (例: "2024-04-01T00:00:00.000Z")
  endDate?: string // 終了日（進行中の場合は空）
  title: string
  titleEn?: string
}

export type ExhibitionItem = {
  fieldId: string
  startDate: string
  endDate?: string
  title: string
  titleEn?: string
  venue?: string
  venueEn?: string
  location?: string
  locationEn?: string
}

export type SocialLink = {
  fieldId: string
  platformId: string // "x", "instagram", etc.
  url: string
}

export type Activity = {
  id: string
  title: string
  titleEn?: string
  slug: string
  date: string
  content?: string
  contentEn?: string
}

export type About = {
  name: string
  nameEn?: string
  bio: string
  bioEn?: string
  profileImage?: {
    url: string
    width: number
    height: number
  }
  email?: string
  social?: SocialLink[]
  education?: HistoryItem[]
  awards?: HistoryItem[]
  exhibitions?: ExhibitionItem[]
  grants?: HistoryItem[]
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

const sampleActivities: Activity[] = [
  {
    id: "1",
    title: "新しいプロジェクトを開始しました",
    titleEn: "Started a new project",
    slug: "new-project-2024",
    date: "2024-03-15",
    content: "<p>新しいWebデザインプロジェクトを開始しました。</p>",
    contentEn: "<p>Started a new web design project.</p>",
  },
  {
    id: "2",
    title: "デザインアワードを受賞",
    titleEn: "Won design award",
    slug: "design-award-2024",
    date: "2024-02-01",
    content: "<p>国際デザインアワードで入賞しました。</p>",
    contentEn: "<p>Won an international design award.</p>",
  },
]

// Activities取得
export async function getActivities(
  limit: number = 10,
  offset: number = 0
): Promise<{ contents: Activity[]; totalCount: number }> {
  if (!client) {
    console.log("[v0] MicroCMS not configured, using sample data")
    const start = offset
    const end = offset + limit
    return {
      contents: sampleActivities.slice(start, end),
      totalCount: sampleActivities.length,
    }
  }

  try {
    const response = await client.get<MicroCMSListResponse<Activity>>({
      endpoint: "activities",
      queries: { orders: "-date", limit, offset },
    })
    return {
      contents: response.contents,
      totalCount: response.totalCount,
    }
  } catch (error) {
    console.log("[v0] MicroCMS fetch error, using sample data:", error)
    const start = offset
    const end = offset + limit
    return {
      contents: sampleActivities.slice(start, end),
      totalCount: sampleActivities.length,
    }
  }
}

// Activity詳細取得
export async function getActivityBySlug(slug: string): Promise<Activity | null> {
  if (!client) {
    return sampleActivities.find((a) => a.slug === slug) || null
  }

  try {
    const response = await client.get<MicroCMSListResponse<Activity>>({
      endpoint: "activities",
      queries: { filters: `slug[equals]${slug}` },
    })
    return response.contents[0] || null
  } catch (error) {
    console.log("[v0] MicroCMS fetch error:", error)
    return sampleActivities.find((a) => a.slug === slug) || null
  }
}
