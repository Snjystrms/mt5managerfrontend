"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/groups", label: "Groups / Products" },
  { href: "/create-account", label: "Create Account" },
  { href: "/users", label: "Users" },
  { href: "/account-detail", label: "Account Detail" },
  { href: "/history", label: "History" },
  { href: "/balance", label: "Balance" }
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-2">
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "rounded-full border px-3 py-2 text-sm transition",
              isActive
                ? "border-accent bg-accent text-white"
                : "border-border bg-panel text-ink hover:border-accent hover:text-accent"
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
