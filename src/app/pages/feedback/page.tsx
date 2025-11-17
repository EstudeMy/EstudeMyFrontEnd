"use client";

import Feedback from "@/app/components/Feedback"; // Componente de feedback
import Footer from "@/app/components/Footer";     // Componente do rodapé
import Topo from "@/app/components/Topo";         // Componente do topo/navegação
import { useBackgroundImage } from "@/app/hooks/useBackgroundImage";

export default function FeedbackPage() {
  const backgroundImage = useBackgroundImage("pages");
  
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
          <div className="flex flex-col min-h-screen">
            {/* Topo / Barra de navegação */}
            <Topo />

            {/* Área de conteúdo principal */}
            <div className="flex flex-1">
              <Feedback />
            </div>

            {/* Rodapé */}
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

