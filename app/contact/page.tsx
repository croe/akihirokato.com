"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)

    // フォーム送信のシミュレーション
    // 実際にはAPI Routeを作成してメール送信などを行う
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-lg">
          <h1 className="text-2xl font-medium mb-8">Contact</h1>
          <div className="text-center py-12 space-y-4">
            <p className="text-foreground">Thank you for your message.</p>
            <p className="text-muted-foreground text-sm">I will get back to you as soon as possible.</p>
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
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" type="text" required placeholder="Your name" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required placeholder="your@email.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" required placeholder="Your message..." rows={6} />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
    </main>
  )
}
