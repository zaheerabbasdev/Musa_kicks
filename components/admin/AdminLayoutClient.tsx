"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { AdminSidebar } from "./AdminSidebar";

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-neutral-100/70">
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-neutral-950/70 backdrop-blur-xs lg:hidden"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar with responsive transform */}
      <div
        className={`fixed top-0 bottom-0 left-0 z-50 transition-transform duration-300 lg:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <AdminSidebar onClose={() => setIsMobileOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-[264px]">
        {/* Mobile Admin Top Bar */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-neutral-950 text-white border-b border-white/10 sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
            <Link href="/admin" className="font-extrabold tracking-tight text-sm text-white">
              MUSA KICKS ADMIN
            </Link>
          </div>
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 text-neutral-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label={isMobileOpen ? "Close admin menu" : "Open admin menu"}
          >
            <FontAwesomeIcon icon={isMobileOpen ? faXmark : faBars} className="w-5 h-5" />
          </button>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
