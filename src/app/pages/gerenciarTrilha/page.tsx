"use client";

import React, { useEffect, useLayoutEffect } from "react";
import CriarTrilha from "@/app/components/CriarTrilha"; // Componente para criar trilhas
import Footer from "@/app/components/Footer";           // Componente do rodapé
import Topo from "@/app/components/Topo";               // Componente do topo/navegação
import { useBackgroundImage } from "@/app/hooks/useBackgroundImage";

export default function CriarTrilhaPage() {
    const backgroundImage = useBackgroundImage("pages");
    
    useLayoutEffect(() => {
        document.title = "Gerenciar Trilha - Estude.My";
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
                    backgroundColor: 'var(--bg-page)',                           // Cor de fundo alternativa
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
                        <Topo/>

                        {/* Área de conteúdo principal: Criar trilha */}
                        <div className="flex flex-6 justify-center items-center mx-auto">
                            <CriarTrilha/>
                        </div>

                        {/* Rodapé */}
                        <Footer/>
                    </div>
                </div>
            </div>
        </>
    );
}
