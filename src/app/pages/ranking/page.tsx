"use client";

import React, { useEffect, useLayoutEffect } from "react";
import Topo from "@/app/components/Topo"; // Componente do topo/navegação
import Footer from "@/app/components/Footer"; // Componente do rodapé
import Ranking from "@/app/components/Ranking"; // Componente que exibe o ranking de usuários
import { useBackgroundImage } from "@/app/hooks/useBackgroundImage";

export default function RankingPage() {
  const backgroundImage = useBackgroundImage("pages");
  
  useLayoutEffect(() => {
    document.title = "Ranking - Estude.My";
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
            Container relativo para z-index
            =========================== */}
        <div className="relative z-10">
          {/* ===========================
              Estrutura principal da página
              =========================== */}
          <div className="">
            {/* Topo / Barra de navegação */}
            <Topo />

            {/* Área de conteúdo principal */}
            <div className=" flex items-center justify-center min-h-screen">
              <Ranking />
            </div>

            {/* Rodapé */}
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
