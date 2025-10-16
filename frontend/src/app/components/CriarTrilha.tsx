"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // ATUALIZADO: Importar o useRouter
import { Lock, Unlock } from "lucide-react";

// Mock de fases
const fases = [
  { id: 1, nome: "Trilha 1", img: "/fases/fase1.jpg", paga: false },
  { id: 2, nome: "Trilha 2", img: "/fases/fase2.jpg", paga: true },
  { id: 3, nome: "Trilha 3", img: "/fases/fase3.jpg", paga: false },
];

// Lista de matérias
const materias = [
  "Matemática",
  "Português",
  "Ciências",
  "História",
  "Geografia",
  "Inglês",
  "Física",
  "Química",
  "Biologia",
];

export default function CriarTrilha() {
  const router = useRouter(); // ATUALIZADO: Instanciar o router

  const [trilha, setTrilha] = useState({
    titulo: "",
    descricao: "",
    dataCriacao: "",
    dataTermino: "",
    materia: "",
    dificuldade: "Facil",
    disponibilidade: "Privado",
    pagamento: "Gratuita",
    faseSelecionada: null as number | null,
  });

  const [erros, setErros] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setTrilha((prev) => ({ ...prev, [name]: value }));
  };

  const handleFaseClick = (id: number) => {
    setTrilha((prev) => ({ ...prev, faseSelecionada: id }));
  };

  const validarTrilha = () => {
    const newErros: { [key: string]: string } = {};
    if (!trilha.titulo.trim()) newErros.titulo = "Título é obrigatório";
    if (!trilha.descricao.trim())
      newErros.descricao = "Descrição é obrigatória";
    if (!trilha.materia) newErros.materia = "Matéria é obrigatória";
    if (trilha.faseSelecionada === null)
      newErros.faseSelecionada = "Selecione uma fase";

    setErros(newErros);
    return Object.keys(newErros).length === 0;
  };

  // ATUALIZADO: A função agora cuida da navegação
  const handleAvancar = () => {
    if (!validarTrilha()) return; // Se for inválido, para a execução aqui

    // Se for válido, salva os dados e navega para a próxima página
    localStorage.setItem("trilha", JSON.stringify(trilha));
    router.push("/app/pages/criarFase");
  };

  return (
    <div className="flex items-center justify-center p-4 m-auto">
      {/* ===============================
            Card principal da conta
            =============================== */}
      <div className="bg-white p-6 rounded shadow-md w-full mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          <span className="text-blue-600">Criar nova</span>{" "}
          <span className="text-pink-500">trilha</span>
        </h1>

        <div className="space-y-4">
          {/* Nome */}
          <div>
            <label className="block font-semibold mb-1">Nome da trilha</label>
            <input
              type="text"
              name="titulo"
              value={trilha.titulo}
              onChange={handleChange}
              placeholder="Título"
              className="w-full border rounded px-3 py-2"
            />
            {erros.titulo && (
              <p className="text-red-500 text-sm mt-1">{erros.titulo}</p>
            )}
          </div>

          {/* Descrição */}
          <div>
            <label className="block font-semibold mb-1">Descrição</label>
            <textarea
              name="descricao"
              value={trilha.descricao}
              onChange={handleChange}
              placeholder="Descrição"
              className="w-full border rounded px-3 py-2 h-28 resize-none"
            />
            {erros.descricao && (
              <p className="text-red-500 text-sm mt-1">{erros.descricao}</p>
            )}
          </div>

          {/* Datas */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block font-semibold mb-1">Data de início</label>
              <input
                type="date"
                name="dataCriacao"
                value={trilha.dataCriacao}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="flex-1">
              <label className="block font-semibold mb-1">
                Data de término (opcional)
              </label>
              <input
                type="date"
                name="dataTermino"
                value={trilha.dataTermino}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          {/* Matéria e dificuldade */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block font-semibold mb-1">Matéria</label>
              <select
                name="materia"
                value={trilha.materia}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="" disabled>
                  Selecione uma matéria
                </option>
                {materias.map((m, i) => (
                  <option key={i} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              {erros.materia && (
                <p className="text-red-500 text-sm mt-1">{erros.materia}</p>
              )}
            </div>
            <div className="flex-1">
              <label className="block font-semibold mb-1">Dificuldade</label>
              <select
                name="dificuldade"
                value={trilha.dificuldade}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="Facil">Fácil</option>
                <option value="Medio">Médio</option>
                <option value="Dificil">Difícil</option>
              </select>
            </div>
          </div>

          {/* Disponibilidade e pagamento */}
          <div className="flex flex-col sm:flex-row gap-20 justify-content-center">
            <div>
              <p className="font-semibold mb-1">Disponibilidade</p>
              <label className="mr-4">
                <input
                  type="radio"
                  name="disponibilidade"
                  value="Privado"
                  checked={trilha.disponibilidade === "Privado"}
                  onChange={handleChange}
                  className="mr-1"
                />{" "}
                Privado
              </label>
              <label>
                <input
                  type="radio"
                  name="disponibilidade"
                  value="Aberto"
                  checked={trilha.disponibilidade === "Aberto"}
                  onChange={handleChange}
                  className="mr-1"
                />{" "}
                Aberto
              </label>
            </div>
            <div>
              <p className="font-semibold mb-1">Paga ou gratuita</p>
              <label className="mr-4">
                <input
                  type="radio"
                  name="pagamento"
                  value="Paga"
                  checked={trilha.pagamento === "Paga"}
                  onChange={handleChange}
                  className="mr-1"
                />{" "}
                Paga
              </label>
              <label>
                <input
                  type="radio"
                  name="pagamento"
                  value="Gratuita"
                  checked={trilha.pagamento === "Gratuita"}
                  onChange={handleChange}
                  className="mr-1"
                />{" "}
                Gratuita
              </label>
            </div>
          </div>

          {/* Carrossel de fases */}
          <div>
            <p className="font-semibold mb-2">Fases da trilha</p>
            {erros.faseSelecionada && (
              <p className="text-red-500 text-sm mb-2">
                {erros.faseSelecionada}
              </p>
            )}
            <div className="flex overflow-x-auto gap-15 py-2 justify-content-center">
              {fases.map((fase) => {
                const isSelected = trilha.faseSelecionada === fase.id;
                return (
                  <div
                    key={fase.id}
                    onClick={() => handleFaseClick(fase.id)}
                    className={`flex-shrink-0 w-40 h-40 border-4 rounded-xl overflow-hidden relative cursor-pointer transition-all duration-200 transform
                                        ${
                                          isSelected
                                            ? "border-blue-600 shadow-lg scale-105"
                                            : "border-gray-300 hover:scale-105 hover:shadow-md"
                                        }`}
                  >
                    <img
                      src={fase.img}
                      alt={fase.nome}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/50 text-white text-xs px-2 py-1 rounded">
                      {fase.paga ? <Lock size={14} /> : <Unlock size={14} />}
                      <span>{fase.paga ? "Paga" : "Gratuita"}</span>
                    </div>
                    <div className="absolute bottom-0 w-full bg-black/40 text-white text-center py-1 text-sm">
                      {fase.nome}
                    </div>
                    {isSelected && (
                      <span className="absolute bottom-2 right-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-md">
                        Selecionado
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Botão Avançar */}
          {/* ATUALIZADO: Agora é só um botão, sem o Link */}
          <button
            type="button"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition mt-4"
            onClick={handleAvancar}
          >
            Avançar
          </button>
        </div>
      </div>
    </div>
  );
}
