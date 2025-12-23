"use client";

import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string; // caminho base da rota, ex: "/blog"
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath = "/blog",
}: PaginationProps) {
  if (totalPages <= 1) return null; // não mostra nada se houver só uma página

  return (
    <nav className="pagination">
      <ul className="flex gap-2 justify-center">
        {/* Previous */}
        {currentPage > 1 && (
          <li>
            <Link
              href={`${basePath}?page=${currentPage - 1}`}
              className="page-link"
            >
              &laquo; Anterior
            </Link>
          </li>
        )}

        {/* Pages */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <li key={page}>
            <Link
              href={`${basePath}?page=${page}`}
              className={`page-link ${page === currentPage ? "active" : ""}`}
            >
              {page}
            </Link>
          </li>
        ))}

        {/* Next */}
        {currentPage < totalPages && (
          <li>
            <Link
              href={`${basePath}?page=${currentPage + 1}`}
              className="page-link"
            >
              Próximo &raquo;
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
