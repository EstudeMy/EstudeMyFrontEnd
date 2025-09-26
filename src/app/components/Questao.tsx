import {useState} from "react";
import React from 'react';
import {Button} from "react-bootstrap";

// Array com perguntas, alternativas e índice da resposta correta
const perguntas = [
    {
        id: 1,
        texto: "Na frase 'O menino brincava no parque ontem', qual é o sujeito?",
        alternativas: ["O menino", "brincava", "no parque", "ontem"],
        resposta: 0, // índice da alternativa correta
    },
    // ... restantes das perguntas
];

export default function Quiz() {
    // Estado para controlar índice da pergunta atual
    const [indiceAtual, setIndiceAtual] = useState(0);
    // Alternativa selecionada pelo usuário
    const [respostaSelecionada, setRespostaSelecionada] = useState<number | null>(null);
    // Estado que indica se o quiz foi finalizado
    const [finalizado, setFinalizado] = useState(false);
    // Pontuação atual do usuário
    const [pontuacao, setPontuacao] = useState(0);

    // Pergunta atual baseada no índice
    const perguntaAtual = perguntas[indiceAtual];

    // Função chamada ao clicar em uma alternativa
    interface Pergunta {
        id: number;
        texto: string;
        alternativas: string[];
        resposta: number;
    }

    interface QuizState {
        indiceAtual: number;
        respostaSelecionada: number | null;
        finalizado: boolean;
        pontuacao: number;
    }

    function selecionarResposta(indice: number): void {
        if (respostaSelecionada === null) { // só permite uma escolha
            setRespostaSelecionada(indice);
            if (indice === perguntaAtual.resposta) { // verifica acerto
                setPontuacao(pontuacao + 1);
            }
        }
    }

    // Avança para a próxima pergunta ou finaliza o quiz
    function proximaPergunta() {
        if (indiceAtual + 1 < perguntas.length) {
            setIndiceAtual(indiceAtual + 1);
            setRespostaSelecionada(null); // reseta seleção
        } else {
            setFinalizado(true); // finaliza quiz
        }
    }

    // Converte índice da alternativa para letra (A, B, C, D...)
    interface LetraFn {
        (i: number): string;
    }
    const letra: LetraFn = (i) => String.fromCharCode(65 + i);

    return (
        <main className="min-h-screen flex flex-col items-center justify-center ">

            {/* Quiz não finalizado */}
            {!finalizado ? (
                <section className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg border border-gray-200">

                    {/* Cabeçalho: título, número da pergunta e barra de progresso */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-2xl font-bold text-gray-800">
                                Quiz de Português
                            </h1>
                            <span className="text-sm text-gray-500">
                {indiceAtual + 1} de {perguntas.length}
              </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{
                                    width: `${((indiceAtual + 1) / perguntas.length) * 100}%`,
                                }}
                            ></div>
                        </div>
                    </div>

                    {/* Texto da pergunta */}
                    <h2 className="text-xl font-semibold mb-6 text-gray-800">
                        {perguntaAtual.texto}
                    </h2>

                    {/* Alternativas */}
                    <div className="flex flex-col gap-3 mb-8">
                        {perguntaAtual.alternativas.map((alt, i) => {
                            const isCorreta = i === perguntaAtual.resposta;
                            const isSelecionada = i === respostaSelecionada;

                            // Define cores conforme seleção e acerto
                            let cor =
                                "bg-gray-50 text-gray-800 border-gray-200 hover:bg-gray-100";

                            if (respostaSelecionada !== null) {
                                if (isSelecionada && isCorreta) {
                                    cor = "bg-green-500 text-white border-green-500 shadow-lg";
                                } else if (isSelecionada && !isCorreta) {
                                    cor = "bg-red-500 text-white border-red-500 shadow-lg";
                                } else if (isCorreta) {
                                    cor = "bg-green-500 text-white border-green-500 shadow-lg";
                                } else {
                                    cor = "bg-gray-100 text-gray-500 border-gray-200";
                                }
                            }

                            return (
                                <button
                                    key={i}
                                    onClick={() => selecionarResposta(i)}
                                    disabled={respostaSelecionada !== null} // bloqueia após seleção
                                    className={`w-full text-left px-6 py-4 rounded-lg border-2 transition-all duration-200 font-medium ${cor} ${
                                        respostaSelecionada === null
                                            ? "hover:shadow-md transform hover:-translate-y-0.5"
                                            : ""
                                    }`}
                                >
                                    <span className="font-bold">{letra(i)}:</span> {alt}
                                </button>
                            );
                        })}
                    </div>

                    {/* Rodapé com pontuação e botão próxima */}
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                            Pontuação: {pontuacao}/{perguntas.length}
                        </div>
                        <button
                            onClick={proximaPergunta}
                            disabled={respostaSelecionada === null}
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            {indiceAtual + 1 === perguntas.length ? "Finalizar" : "Próxima"}
                        </button>
                    </div>
                </section>
            ) : (
                // Quiz finalizado
                <section
                    className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg border border-gray-200 text-center">
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">
                            Quiz Finalizado! 🎉
                        </h2>
                        <div className="text-6xl font-bold text-blue-600 mb-2">
                            {pontuacao}/{perguntas.length}
                        </div>
                        <p className="text-gray-600 text-lg">
                            {pontuacao === perguntas.length
                                ? "Perfeito! Você acertou todas!"
                                : pontuacao >= perguntas.length * 0.7
                                    ? "Muito bem! Ótimo desempenho!"
                                    : pontuacao >= perguntas.length * 0.5
                                        ? "Bom trabalho! Continue praticando!"
                                        : "Continue estudando e tente novamente!"}
                        </p>
                    </div>

                    {/* Barra de progresso final */}
                    <div className="mb-6">
                        <div className="w-full bg-gray-200 rounded-full h-4">
                            <div
                                className="bg-gradient-to-r from-blue-500 to-green-500 h-4 rounded-full transition-all duration-1000"
                                style={{width: `${(pontuacao / perguntas.length) * 100}%`}}
                            ></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                            {Math.round((pontuacao / perguntas.length) * 100)}% de acertos
                        </p>
                    </div>

                    {/* Botão para voltar à trilha */}
                    <Button
                        href="/pages/trilha"
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        Voltar para trilha
                    </Button>
                </section>
            )}
        </main>
    );
}
