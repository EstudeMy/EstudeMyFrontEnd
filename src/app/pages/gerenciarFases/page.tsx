"use client";

import React, { Suspense } from "react";
// Componente para criar trilhas
import Footer from "@/app/components/Footer"; // Componente do rodapé
import Topo from "@/app/components/Topo"; // Componente do topo/navegação
import GerenciarFasesConteudo from "@/app/components/GerenciarFases"; // Componente para criar trilhas
import { useBackgroundImage } from "@/app/hooks/useBackgroundImage";

export default function GerenciarFasesPage() {
  const backgroundImage = useBackgroundImage("pages");
  
  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${backgroundImage}')`, // Imagem de fundo
          backgroundColor: "var(--bg-page)", // Cor de fundo alternativa
          backgroundAttachment: "local", // Rola com o conteúdo, evitando oscilação
        }}
      >
        {/* ===========================
            Container relativo para z-index
            =========================== */}
        <div className="relative z-10">
          {/* ===========================
              Estrutura principal da página
              =========================== */}
          <div className="flex flex-col min-h-screen">
            {/* Topo / Barra de navegação */}
            <Topo />

            <div className="flex flex-1 justify-center items-start px-2 sm:px-4 md:px-6 py-4 sm:py-6 w-full overflow-x-hidden">
              {/* Área de conteúdo principal: Gerenciar fases */}
              <Suspense fallback={<p className="text-center">Carregando...</p>}>
                <GerenciarFasesConteudo />
              </Suspense>
            </div>

            {/* Rodapé */}
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
