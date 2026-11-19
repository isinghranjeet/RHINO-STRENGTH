import { Sparkles } from "lucide-react";

import { useApp } from "@/context/AppContext";

/** Small pop-up message in the bottom-right corner. */
export function ToastNotice() {
  const { toast } = useApp();
  if (!toast) return null;
  const tone = toast.type === "error" ? "border-destructive" : "border-gold";
  return (
    <div
      role="status"
      className={`fixed bottom-6 right-6 z-50 bg-card border ${tone} text-foreground px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-bold animate-bounce`}
    >
      <Sparkles className="w-4 h-4 text-gold" />
      <span>{toast.message}</span>
    </div>
  );
}
