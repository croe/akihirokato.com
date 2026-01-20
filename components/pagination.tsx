"use client"

import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

type PaginationProps = {
  currentPage: number
  totalPages: number
  basePath: string
}

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null

  const getPageUrl = (page: number) => {
    if (page === 1) return basePath
    return `${basePath}?page=${page}`
  }

  const renderPageNumbers = () => {
    const pages: (number | string)[] = []
    const showEllipsis = totalPages > 7

    if (!showEllipsis) {
      // 7ページ以下の場合は全て表示
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // 7ページより多い場合は省略記号を使用
      if (currentPage <= 3) {
        // 最初の方のページ
        pages.push(1, 2, 3, 4, "...", totalPages)
      } else if (currentPage >= totalPages - 2) {
        // 最後の方のページ
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        // 中間のページ
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages)
      }
    }

    return pages
  }

  return (
    <nav className="flex items-center justify-center gap-2 mt-12">
      {/* 前へボタン */}
      {currentPage > 1 ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="inline-flex items-center justify-center w-9 h-9 rounded hover:bg-muted transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </Link>
      ) : (
        <span className="inline-flex items-center justify-center w-9 h-9 text-muted-foreground/40">
          <ChevronLeft className="w-4 h-4" />
        </span>
      )}

      {/* ページ番号 */}
      {renderPageNumbers().map((page, index) => {
        if (page === "...") {
          return (
            <span key={`ellipsis-${index}`} className="inline-flex items-center justify-center w-9 h-9">
              ...
            </span>
          )
        }

        const pageNum = page as number
        const isActive = pageNum === currentPage

        return (
          <Link
            key={pageNum}
            href={getPageUrl(pageNum)}
            className={`inline-flex items-center justify-center w-9 h-9 rounded text-sm transition-colors ${
              isActive
                ? "bg-foreground text-background"
                : "hover:bg-muted"
            }`}
            aria-label={`Page ${pageNum}`}
            aria-current={isActive ? "page" : undefined}
          >
            {pageNum}
          </Link>
        )
      })}

      {/* 次へボタン */}
      {currentPage < totalPages ? (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="inline-flex items-center justify-center w-9 h-9 rounded hover:bg-muted transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <span className="inline-flex items-center justify-center w-9 h-9 text-muted-foreground/40">
          <ChevronRight className="w-4 h-4" />
        </span>
      )}
    </nav>
  )
}
