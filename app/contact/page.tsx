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

export default function ContactPage() {
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
          <h1 className="text-2xl font-medium mb-8">Contact</h1>
          <div className="text-center py-12 space-y-4">
            <p className="text-foreground">お問い合わせありがとうございます。</p>
            <p className="text-muted-foreground text-sm">内容を確認次第、担当者よりご連絡させていただきます。</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-lg">
        <h1 className="text-2xl font-medium mb-8">Contact</h1>

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
              お名前 <span className="text-destructive">*</span>
            </Label>
            <Input id="name" name="name" type="text" required placeholder="山田 太郎" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              メールアドレス <span className="text-destructive">*</span>
            </Label>
            <Input id="email" name="email" type="email" required placeholder="example@email.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">会社名・団体名</Label>
            <Input id="company" name="company" type="text" placeholder="株式会社〇〇" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">電話番号</Label>
            <Input id="phone" name="phone" type="tel" placeholder="03-1234-5678" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="service">ご希望のサービス</Label>
            <Select value={service} onValueChange={setService}>
              <SelectTrigger>
                <SelectValue placeholder="選択してください" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web-development">Web開発</SelectItem>
                <SelectItem value="consulting">コンサルティング</SelectItem>
                <SelectItem value="other">その他</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">
              お問い合わせ内容 <span className="text-destructive">*</span>
            </Label>
            <Textarea id="message" name="message" required placeholder="お問い合わせ内容をご記入ください" rows={6} />
          </div>

          {error && (
            <div className="text-destructive text-sm">{error}</div>
          )}

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "送信中..." : "送信する"}
          </Button>
        </form>
      </div>
    </main>
  )
}
