import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "Akihiro Kato | Portfolio"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#171717",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: 16,
              backgroundColor: "#FAFAFA",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 60,
              fontWeight: 700,
              color: "#171717",
            }}
          >
            AK
          </div>
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 600,
            color: "#FAFAFA",
            marginBottom: 16,
          }}
        >
          Akihiro Kato
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
