"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useI18n } from "@/lib/i18n"

export default function ContactPage() {
  const { t } = useI18n()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [service, setService] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      phone: formData.get("phone"),
      service: service,
      message: formData.get("message"),
      website: formData.get("website"),
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "送信に失敗しました")
      }

      setIsSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "送信に失敗しました")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-lg">
          <h1 className="text-2xl font-medium mb-8">{t.contact}</h1>
          <div className="text-center py-12 space-y-4">
            <p className="text-foreground">{t.thankYou}</p>
            <p className="text-muted-foreground text-sm">{t.thankYouMessage}</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-lg">
        <h1 className="text-2xl font-medium mb-8">{t.contact}</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ハニーポット（非表示） */}
          <input
            type="text"
            name="website"
            autoComplete="off"
            tabIndex={-1}
            className="absolute -left-[9999px]"
          />

          <div className="space-y-2">
            <Label htmlFor="name">
              {t.name} <span className="text-destructive">{t.required}</span>
            </Label>
            <Input id="name" name="name" type="text" required placeholder="John Doe" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              {t.email} <span className="text-destructive">{t.required}</span>
            </Label>
            <Input id="email" name="email" type="email" required placeholder="example@email.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">{t.company}</Label>
            <Input id="company" name="company" type="text" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">{t.phone}</Label>
            <Input id="phone" name="phone" type="tel" />
          </div>

          {/* <div className="space-y-2">
            <Label htmlFor="service">{t.service}</Label>
            <Select value={service} onValueChange={setService}>
              <SelectTrigger>
                <SelectValue placeholder={t.servicePlaceholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web-development">{t.serviceWebDev}</SelectItem>
                <SelectItem value="consulting">{t.serviceConsulting}</SelectItem>
                <SelectItem value="other">{t.serviceOther}</SelectItem>
              </SelectContent>
            </Select>
          </div> */}

          <div className="space-y-2">
            <Label htmlFor="message">
              {t.message} <span className="text-destructive">{t.required}</span>
            </Label>
            <Textarea id="message" name="message" required placeholder={t.messagePlaceholder} rows={6} />
          </div>

          {error && (
            <div className="text-destructive text-sm">{error}</div>
          )}

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? t.submitting : t.submit}
          </Button>
        </form>
      </div>
    </main>
  )
}
