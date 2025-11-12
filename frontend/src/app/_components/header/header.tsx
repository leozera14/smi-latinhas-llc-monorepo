"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useUIStore } from "@/stores/ui-store";

export function Header() {
  const { toggleSidebar } = useUIStore();

  return (
    <header className="bg-dark text-white sticky top-0 z-50 border-b border-dark-700">
      <div className="px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-dark-700 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </button>

            <Link href="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-primary">SMi</div>
              <span className="text-sm text-gray-300 hidden sm:block">
                GROUP
              </span>
            </Link>
          </div>

          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-xs font-medium">User</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
