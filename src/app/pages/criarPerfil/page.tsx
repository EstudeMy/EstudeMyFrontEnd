"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTheme } from "@/app/contexts/ThemeContext";
import ThemeToggle from "@/app/components/ThemeToggle";
import { useLanguage } from "@/app/contexts/LanguageContext";

export default function CriarPerfil() {
  const router = useRouter();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [personagem, setPersonagem] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState<string | null>(null); // Apenas URLs das fotos pré-definidas
  const [preview, setPreview] = useState<string | null>(null);
  const [mensagem, setMensagem] = useState("");
  const [verificando, setVerificando] = useState(true);

  // Determinar a imagem de fundo baseada no tema (mesmo do login)
  const backgroundImage = theme === "dark" 
    ? "/img/backgrounds/background_login_darkmode.jpg"
    : "/img/backgrounds/background_login_lightmode.png";

  const personagens = [
    { nome: "Guerreiro", imagem: "/img/guerreiro.png" },
    { nome: "Mago", imagem: "/img/mago.png" },
    { nome: "Samurai", imagem: "/img/samurai.png" },
  ];

  const fotosPreDefinidas = [
    "/img/guerreiro.png",
    "/img/mago.png",
    "/img/samurai.png",
  ];

  const handlePreDefinidaClick = (url: string) => {
    setFotoPerfil(url);
    setPreview(url);
  };

  // Verifica se o perfil já foi criado ao carregar a página
  useEffect(() => {
    const verificarPerfil = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/pages/login");
          return;
        }

        const API_URL =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const resposta = await fetch(`${API_URL}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (resposta.ok) {
          const dadosUsuario = await resposta.json();

          // Se o perfil já foi criado (tem personagem e username), redireciona para home
          if (
            dadosUsuario.personagem &&
            dadosUsuario.username &&
            dadosUsuario.personagem.trim() !== "" &&
            dadosUsuario.username.trim() !== ""
          ) {
            router.push("/pages/home");
            return;
          }
        }
      } catch (error) {
        console.error("Erro ao verificar perfil:", error);
      } finally {
        setVerificando(false);
      }
    };

    verificarPerfil();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!personagem || !username || !fotoPerfil) {
      setMensagem(`⚠️ ${t("profile.required")}`);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      console.log("🔑 Token enviado:", token);

      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const resposta = await fetch(`${API_URL}/api/auth/criarPerfil`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          personagem,
          username,
          fotoPerfil,
        }),
      });

      const data = await resposta.json();
      console.log("Resposta do servidor:", data);
      console.log("Status:", resposta.status);

      if (resposta.ok) {
        setMensagem(`✅ ${t("profile.success")}`);
        // Invalidar cache de perfil para forçar nova verificação
        localStorage.setItem("perfilCriadoTimestamp", Date.now().toString());
        setTimeout(() => {
          router.push("/pages/home");
        }, 1500);
      } else {
        // Se o perfil já foi criado (erro 409), redireciona para home
        if (resposta.status === 409 && data.perfilCriado) {
          setMensagem("ℹ️ Seu perfil já foi criado. Redirecionando...");
          // Invalidar cache de perfil para forçar nova verificação
          localStorage.setItem("perfilCriadoTimestamp", Date.now().toString());
          setTimeout(() => {
            router.push("/pages/home");
          }, 1500);
        } else {
          // Mostrar mensagem de erro mais detalhada
          const mensagemErro = data.message || data.error || t("profile.error");
          console.error("Erro ao criar perfil:", mensagemErro);
          setMensagem(`❌ ${mensagemErro}`);
        }
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
      setMensagem(`❌ ${t("profile.connectionError")}`);
    }
  };

  // Mostrar loading enquanto verifica o perfil
  if (verificando) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center relative overflow-hidden"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      >
        <ThemeToggle />
        <div className="bg-[var(--bg-card)] bg-opacity-90 p-8 rounded-2xl shadow-lg text-center border border-[var(--border-color)] transition-colors duration-300" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
          <p className="text-[var(--text-primary)]">{t("profile.checking")}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <ThemeToggle />
      <div className="bg-[var(--bg-card)] bg-opacity-90 p-8 rounded-2xl shadow-lg w-full max-w-3xl text-center border border-[var(--border-color)] transition-colors duration-300" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-6">
          🎮 {t("profile.create")}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Escolha de personagem */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-[var(--text-primary)]">
              {t("profile.chooseCharacter")}
            </h2>
            <div className="flex justify-center gap-8">
              {personagens.map((p) => (
                <div
                  key={p.nome}
                  onClick={() => setPersonagem(p.nome)}
                  className={`cursor-pointer rounded-xl border-4 transition-transform transform hover:scale-105 ${
                    personagem === p.nome
                      ? "border-blue-600"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={p.imagem}
                    alt={p.nome}
                    width={100}
                    height={100}
                    className="rounded-xl"
                  />
                  <p
                    className={`mt-2 font-medium ${
                      personagem === p.nome ? "text-blue-600" : "text-[var(--text-primary)]"
                    }`}
                  >
                    {p.nome}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="block text-left text-[var(--text-primary)] font-medium mb-1">
              {t("profile.username")}
            </label>
            <input
              type="text"
              placeholder={t("profile.usernamePlaceholder")}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-[var(--border-color)] rounded-lg px-4 py-2 bg-[var(--bg-input)] text-[var(--text-primary)] focus:ring-2 focus:ring-blue-400 focus:outline-none transition-colors duration-300"
              style={{ backgroundColor: 'var(--bg-input)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
            />
          </div>

          {/* Escolha de foto */}
          <div>
            <label className="block text-left text-[var(--text-primary)] font-medium mb-1">
              {t("profile.choosePhoto")}
            </label>
            <div className="flex gap-4 mb-2 justify-center">
              {fotosPreDefinidas.map((url) => (
                <Image
                  key={url}
                  src={url}
                  alt="pré-definida"
                  width={60}
                  height={60}
                  className={`cursor-pointer rounded-full border-2 transition-colors duration-300 ${
                    fotoPerfil === url ? "border-blue-600" : "border-[var(--border-color)]"
                  }`}
                  onClick={() => handlePreDefinidaClick(url)}
                  unoptimized
                />
              ))}
            </div>

            {preview && (
              <div className="mt-4 flex justify-center">
                <Image
                  src={preview}
                  alt="Prévia"
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-blue-400"
                  unoptimized
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
          >
            {t("profile.createButton")}
          </button>

          {mensagem && (
            <p className="text-center text-sm font-medium mt-3 text-[var(--text-primary)]">
              {mensagem}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
