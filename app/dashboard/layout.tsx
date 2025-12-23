"use client";

import React from "react";
import Link from "next/link";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-100 text-black">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h4 className="text-2xl font-bold text-gray-900 text-center">Dashboard</h4>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <Link
            href="/dashboard/home"
            className="px-3 py-2 rounded bg-blue-500 hover:text-red hover:bg-blue-50 text-black transition-colors"
          >
            Pagina inicial
          </Link>
          <Link
            href="/dashboard/about"
            className="px-3 py-2 rounded bg-blue-500 hover:text-red hover:bg-blue-50 text-black transition-colors"
          >
            Sobre
          </Link>
          <Link
            href="/dashboard/services"
            className="px-3 py-2 rounded bg-blue-500 hover:text-red hover:bg-blue-50 text-black transition-colors"
          >
            Serviços
          </Link>
          <Link
            href="/dashboard/works"
            className="px-3 py-2 rounded bg-blue-500 hover:text-red hover:bg-blue-50 text-black transition-colors"
          >
            Projectos
          </Link>
          <Link
            href="/dashboard/blog"
            className="px-3 py-2 rounded bg-blue-500 hover:text-red hover:bg-blue-50 text-black transition-colors"
          >
            Blog
          </Link>

          <Link
            href="/dashboard/contact"
            className="px-3 py-2 rounded bg-blue-400 hover:text-red hover:bg-blue-50 text-black transition-colors"
          >
            Contactos
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-200 text-sm text-gray-500">
          &copy; 2025 Meu Dashboard
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-50">
        {children}
      </main>
    </div>
  );
}
