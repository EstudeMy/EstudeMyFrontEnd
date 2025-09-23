import React from "react";

// Componente simples que renderiza o logo da aplicação
export default function Logo() {
    return (
        <>
            <div className="mb-4">
                {/* Imagem do logo centralizada com altura definida */}
                <img
                    src="/EstudeMyLogo.svg" // Caminho do arquivo do logo
                    alt="Logo Estude.My"    // Texto alternativo para acessibilidade
                    className="m-auto h-12 mt-4 " // Centraliza horizontalmente e define altura
                />
            </div>
        </>
    );
}
