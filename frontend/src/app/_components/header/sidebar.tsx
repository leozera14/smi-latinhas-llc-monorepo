"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package } from "lucide-react";
import { useUIStore } from "@/stores/ui-store";
import { cn } from "@/utils/cn";

const menuItems = [
  {
    href: "/demandas",
    label: "Demandas",
    icon: LayoutDashboard,
  },
  {
    href: "/itens",
    label: "Itens",
    icon: Package,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isSidebarOpen, closeSidebar } = useUIStore();

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => useUIStore.getState().closeSidebar()}
        />
      )}

      <aside
        className={cn(
          "fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] bg-dark border-r border-dark-700 z-40 transition-all duration-300",
          "lg:translate-x-0 overflow-hidden",
          isSidebarOpen
            ? "translate-x-0 lg:w-64"
            : "-translate-x-full lg:w-0 lg:border-r-0"
        )}
      >
        <nav className="flex flex-col p-4 space-y-2 w-64">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-300 hover:bg-dark-700 hover:text-primary"
                )}
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    closeSidebar();
                  }
                }}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
