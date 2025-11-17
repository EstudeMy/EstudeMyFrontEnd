"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Função helper para obter o ícone do personagem
const getPersonagemIcon = (personagem?: string): string => {
  if (!personagem) return "";
  
  switch (personagem.toLowerCase()) {
    case "guerreiro":
      return "🛡️";
    case "mago":
      return "🧙";
    case "samurai":
      return "⚔️";
    default:
      return "";
  }
};

interface Usuario {
  position: number;
  name: string;
  initial: string;
  color?: string;
  totalFases?: number;
  totalAcertos?: number;
  totalPerguntas?: number;
  mediaAcertos?: number;
  _id?: string;
}

interface UsuarioNivel {
  position: number;
  name: string;
  initial: string;
  color?: string;
  personagem?: string;
  nivel?: number;
  xpTotal?: number;
  xpAtual?: number;
  xpNecessario?: number;
  _id?: string;
}

export default function Ranking() {
  const [rankingData, setRankingData] = useState<Usuario[]>([]);
  const [rankingNivel, setRankingNivel] = useState<UsuarioNivel[]>([]);
  const [loading, setLoading] = useState(true);
  const [usuarioPosicao, setUsuarioPosicao] = useState<number | null>(null);
  const [usuarioPosicaoNivel, setUsuarioPosicaoNivel] = useState<number | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();
    let isFetching = false;

    const carregarRanking = async () => {
      // Evitar múltiplas execuções simultâneas
      if (isFetching) return;
      isFetching = true;

      try {
        const token = localStorage.getItem("token");
        if (!token || !isMounted) {
          if (!token) router.push("/pages/login");
          return;
        }

        const API_URL =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

        // Verificar cache simples para ranking
        const cacheKey = 'rankingData';
        const cacheTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);
        const cachedData = cacheTimestamp ? localStorage.getItem(cacheKey) : null;
        
        // Cache válido por 10 segundos
        let data: Usuario[] = [];
        let dataNivel: UsuarioNivel[] = [];
        
        if (cachedData && cacheTimestamp) {
          const now = Date.now();
          const cacheAge = now - parseInt(cacheTimestamp, 10);
          if (cacheAge < 10000) {
            try {
              const parsed = JSON.parse(cachedData);
              data = parsed.ranking || [];
              dataNivel = parsed.rankingNivel || [];
            } catch (e) {
              // Cache inválido, continuar com fetch
            }
          }
        }

        // Se não tem cache válido, fazer fetch
        if (data.length === 0) {
          // Carregar ranking de acertos
          const res = await fetch(`${API_URL}/api/ranking`, {
            headers: { Authorization: `Bearer ${token}` },
            signal: abortController.signal,
          });

          if (!isMounted) return;

          if (!res.ok) {
            if (res.status === 401) {
              router.push("/pages/login");
              return;
            }
            throw new Error("Erro ao carregar ranking");
          }

          data = await res.json();

          // Carregar ranking de nível
          const resNivel = await fetch(`${API_URL}/api/ranking/nivel`, {
            headers: { Authorization: `Bearer ${token}` },
            signal: abortController.signal,
          });

          if (!isMounted) return;

          if (resNivel.ok) {
            dataNivel = await resNivel.json();
          }

          // Salvar no cache
          try {
            localStorage.setItem(cacheKey, JSON.stringify({ ranking: data, rankingNivel: dataNivel }));
            localStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString());
          } catch (e) {
            // Ignorar erros de localStorage
          }
        }

        // Buscar dados do usuário atual para encontrar sua posição
        try {
          const userRes = await fetch(`${API_URL}/api/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
            signal: abortController.signal,
          });
          
          if (!isMounted) return;

          if (userRes.ok) {
            const userData = await userRes.json();

            // Posição no ranking de acertos
            const posicao = data.findIndex(
              (u: Usuario) =>
                u._id &&
                userData._id &&
                u._id.toString() === userData._id.toString()
            );
            if (posicao !== -1 && isMounted) {
              setUsuarioPosicao(posicao + 1);
            }

            // Posição no ranking de nível
            const posicaoNivel = dataNivel.findIndex(
              (u: UsuarioNivel) =>
                u._id &&
                userData._id &&
                u._id.toString() === userData._id.toString()
            );
            if (posicaoNivel !== -1 && isMounted) {
              setUsuarioPosicaoNivel(posicaoNivel + 1);
            }
          }
        } catch (error) {
          if (error instanceof Error && error.name === 'AbortError') return;
          if (!isMounted) return;
          console.error("Erro ao buscar dados do usuário:", error);
        }

        if (!isMounted) return;

        const coloredData = data.map((user: Usuario) => {
          let color = "bg-gray-400";
          if (user.position === 1) color = "bg-yellow-400";
          else if (user.position === 2) color = "bg-slate-400";
          else if (user.position === 3) color = "bg-orange-400";

          return { ...user, color };
        });

        const coloredDataNivel = dataNivel.map((user: UsuarioNivel) => {
          let color = "bg-gray-400";
          if (user.position === 1) color = "bg-yellow-400";
          else if (user.position === 2) color = "bg-slate-400";
          else if (user.position === 3) color = "bg-orange-400";

          return { ...user, color };
        });

        if (isMounted) {
          setRankingData(coloredData);
          setRankingNivel(coloredDataNivel);
        }
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return;
        if (!isMounted) return;
        console.error("Erro ao carregar ranking:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
        isFetching = false;
      }
    };

    carregarRanking();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, []); // Removido router das dependências

  if (loading) {
    return (
      <div className="flex items-center justify-center bg-[var(--bg-card)] text-[var(--text-primary)] p-6 flex-col rounded-xl shadow-md max-w-lg border border-[var(--border-color)] transition-colors duration-300" style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
        <p>Carregando ranking...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-2 sm:p-4 gap-4 sm:gap-8 flex-row flex-wrap">
      <div className="bg-[var(--bg-card)] text-[var(--text-primary)] p-4 sm:p-6 flex flex-col items-center rounded-xl shadow-md flex-1 min-w-[300px] max-w-md shrink-0 border border-[var(--border-color)] transition-colors duration-300" style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
        <h1 className="text-lg sm:text-xl font-bold mb-4 text-center text-[var(--text-primary)]">Ranking de Acertos</h1>
        {/* Podium dos 3 primeiros */}
        <div className="flex items-end justify-center gap-2 sm:gap-4 mb-4 sm:mb-6 w-full overflow-x-auto pb-2">
          {/* 2º lugar - Prata */}
          {rankingData.slice(1, 2).map((user) => (
            <div key={user.position} className="flex flex-col items-center shrink-0">
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">🥈</div>
              <div
                className={`${user.color} w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-gray-800 font-bold mb-1 sm:mb-2 text-sm sm:text-base`}
              >
                {user.initial}
              </div>
              <div className="h-24 sm:h-24 w-12 sm:w-16 bg-slate-300 rounded-t-lg flex items-center justify-center flex-col p-1 sm:p-2">
                <p className="text-[10px]  sm:text-xs font-bold text-gray-800 truncate w-full text-center mt-0">
                  {user.name}
                </p>
                <p className="text-[14px] sm:text-sm text-gray-800">#{user.position}</p>
              </div>
            </div>
          ))}

          {/* 1º lugar - Ouro */}
          {rankingData.slice(0, 1).map((user) => (
            <div key={user.position} className="flex flex-col items-center shrink-0">
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">🥇</div>
              <div
                className={`${user.color} w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-gray-800 font-bold mb-1 sm:mb-2 text-sm sm:text-base`}
              >
                {user.initial}
              </div>
              <div className="h-28 sm:h-28 w-12 sm:w-16 bg-yellow-400 rounded-t-lg flex items-center justify-center flex-col p-1 sm:p-2">
                <p className="text-[10px] sm:text-xs font-bold text-gray-800 truncate w-full text-center mt-0">
                  {user.name}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-800">#{user.position}</p>
              </div>
            </div>
          ))}

          {/* 3º lugar - Bronze */}
          {rankingData.slice(2, 3).map((user) => (
            <div key={user.position} className="flex flex-col items-center shrink-0">
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">🥉</div>
              <div
                className={`${user.color} w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-gray-800 font-bold mb-1 sm:mb-2 text-sm sm:text-base`}
              >
                {user.initial}
              </div>
              <div className="h-20 sm:h-20 w-12 sm:w-16 bg-orange-400 rounded-t-lg flex items-center justify-center flex-col p-1 sm:p-2 gap-0.5 sm:gap-1">
                <p className="text-[10px] sm:text-xs font-bold text-gray-800 truncate w-full text-center mt-2">
                  {user.name}
                </p>
                <p className="text-[9px] sm:text-xs text-gray-800">#{user.position}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Informação da posição do usuário */}
        <h2 className="text-base sm:text-xl font-bold mb-2 sm:mb-4 text-center px-2 text-[var(--text-primary)]">
          {usuarioPosicao
            ? `Você está em ${usuarioPosicao}º lugar`
            : "Ranking Geral"}
        </h2>

        {usuarioPosicao && (
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-2 sm:mb-4 text-center px-2 break-words">
            Média de acertos:{" "}
            {rankingData[usuarioPosicao - 1]?.mediaAcertos?.toFixed(1) || 0}% |
            Total de acertos:{" "}
            {rankingData[usuarioPosicao - 1]?.totalAcertos || 0}
          </p>
        )}

        {/* Lista do ranking completo */}
        <div className="w-full space-y-2 max-h-96 overflow-y-auto px-1">
          {rankingData.map((user) => (
            <div
              key={user.position}
              className="flex items-center justify-between bg-[var(--bg-input)] p-2 sm:p-4 rounded-xl shadow-sm hover:shadow-md transition gap-2 border border-[var(--border-color)]"
              style={{ backgroundColor: 'var(--bg-input)', borderColor: 'var(--border-color)' }}
            >
              {/* Avatar e nome */}
              <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-gray-800 font-bold ${user.color} text-xs sm:text-sm shrink-0`}
                >
                  {user.initial}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm sm:text-base truncate text-[var(--text-primary)]">{user.name}</p>
                  <p className="text-xs sm:text-sm text-gray-400 break-words">
                    Média: {user.mediaAcertos?.toFixed(1) || 0}% | Acertos:{" "}
                    {user.totalAcertos || 0}
                  </p>
                </div>
              </div>

              {/* Posição no ranking */}
              <span className="text-base sm:text-lg font-bold shrink-0 text-[var(--text-primary)]"># {user.position}</span>
            </div>
          ))}
        </div>

        {/* Botão para continuar */}
      </div>

      {/* Ranking de Nível */}
      <div className="bg-[var(--bg-card)] text-[var(--text-primary)] p-4 sm:p-6 flex flex-col items-center rounded-xl shadow-md flex-1 min-w-[300px] max-w-md shrink-0 border border-[var(--border-color)] transition-colors duration-300" style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
        {/* Título */}
        <h1 className="text-lg sm:text-xl font-bold mb-4 text-center text-[var(--text-primary)]">Ranking de Nível</h1>

        {/* Podium dos 3 primeiros */}
        <div className="flex items-end justify-center gap-2 sm:gap-4 mb-4 sm:mb-6 w-full overflow-x-auto pb-2">
          {/* 2º lugar - Prata */}
          {rankingNivel.slice(1, 2).map((user) => (
            <div key={user.position} className="flex flex-col items-center shrink-0">
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">🥈</div>
              <div
                className={`${user.color} w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-gray-800 font-bold mb-1 sm:mb-2 text-sm sm:text-base`}
              >
                {user.initial}
              </div>
              <div className="h-24 sm:h-24 w-12 sm:w-16 bg-slate-300 rounded-t-lg flex items-center justify-center flex-col p-1 sm:p-2">
                <p className="text-[10px] sm:text-xs font-bold text-gray-800 truncate w-full text-center">
                  {user.name}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-800">#{user.position}</p>
              </div>
            </div>
          ))}

          {/* 1º lugar - Ouro */}
          {rankingNivel.slice(0, 1).map((user) => (
            <div key={user.position} className="flex flex-col items-center shrink-0">
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">🥇</div>
              <div
                className={`${user.color} w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-gray-800 font-bold mb-1 sm:mb-2 text-sm sm:text-base`}
              >
                {user.initial}
              </div>
              <div className="h-28 sm:h-28 w-12 sm:w-16 bg-yellow-400 rounded-t-lg flex items-center justify-center flex-col p-1 sm:p-2">
                <p className="text-[10px] sm:text-xs font-bold text-gray-800 truncate w-full text-center">
                  {user.name}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-800">#{user.position}</p>
              </div>
            </div>
          ))}

          {/* 3º lugar - Bronze */}
          {rankingNivel.slice(2, 3).map((user) => (
            <div key={user.position} className="flex flex-col items-center shrink-0">
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">🥉</div>
              <div
                className={`${user.color} w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-gray-800 font-bold mb-1 sm:mb-2 text-sm sm:text-base`}
              >
                {user.initial}
              </div>
              <div className="h-20 sm:h-20 w-12 sm:w-16 bg-orange-400 rounded-t-lg flex items-center justify-center flex-col p-1 sm:p-2 gap-0.5 sm:gap-1">
                <p className="text-[10px] sm:text-xs font-bold text-gray-800 truncate w-full text-center mt-2">
                  {user.name}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-800">#{user.position}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-base sm:text-xl font-bold mb-2 sm:mb-4 text-center px-2">
          {usuarioPosicaoNivel
            ? `Você está em ${usuarioPosicaoNivel}º lugar`
            : "Ranking de Nível"}
        </h2>

        {usuarioPosicaoNivel && (
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-2 sm:mb-4 text-center px-2 break-words">
            Nível: {rankingNivel[usuarioPosicaoNivel - 1]?.nivel || 1} | XP
            Total: {rankingNivel[usuarioPosicaoNivel - 1]?.xpTotal || 0}
          </p>
        )}

        {/* Lista do ranking de nível */}
        <div className="w-full space-y-2 max-h-96 overflow-y-auto px-1">
          {rankingNivel.map((user) => (
            <div
              key={user.position}
              className="flex items-center justify-between bg-[var(--bg-input)] p-2 sm:p-4 rounded-xl shadow-sm hover:shadow-md transition gap-2 border border-[var(--border-color)] transition-colors duration-300"
              style={{ backgroundColor: 'var(--bg-input)', borderColor: 'var(--border-color)' }}
            >
              {/* Avatar e informações */}
              <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-gray-800 font-bold ${user.color} text-xs sm:text-sm shrink-0`}
                >
                  {user.initial}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm sm:text-base truncate text-[var(--text-primary)]">
                    {user.name}
                  </p>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] truncate leading-tight mt-0.5">
                    {user.personagem && (
                      <span className="inline-flex items-center gap-1">
                        <span>{getPersonagemIcon(user.personagem)}</span>
                        <span>{user.personagem}</span>
                        <span>|</span>
                      </span>
                    )}
                    {user.personagem && " "}
                    Nível: {user.nivel || 1}
                  </p>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] truncate leading-tight mt-0">
                    XP: {user.xpTotal || 0}
                  </p>
                </div>
              </div>

              {/* Posição no ranking */}
              <span className="text-base sm:text-lg font-bold shrink-0 text-[var(--text-primary)]">#{user.position}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
