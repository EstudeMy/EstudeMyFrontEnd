"use client";

import { useTheme } from "@/app/contexts/ThemeContext";

type BackgroundType = "login" | "lp" | "pages";

export function useBackgroundImage(type: BackgroundType = "pages"): string {
  const { theme } = useTheme();

  const backgrounds = {
    login: {
      dark: "/img/backgrounds/background_login_darkmode.jpg",
      light: "/img/backgrounds/background_login_lightmode.png",
    },
    lp: {
      dark: "/img/backgrounds/backgroun_lp_darkmode.jpg",
      light: "/img/backgrounds/background_lp_ligthmode.png",
    },
    pages: {
      dark: "/img/backgrounds/background_pages_darkmode.jpg",
      light: "/img/backgrounds/background_pages_lightmode.png",
    },
  };

  return theme === "dark" ? backgrounds[type].dark : backgrounds[type].light;
}



