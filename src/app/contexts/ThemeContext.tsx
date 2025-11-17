"use client";

import React, { createContext, useContext, useState, useEffect, useLayoutEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme, saveToBackend?: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Rotas públicas que não devem salvar no backend
const PUBLIC_ROUTES = ["/", "/pages/login", "/pages/cadastro", "/pages/recuperar-senha"];

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Verificar se é rota pública
  const isPublicRoute = pathname ? PUBLIC_ROUTES.some(route => pathname === route || pathname.startsWith(route + "/")) : false;

  // Aplicar tema imediatamente no carregamento (antes de qualquer renderização)
  useLayoutEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
      setThemeState(savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialTheme = prefersDark ? "dark" : "light";
      setThemeState(initialTheme);
      if (initialTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      document.documentElement.setAttribute("data-theme", initialTheme);
    }
  }, []);

  // Carregar tema do backend (se autenticado) ou localStorage
  useEffect(() => {
    const loadTheme = async () => {
      const token = localStorage.getItem("token");
      
      // Se estiver em rota pública ou não tiver token, usar localStorage
      if (isPublicRoute || !token) {
        const savedTheme = localStorage.getItem("theme") as Theme | null;
        if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
          setThemeState(savedTheme);
        } else {
          // Se não houver tema salvo, usar preferência do sistema
          const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
          setThemeState(prefersDark ? "dark" : "light");
        }
        setMounted(true);
        return;
      }

      // Se tiver token, buscar do backend (apenas uma vez)
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${API_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const userData = await res.json();
          if (userData.tema && (userData.tema === "light" || userData.tema === "dark")) {
            setThemeState(userData.tema);
            localStorage.setItem("theme", userData.tema);
          } else {
            // Se não tiver tema no backend, usar localStorage ou preferência do sistema
            const savedTheme = localStorage.getItem("theme") as Theme | null;
            if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
              setThemeState(savedTheme);
            } else {
              const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
              setThemeState(prefersDark ? "dark" : "light");
            }
          }
        } else {
          // Se falhar, usar localStorage
          const savedTheme = localStorage.getItem("theme") as Theme | null;
          if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
            setThemeState(savedTheme);
          } else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setThemeState(prefersDark ? "dark" : "light");
          }
        }
      } catch (error) {
        console.error("Erro ao buscar tema do backend:", error);
        // Em caso de erro, usar localStorage
        const savedTheme = localStorage.getItem("theme") as Theme | null;
        if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
          setThemeState(savedTheme);
        } else {
          const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
          setThemeState(prefersDark ? "dark" : "light");
        }
      } finally {
        setMounted(true);
      }
    };

    if (!mounted) {
      loadTheme();
    }
  }, [isPublicRoute, mounted]);

  // Salvar tema no localStorage e backend (se não for rota pública)
  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem("theme", theme);
    
    // Aplicar tema no elemento HTML
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme, mounted]);

  const setTheme = async (newTheme: Theme, saveToBackend: boolean = true) => {
    setThemeState(newTheme);
    
    // Salvar no backend apenas se não for rota pública e tiver token
    if (saveToBackend && !isPublicRoute) {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
          const response = await fetch(`${API_URL}/api/users/tema`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ tema: newTheme }),
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("Erro ao salvar tema no backend:", response.status, errorData);
            // Não recarrega se houver erro
            return;
          }
        } catch (error) {
          console.error("Erro ao salvar tema no backend:", error);
          // Não recarrega se houver erro
          return;
        }
      }
    }
    
    // Recarregar a página após mudar o tema (apenas se salvou com sucesso ou não precisa salvar)
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme, !isPublicRoute);
  };

  // Sempre fornecer o contexto, mesmo durante o carregamento inicial
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

