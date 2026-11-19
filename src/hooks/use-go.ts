import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";

/** Every page in the Rhino Strength Gym site. */
export type AppPath =
  | "/"
  | "/about"
  | "/programs"
  | "/facilities"
  | "/membership"
  | "/trainers"
  | "/schedule"
  | "/gallery"
  | "/faq"
  | "/contact"
  | "/admin"
  | "/admin/login"
  | "/login"
  | "/register"
  | "/dashboard";

/** Small wrapper so buttons can navigate with `navigate('/membership')`. */
export function useGo() {
  const navigate = useNavigate();
  return useCallback((to: AppPath) => {
    void navigate({ to });
  }, [navigate]);
}
