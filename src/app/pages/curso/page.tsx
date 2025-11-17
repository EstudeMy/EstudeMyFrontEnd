"use client";

import { useLayoutEffect, Suspense } from "react";
import Footer from "@/app/components/Footer"; // Componente do rodapé
import Topo from "@/app/components/Topo";     // Componente do topo/navegação
import Questao from "@/app/components/Questao"; // Componente de questão do curso
import { useBackgroundImage } from "@/app/hooks/useBackgroundImage";

export default function Curso() {
    const backgroundImage = useBackgroundImage("pages");
    
    useLayoutEffect(() => {
        document.title = "Quiz - Estude.My";
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
                    backgroundColor: "var(--bg-page)",                           // Cor de fundo alternativa
                    backgroundAttachment: "local", // Rola com o conteúdo, evitando oscilação
                }}
            >
                {/* ===========================
            Container relativo para z-index
            =========================== */}
                <div className="relative z-10">

                    {/* Topo / Barra de navegação */}
                    <Topo/>

                    {/* Área principal do curso */}
                    <main className="min-h-screen bg-transparent">
                        <Suspense
                            fallback={
                                <div className="flex items-center justify-center min-h-screen">
                                    <p className="text-[var(--text-secondary)]">Carregando quiz...</p>
                                </div>
                            }
                        >
                            <Questao/>
                        </Suspense>
                    </main>

                    {/* Rodapé */}
                    <Footer/>
                </div>
            </div>
        </>
    );
}
