import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

import { NavLinks } from "@/components/nav-links";
import { getApiBaseUrl } from "@/lib/env";

export const metadata: Metadata = {
  title: "MT5 Manager Test App",
  description: "Simple frontend for testing an MT5 Manager backend API."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const apiBaseUrl = getApiBaseUrl();

  return (
    <html lang="en">
      <body>
        <div className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-[1.75rem] border border-white/70 bg-white/80 p-6 shadow-panel backdrop-blur md:p-8">
            <header className="mb-8 space-y-4 border-b border-border pb-6">
              <div className="space-y-2">
                <p className="text-sm font-medium uppercase tracking-[0.22em] text-accent">
                  MT5 Manager API Tester
                </p>
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-semibold tracking-tight text-ink">
                      Minimal frontend for exercising MT5 manager endpoints
                    </h1>
                    <p className="max-w-3xl text-sm text-muted">
                      Set <code className="rounded bg-canvas px-1 py-0.5">NEXT_PUBLIC_API_BASE_URL</code>,
                      then use the pages below to test your backend responses.
                    </p>
                  </div>
                  <div className="rounded-xl border border-border bg-canvas px-4 py-3 text-sm">
                    <div className="font-medium text-ink">API Base URL</div>
                    <div className="break-all text-muted">{apiBaseUrl || "Not configured"}</div>
                  </div>
                </div>
              </div>
              <NavLinks />
            </header>
            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
