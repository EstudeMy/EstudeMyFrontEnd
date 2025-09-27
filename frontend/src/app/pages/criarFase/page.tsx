"use client";

import { useState, useEffect } from "react";
import { Plus, Save } from "lucide-react";

interface Pergunta {
  id: number;
  enunciado: string;
  alternativas: string[];
  correta: number;
}

export default function CriarFase() {
  const [trilha, setTrilha] = useState<any>(null);
  const [perguntas, setPerguntas] = useState<Pergunta[]>([]);

  // Carrega os dados da trilha do localStorage
  useEffect(() => {
    const dados = localStorage.getItem("trilha");
    if (dados) {
      const trilhaObj = JSON.parse(dados);
      setTrilha(trilhaObj);
    }
  }, []);

  const handleAddPergunta = () => {
    setPerguntas((prev) => [
      ...prev,
      {
        id: Date.now(),
        enunciado: "",
        alternativas: ["", "", "", ""],
        correta: 0,
      },
    ]);
  };

  const handleChangePergunta = (
    perguntaId: number,
    campo: string,
    valor: string | number,
    altIndex?: number
  ) => {
    setPerguntas((prev) =>
      prev.map((p) =>
        p.id === perguntaId
          ? {
              ...p,
              [campo]:
                campo === "alternativas" && typeof altIndex === "number"
                  ? p.alternativas.map((alt, i) =>
                      i === altIndex ? (valor as string) : alt
                    )
                  : valor,
            }
          : p
      )
    );
  };

  const salvarPerguntas = () => {
    if (!trilha) return;

    const trilhaAtualizada = {
      ...trilha,
      perguntas,
    };

    localStorage.setItem("trilha", JSON.stringify(trilhaAtualizada));
    alert("Perguntas salvas com sucesso!");
  };

  if (!trilha) return <p>Carregando dados da trilha...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Criar Fase da Trilha: {trilha.titulo}</h1>
      <p className="mb-6">{trilha.descricao}</p>

      <button
        className="mb-4 flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleAddPergunta}
      >
        <Plus size={16} /> Adicionar Pergunta
      </button>

      {perguntas.length === 0 && <p>Nenhuma pergunta criada ainda.</p>}

      {perguntas.map((p) => (
        <div key={p.id} className="mb-4 p-4 border rounded bg-gray-50">
          <input
            type="text"
            placeholder="Enunciado"
            value={p.enunciado}
            onChange={(e) => handleChangePergunta(p.id, "enunciado", e.target.value)}
            className="w-full border rounded p-2 mb-2"
          />

          {p.alternativas.map((alt, i) => (
            <div key={i} className="flex items-center gap-2 mb-1">
              <input
                type="radio"
                name={`correta-${p.id}`}
                checked={p.correta === i}
                onChange={() => handleChangePergunta(p.id, "correta", i)}
              />
              <input
                type="text"
                placeholder={`Alternativa ${i + 1}`}
                value={alt}
                onChange={(e) => handleChangePergunta(p.id, "alternativas", e.target.value, i)}
                className="flex-1 border rounded p-1"
              />
            </div>
          ))}
        </div>
      ))}

      {perguntas.length > 0 && (
        <button
          className="mt-4 flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={salvarPerguntas}
        >
          <Save size={16} /> Salvar Perguntas
        </button>
      )}
    </div>
  );
}
