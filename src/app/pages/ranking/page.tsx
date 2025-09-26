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
                    backgroundColor: '#f3f4f6'                           // Cor de fundo alternativa
                }}
            >
                {/* ===========================
            Container relativo para controle de z-index
            =========================== */}
                <div className="relative z-10">

                    {/* Topo / Barra de navegação */}
                    <Topo/>

                    {/* Seção principal do Ranking */}
                    <div className="pt-3 w-full max-w-6xl mx-auto px-4">

                        {/* Título da seção */}
                        <div className="text-3xl p-4 rounded-xl">Ranking</div>

                        {/* Componente de Ranking */}
                        <Ranking/>
                    </div>

                    {/* Rodapé */}
                    <Footer/>
                </div>
            </div>
        </>
    );
}
