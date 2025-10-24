import React from 'react';

// ===============================
// Componente: ConsultAi
// ===============================
const ConsultAi = () => {
    return (
        <div>
            {/* ===============================
          Container principal da página
          =============================== */}
            <main className="min-h-auto items-center justify-center bg-gray-50 p-6 mt-4 mx-auto w-2xl">

                {/* ===============================
            Seção: Quem Somos
            =============================== */}
                <section id="sobre" className="mb-15 ">
                    <h2 className="text-xl font-semibold">Quem Somos</h2>
                    <p className="mx-20">
                        A ConsultAi é uma startup de tecnologia criada na Faculdade de Tecnologia (FATEC).
                        Nosso objetivo é desenvolver soluções de software inovadoras voltadas para beneficiar
                        a comunidade, utilizando tecnologia como ferramenta para transformar vidas.
                    </p>
                </section>

                {/* ===============================
            Seção: Missão, Visão e Valores
            =============================== */}
                <section id="missao" className="mb-15">
                    <h2 className="text-xl font-semibold">Missão, Visão e Valores</h2>
                    <p className="mx-20">
                        <strong>Missão:</strong> Facilitar o acesso a soluções tecnológicas que promovam impacto social
                        positivo.
                    </p>
                    <p className="mx-20">
                        <strong>Visão:</strong> Ser reconhecida como uma referência em tecnologia para a comunidade.
                    </p>
                    <p className="mx-20">
                        <strong>Valores:</strong> Inovação, Ética, Colaboração e Compromisso com o Social.
                    </p>
                </section>

            </main>
        </div>
    );
}

export default ConsultAi;
