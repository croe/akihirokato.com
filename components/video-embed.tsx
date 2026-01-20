type VideoEmbedProps = {
  url: string
  title?: string
}

function getEmbedUrl(url: string): string | null {
  // YouTube URLs
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  const youtubeMatch = url.match(youtubeRegex)
  if (youtubeMatch && youtubeMatch[1]) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`
  }

  // Vimeo URLs
  const vimeoRegex = /vimeo\.com\/(?:.*\/)?(\d+)/
  const vimeoMatch = url.match(vimeoRegex)
  if (vimeoMatch && vimeoMatch[1]) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`
  }

  return null
}

export function VideoEmbed({ url, title = "Video" }: VideoEmbedProps) {
  const embedUrl = getEmbedUrl(url)

  if (!embedUrl) {
    return null
  }

  return (
    <div className="aspect-video relative overflow-hidden bg-muted rounded-sm">
      <iframe
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  )
}
