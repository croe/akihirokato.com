"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react"

export type Locale = "ja" | "en"

type Translations = {
  // Common
  backToWorks: string
  backToActivities: string
  // Header
  works: string
  activities: string
  about: string
  contact: string
  // Home
  selectedProjects: string
  // Activities
  activitiesTitle: string
  activitiesSubtitle: string
  // About
  educationAndJobHistory: string
  awards: string
  exhibitions: string
  grantsAndResidences: string
  links: string
  // Contact
  contactTitle: string
  name: string
  email: string
  company: string
  phone: string
  service: string
  servicePlaceholder: string
  serviceWebDev: string
  serviceConsulting: string
  serviceOther: string
  message: string
  messagePlaceholder: string
  submit: string
  submitting: string
  thankYou: string
  thankYouMessage: string
  required: string
}

const translations: Record<Locale, Translations> = {
  ja: {
    backToWorks: "作品一覧に戻る",
    backToActivities: "アクティビティ一覧に戻る",
    works: "Works",
    activities: "Activities",
    about: "About",
    contact: "Contact",
    selectedProjects: "Selected projects",
    activitiesTitle: "アクティビティ",
    activitiesSubtitle: "最新の活動情報",
    educationAndJobHistory: "学歴 / 職歴",
    awards: "受賞歴",
    exhibitions: "展示歴",
    grantsAndResidences: "助成金 / 滞在制作",
    links: "リンク",
    contactTitle: "お問い合わせ",
    name: "お名前",
    email: "メールアドレス",
    company: "会社名・団体名",
    phone: "電話番号",
    service: "ご希望のサービス",
    servicePlaceholder: "選択してください",
    serviceWebDev: "Web開発",
    serviceConsulting: "コンサルティング",
    serviceOther: "その他",
    message: "お問い合わせ内容",
    messagePlaceholder: "お問い合わせ内容をご記入ください",
    submit: "送信する",
    submitting: "送信中...",
    thankYou: "お問い合わせありがとうございます。",
    thankYouMessage: "内容を確認次第、担当者よりご連絡させていただきます。",
    required: "*",
  },
  en: {
    backToWorks: "Back to Works",
    backToActivities: "Back to Activities",
    works: "Works",
    activities: "Activities",
    about: "About",
    contact: "Contact",
    selectedProjects: "Selected projects",
    activitiesTitle: "Activities",
    activitiesSubtitle: "Latest updates and news",
    educationAndJobHistory: "Education / Job History",
    awards: "Awards",
    exhibitions: "Exhibitions",
    grantsAndResidences: "Grants / Residences",
    links: "Links",
    contactTitle: "Contact",
    name: "Name",
    email: "Email",
    company: "Company / Organization",
    phone: "Phone",
    service: "Service",
    servicePlaceholder: "Select a service",
    serviceWebDev: "Web Development",
    serviceConsulting: "Consulting",
    serviceOther: "Other",
    message: "Message",
    messagePlaceholder: "Your message...",
    submit: "Send Message",
    submitting: "Sending...",
    thankYou: "Thank you for your message.",
    thankYouMessage: "We will get back to you as soon as possible.",
    required: "*",
  },
}

type I18nContextType = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Translations
}

const I18nContext = createContext<I18nContextType | null>(null)

function getInitialLocale(): Locale {
  // localStorageに保存された設定があればそれを使用
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("locale") as Locale | null
    if (saved && (saved === "ja" || saved === "en")) {
      return saved
    }

    // ブラウザの言語設定を確認
    const browserLang = navigator.language || (navigator as { userLanguage?: string }).userLanguage || ""
    if (browserLang.startsWith("en")) {
      return "en"
    }
  }

  return "ja"
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("ja")

  useEffect(() => {
    const initialLocale = getInitialLocale()
    setLocale(initialLocale)
  }, [])

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale)
    localStorage.setItem("locale", newLocale)
  }

  return (
    <I18nContext.Provider
      value={{
        locale,
        setLocale: handleSetLocale,
        t: translations[locale],
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}

export function useLocale() {
  const { locale } = useI18n()
  return locale
}
