import { NextResponse } from "next/server"
import sgMail from "@sendgrid/mail"

// SendGrid APIキーを設定
sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

// レート制限用のメモリストア（本番環境ではRedisなどを推奨）
const rateLimitStore = new Map<string, number[]>()

// スパム検出関数
function isSpam(data: {
  name: string
  email: string
  company?: string
  phone?: string
  message: string
  website?: string
}): boolean {
  // 1. ハニーポットチェック（websiteフィールドに入力がある場合はボット）
  if (data.website && data.website.trim() !== "") {
    console.log("Spam detected: honeypot triggered")
    return true
  }

  // 2. ランダム文字列パターンの検出
  // 大文字小文字が混在し、意味のない文字列が多い場合
  const randomPattern = /^[A-Za-z]{15,}$/
  if (
    randomPattern.test(data.name) ||
    (data.company && randomPattern.test(data.company)) ||
    (data.phone && randomPattern.test(data.phone))
  ) {
    console.log("Spam detected: random string pattern")
    return true
  }

  // 3. 日本語チェック（名前またはメッセージに日本語が含まれていない場合は疑わしい）
  // const hasJapanese = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(
  //   data.name + data.message
  // )
  // if (!hasJapanese) {
  //   console.log("Spam detected: no Japanese characters")
  //   return true
  // }

  // 4. 連続した大文字・小文字のみで構成される長い文字列
  const suspiciousLongString = /^[A-Z]{10,}$|^[a-z]{10,}$/
  if (
    suspiciousLongString.test(data.name) ||
    suspiciousLongString.test(data.message)
  ) {
    console.log("Spam detected: suspicious long string")
    return true
  }

  return false
}

// レート制限チェック（同一IPから5分以内に3回以上の送信を制限）
function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const timestamps = rateLimitStore.get(ip) || []

  // 5分以内のタイムスタンプをフィルタ
  const recentTimestamps = timestamps.filter((t) => now - t < 5 * 60 * 1000)

  if (recentTimestamps.length >= 3) {
    console.log("Rate limit exceeded for IP:", ip)
    return false
  }

  // 新しいタイムスタンプを追加
  recentTimestamps.push(now)
  rateLimitStore.set(ip, recentTimestamps)

  return true
}

export async function POST(request: Request) {
  try {
    // IPアドレスを取得
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown"

    // レート制限チェック
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "送信回数が上限に達しました。しばらく時間をおいてから再度お試しください。" },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { name, email, company, phone, service, message, website } = body

    // スパムチェック
    if (isSpam({ name, email, company, phone, message, website })) {
      return NextResponse.json(
        { error: "不正な送信が検出されました。" },
        { status: 400 }
      )
    }

    // 管理者宛のメール
    const adminMsg = {
      to: process.env.ADMIN_EMAIL!, // 管理者のメールアドレス
      from: process.env.FROM_EMAIL!, // 送信元メールアドレス
      subject: "【お問い合わせ】新しいお問い合わせがありました",
      text: `
名前: ${name}
メールアドレス: ${email}
会社名・団体名: ${company || "未入力"}
電話番号: ${phone || "未入力"}
お問い合わせ内容:
${message}
      `,
      html: `
<h2>akihirokato.comに新しいお問い合わせがありました</h2>
<p><strong>名前:</strong> ${name}</p>
<p><strong>メールアドレス:</strong> ${email}</p>
<p><strong>会社名・団体名:</strong> ${company || "未入力"}</p>
<p><strong>電話番号:</strong> ${phone || "未入力"}</p>
<p><strong>ご希望のサービス:</strong> ${service || "未選択"}</p>
<p><strong>お問い合わせ内容:</strong></p>
<p>${message.replace(/\n/g, "<br>")}</p>
      `,
    }

    // メール送信
    await Promise.all([
      sgMail.send(adminMsg),
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json(
      { error: "メールの送信に失敗しました" },
      { status: 500 }
    )
  }
} 