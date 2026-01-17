import Link from "next/link"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-medium tracking-tight">
          Akihiro Kato
        </Link>
        <nav className="flex items-center gap-8">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Works
          </Link>
          <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  )
}
