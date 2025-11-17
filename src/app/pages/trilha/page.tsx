"use client";

import { useLayoutEffect, Suspense } from "react";
import Footer from "@/app/components/Footer"; // Componente do rodapé da página
import Topo from "@/app/components/Topo"; // Componente do topo / barra de navegação
import Trilhas from "@/app/components/Triha"; // Componente que exibe as trilhas/cursos
import { useSearchParams } from "next/navigation";
import { useBackgroundImage } from "@/app/hooks/useBackgroundImage";

function TrilhaContent() {
  const searchParams = useSearchParams();
  const trilhaId = searchParams.get("trilhaId");
  const backgroundImage = useBackgroundImage("pages");

  useLayoutEffect(() => {
    document.title = "Trilha - Estude.My";
  }, []);

  return (
    <>
      {/* ===========================
          Container principal da página
          =========================== */}
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${backgroundImage}')`, // Imagem de fundo
          backgroundColor: "var(--bg-page)", // Cor de fundo alternativa
          backgroundAttachment: "local", // Rola com o conteúdo, evitando oscilação
        }}
      >
        {/* ===========================
            Container relativo para controle de z-index
            =========================== */}
        <div className="relative z-10">
          {/* Estrutura principal em coluna com espaçamento */}
          <div className="flex min-h-screen flex-col transition-all duration-300 justify-space-between">
            {/* Topo / barra de navegação */}
            <Topo />

            {/* Componente que exibe as trilhas/cursos */}
            <Trilhas trilhaId={trilhaId || undefined} />

            {/* Rodapé */}
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default function TrilhaPage() {
  const backgroundImage = useBackgroundImage("pages");
  
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
            backgroundColor: "var(--bg-page)",
            backgroundAttachment: "local",
          }}
        >
          <div className="text-center">
            <p className="text-[var(--text-secondary)]">Carregando...</p>
          </div>
        </div>
      }
    >
      <TrilhaContent />
    </Suspense>
  );
}
