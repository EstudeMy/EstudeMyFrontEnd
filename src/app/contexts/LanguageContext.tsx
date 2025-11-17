"use client";

import React, { createContext, useContext, useState, useEffect, useLayoutEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";

type Language = "pt-BR" | "en-US" | "es-ES";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language, saveToBackend?: boolean) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Rotas públicas que não devem salvar no backend
const PUBLIC_ROUTES = ["/", "/pages/login", "/pages/cadastro", "/pages/recuperar-senha"];

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("pt-BR");
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Verificar se é rota pública
  const isPublicRoute = pathname ? PUBLIC_ROUTES.some(route => pathname === route || pathname.startsWith(route + "/")) : false;

  // Importar traduções
  const [translations, setTranslations] = useState<any>({});

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const translationsModule = await import(`@/app/locales/${language}.json`);
        setTranslations(translationsModule.default || translationsModule);
      } catch (error) {
        console.error("Erro ao carregar traduções:", error);
        // Fallback para português
        try {
          const fallback = await import(`@/app/locales/pt-BR.json`);
          setTranslations(fallback.default || fallback);
        } catch (e) {
          setTranslations({});
        }
      }
    };
    loadTranslations();
  }, [language]);

  // Função de tradução
  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations;
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) return key;
    }
    return typeof value === "string" ? value : key;
  };

  // Aplicar idioma imediatamente no carregamento
  useLayoutEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language | null;
    if (savedLanguage && (savedLanguage === "pt-BR" || savedLanguage === "en-US" || savedLanguage === "es-ES")) {
      setLanguageState(savedLanguage);
      document.documentElement.setAttribute("lang", savedLanguage);
    } else {
      // Detectar idioma do navegador
      const browserLang = navigator.language || "pt-BR";
      let detectedLang: Language = "pt-BR";
      if (browserLang.startsWith("en")) detectedLang = "en-US";
      else if (browserLang.startsWith("es")) detectedLang = "es-ES";
      
      setLanguageState(detectedLang);
      document.documentElement.setAttribute("lang", detectedLang);
    }
  }, []);

  // Carregar idioma do backend (se autenticado) ou localStorage
  useEffect(() => {
    const loadLanguage = async () => {
      const token = localStorage.getItem("token");
      
      // Se estiver em rota pública ou não tiver token, usar localStorage
      if (isPublicRoute || !token) {
        const savedLanguage = localStorage.getItem("language") as Language | null;
        if (savedLanguage && (savedLanguage === "pt-BR" || savedLanguage === "en-US" || savedLanguage === "es-ES")) {
          setLanguageState(savedLanguage);
        } else {
          const browserLang = navigator.language || "pt-BR";
          let detectedLang: Language = "pt-BR";
          if (browserLang.startsWith("en")) detectedLang = "en-US";
          else if (browserLang.startsWith("es")) detectedLang = "es-ES";
          setLanguageState(detectedLang);
        }
        setMounted(true);
        return;
      }

      // Se tiver token, buscar do backend
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${API_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const userData = await res.json();
          if (userData.idioma && (userData.idioma === "pt-BR" || userData.idioma === "en-US" || userData.idioma === "es-ES")) {
            setLanguageState(userData.idioma);
            localStorage.setItem("language", userData.idioma);
          } else {
            const savedLanguage = localStorage.getItem("language") as Language | null;
            if (savedLanguage && (savedLanguage === "pt-BR" || savedLanguage === "en-US" || savedLanguage === "es-ES")) {
              setLanguageState(savedLanguage);
            } else {
              const browserLang = navigator.language || "pt-BR";
              let detectedLang: Language = "pt-BR";
              if (browserLang.startsWith("en")) detectedLang = "en-US";
              else if (browserLang.startsWith("es")) detectedLang = "es-ES";
              setLanguageState(detectedLang);
            }
          }
        } else {
          const savedLanguage = localStorage.getItem("language") as Language | null;
          if (savedLanguage && (savedLanguage === "pt-BR" || savedLanguage === "en-US" || savedLanguage === "es-ES")) {
            setLanguageState(savedLanguage);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar idioma do backend:", error);
        const savedLanguage = localStorage.getItem("language") as Language | null;
        if (savedLanguage && (savedLanguage === "pt-BR" || savedLanguage === "en-US" || savedLanguage === "es-ES")) {
          setLanguageState(savedLanguage);
        }
      } finally {
        setMounted(true);
      }
    };

    if (!mounted) {
      loadLanguage();
    }
  }, [isPublicRoute, mounted]);

  // Salvar idioma no localStorage e backend
  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem("language", language);
    document.documentElement.setAttribute("lang", language);
  }, [language, mounted]);

  const setLanguage = async (newLanguage: Language, saveToBackend: boolean = true) => {
    setLanguageState(newLanguage);
    
    // Salvar no backend apenas se não for rota pública e tiver token
    if (saveToBackend && !isPublicRoute) {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
          const response = await fetch(`${API_URL}/api/users/idioma`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ idioma: newLanguage }),
          });

          if (!response.ok) {
            console.error("Erro ao salvar idioma no backend:", response.status);
          }
        } catch (error) {
          console.error("Erro ao salvar idioma no backend:", error);
        }
      }
    }
    
    // Recarregar a página após mudar o idioma
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  // Sempre fornecer o contexto
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

