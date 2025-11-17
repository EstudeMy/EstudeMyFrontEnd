import type { Metadata } from "next";
// 🔹 Importa o tipo Metadata do Next.js (usado para configurar <title>, <meta>, etc.)

import "bootstrap/dist/css/bootstrap.min.css";
// 🔹 Importa o CSS principal do Bootstrap (disponibilizando suas classes globalmente)

import "./globals.css";
// 🔹 Importa o CSS global do projeto (suas customizações próprias)

import ProtectedRoute from "./components/ProtectedRoute";
// 🔹 Importa o componente de proteção de rotas
import { ThemeProvider } from "./contexts/ThemeContext";
// 🔹 Importa o provider de tema
import { LanguageProvider } from "./contexts/LanguageContext";
// 🔹 Importa o provider de idioma
import { Jaro } from "next/font/google";
// 🔹 Importa a fonte Jaro do Google Fonts

// 🔹 Configuração da fonte Jaro
const jaro = Jaro({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jaro",
});

// 🔹 Configuração de metadados da aplicação (SEO e cabeçalho do HTML)
export const metadata: Metadata = {
  title: "Estude.My", // Título padrão da aplicação
  description: "Plataforma de aprendizado gamificado", // Descrição padrão
};

// 🔹 Layout raiz: envolve todas as páginas do projeto
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // "children" são os componentes das páginas
}>) {
  return (
    // O componente deve sempre retornar <html> e <body>
    // "suppressHydrationWarning" é usado para evitar erros de hidratação
    // quando o HTML do servidor e do cliente são ligeiramente diferentes
    <html lang="en" suppressHydrationWarning={true} className={jaro.variable}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var finalTheme = theme === 'dark' || (!theme && prefersDark) ? 'dark' : 'light';
                  
                  if (finalTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                  document.documentElement.setAttribute('data-theme', finalTheme);
                  
                  // Aplicar variáveis CSS imediatamente
                  var bgColor = finalTheme === 'dark' ? '#1a1a1a' : '#f3f4f6';
                  var textColor = finalTheme === 'dark' ? '#f3f4f6' : '#1f2937';
                  document.documentElement.style.setProperty('--bg-page', bgColor);
                  document.documentElement.style.setProperty('--text-primary', textColor);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={jaro.className} suppressHydrationWarning>
        <ThemeProvider>
          <LanguageProvider>
            <ProtectedRoute>
              {children} {/* Aqui todas as páginas/rotas serão renderizadas */}
            </ProtectedRoute>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
