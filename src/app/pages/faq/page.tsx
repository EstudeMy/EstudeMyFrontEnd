"use client";

import Faq from "@/app/components/Faq";         // Componente de perguntas frequentes
import Footer from "@/app/components/Footer";   // Componente do rodapé
import Topo from "@/app/components/Topo";       // Componente do topo/navegação
import { useBackgroundImage } from "@/app/hooks/useBackgroundImage";

export default function Home() {
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
                    backgroundColor: 'var(--bg-page)',                           // Cor de fundo alternativa
                    backgroundAttachment: "local", // Rola com o conteúdo, evitando oscilação
                }}
            >
                {/* ===========================
            Container relativo para controle de z-index
            =========================== */}
                <div className="relative z-10">

                    {/* Topo / Barra de navegação */}
                    <Topo/>

                    {/* ===========================
              Estrutura principal da página
              =========================== */}
                    <div className="flex min-h-screen flex-col transition-all duration-300 justify-space-between">

                        {/* Área principal com FAQ */}
                        <Faq/>

                        {/* Rodapé */}
                        
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    );
}
