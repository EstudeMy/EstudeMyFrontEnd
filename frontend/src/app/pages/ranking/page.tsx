import React from "react";
import Topo from "@/app/components/Topo";           // Componente do topo/navegação
import Footer from "@/app/components/Footer";       // Componente do rodapé
import Ranking from "@/app/components/Ranking";     // Componente que exibe o ranking de usuários

export default function RankingPage() {
  return (
    <>
      {/* ===========================
          Container principal da página
          =========================== */}
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: "url('/img/backgroundteste1.png')", // Imagem de fundo
          backgroundColor: "#f3f4f6", // Cor de fundo alternativa
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

            {/* Área de conteúdo principal */}
            <div className="flex flex-1">
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

