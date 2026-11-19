import { useLocation } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { PublicFooter } from "./PublicFooter";
import { PublicNavbar } from "./PublicNavbar";
import { ToastNotice } from "./ToastNotice";

/** Pages that use their own full-screen layout (no public navbar/footer). */
export function isStandalonePath(path: string) {
  return path.startsWith("/admin") || path.startsWith("/dashboard") || path === "/login" || path === "/register";
}

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = useLocation({ select: (l) => l.pathname });
  const standalone = isStandalonePath(pathname);

  return (
    <div className="min-h-screen bg-background font-sans antialiased selection:bg-gold selection:text-black">
      <ToastNotice />
      {!standalone && <PublicNavbar />}
      {children}
      {!standalone && <PublicFooter />}
    </div>
  );
}
