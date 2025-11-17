"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// Rotas públicas que não precisam de autenticação
const PUBLIC_ROUTES = ["/", "/pages/login", "/pages/cadastro"];

// Rotas que não precisam de perfil criado (além das públicas)
const ROTAS_SEM_PERFIL = ["/pages/criarPerfil"];

// Rotas restritas para PROFESSOR e ADMINISTRADOR (ALUNO não pode acessar)
const ROTAS_PROFESSOR = [
  "/pages/gerenciarTrilha",
  "/pages/gerenciarFases",
  "/pages/criarFase",
  "/pages/gerenciarPerguntas",
];

// Cache simples para evitar requisições duplicadas
const authCache: {
  token: string | null;
  isValid: boolean | null;
  perfilCriado: boolean | null;
  tipoUsuario: string | null;
  timestamp: number;
  perfilCriadoTimestamp: number; // Timestamp da última criação de perfil conhecida
} = {
  token: null,
  isValid: null,
  perfilCriado: null,
  tipoUsuario: null,
  timestamp: 0,
  perfilCriadoTimestamp: 0,
};

// Cache válido por 30 segundos
const CACHE_DURATION = 30 * 1000;

// Função helper para verificar se uma rota é pública
const isPublicRoute = (pathname: string | null): boolean => {
  if (!pathname) return false;
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
};

// Função helper para verificar se uma rota não precisa de perfil criado
const isRotaSemPerfil = (pathname: string | null): boolean => {
  if (!pathname) return false;
  return ROTAS_SEM_PERFIL.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
};

// Função helper para verificar se uma rota é restrita a professores
const isRotaProfessor = (pathname: string | null): boolean => {
  if (!pathname) return false;
  return ROTAS_PROFESSOR.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const checkingRef = useRef(false); // Evita requisições simultâneas

  // Verificar se é rota pública ANTES de definir estado inicial
  const publicRoute = isPublicRoute(pathname);
  const rotaSemPerfil = isRotaSemPerfil(pathname);
  const rotaProfessor = isRotaProfessor(pathname);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
    publicRoute ? true : null // Se for pública, já começa como true
  );
  const [perfilVerificado, setPerfilVerificado] = useState<boolean | null>(
    publicRoute || rotaSemPerfil ? true : null // Se for pública ou não precisa de perfil, já começa como true
  );
  const [tipoUsuarioVerificado, setTipoUsuarioVerificado] = useState<
    boolean | null
  >(
    publicRoute || rotaSemPerfil ? true : null // Se for pública ou não precisa de perfil, já começa como true
  );

  useEffect(() => {
    // Verificar se pathname está definido
    if (!pathname) {
      return;
    }

    // Verificar se é rota pública DENTRO do useEffect
    const isPublic = isPublicRoute(pathname);

    // Se for rota pública, não fazer nada e garantir que está autenticado
    if (isPublic) {
      setIsAuthenticated(true);
      return;
    }

    const checkAuth = async () => {
      // Evitar requisições simultâneas
      if (checkingRef.current) {
        return;
      }

      // Para rotas protegidas, verificar token
      const token = localStorage.getItem("token");

      if (!token) {
        // Sem token, redirecionar para login SEM fazer requisição
        authCache.token = null;
        authCache.isValid = false;
        router.push("/pages/login");
        setIsAuthenticated(false);
        return;
      }

      // Verificar cache antes de fazer requisição
      const now = Date.now();

      // Verificar se o perfil foi criado recentemente (invalidar cache se necessário)
      const perfilCriadoTimestamp = localStorage.getItem(
        "perfilCriadoTimestamp"
      );
      const perfilCriadoTimestampNum = perfilCriadoTimestamp
        ? parseInt(perfilCriadoTimestamp, 10)
        : 0;
      const perfilFoiCriadoRecentemente =
        perfilCriadoTimestampNum > authCache.perfilCriadoTimestamp;

      const isCacheValid =
        authCache.token === token &&
        authCache.isValid === true &&
        authCache.perfilCriado !== null &&
        authCache.tipoUsuario !== null &&
        now - authCache.timestamp < CACHE_DURATION &&
        !perfilFoiCriadoRecentemente; // Invalidar cache se perfil foi criado recentemente

      if (isCacheValid) {
        // Cache válido, usar sem fazer requisição
        setIsAuthenticated(true);

        // Verificar se precisa redirecionar para criar perfil
        const precisaPerfil = !rotaSemPerfil && !authCache.perfilCriado;
        if (precisaPerfil) {
          router.push("/pages/criarPerfil");
          setPerfilVerificado(false);
          setTipoUsuarioVerificado(false);
          return;
        }

        // Verificar se é rota de professor e se o usuário é aluno (professor e administrador podem acessar)
        if (rotaProfessor && authCache.tipoUsuario === "ALUNO") {
          router.push("/pages/home");
          setPerfilVerificado(true);
          setTipoUsuarioVerificado(false);
          return;
        }

        setPerfilVerificado(true);
        setTipoUsuarioVerificado(true);
        return;
      }

      // Se o perfil foi criado recentemente, atualizar o timestamp no cache
      if (perfilFoiCriadoRecentemente) {
        authCache.perfilCriadoTimestamp = perfilCriadoTimestampNum;
      }

      checkingRef.current = true;

      // Só fazer requisição se realmente for uma rota protegida E tiver token
      try {
        const API_URL =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

        // Verificar autenticação primeiro
        const verifyRes = await fetch(`${API_URL}/api/users/verify`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!verifyRes.ok) {
          // Token inválido ou expirado
          if (verifyRes.status === 401) {
            localStorage.removeItem("token");
            authCache.token = null;
            authCache.isValid = false;
            authCache.perfilCriado = null;
            authCache.tipoUsuario = null;
            authCache.timestamp = now;
            router.push("/pages/login");
            setIsAuthenticated(false);
            setPerfilVerificado(false);
            setTipoUsuarioVerificado(false);
            checkingRef.current = false;
            return;
          }
        }

        // Token válido - agora verificar se o perfil foi criado
        setIsAuthenticated(true);

        // Se não precisa verificar perfil (página de criar perfil), permitir acesso
        if (rotaSemPerfil) {
          authCache.token = token;
          authCache.isValid = true;
          authCache.perfilCriado = true; // Não importa, não vai usar
          authCache.timestamp = now;
          setPerfilVerificado(true);
          setTipoUsuarioVerificado(true);
          checkingRef.current = false;
          return;
        }

        // Buscar dados do usuário para verificar se o perfil foi criado e tipo de usuário
        const userRes = await fetch(`${API_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!userRes.ok) {
          console.error("Erro ao buscar dados do usuário:", userRes.status);
          checkingRef.current = false;
          return;
        }

        const userData = await userRes.json();

        // Verificar se o perfil foi criado (personagem e username não vazios)
        const perfilFoiCriado =
          userData.personagem &&
          userData.username &&
          userData.personagem.trim() !== "" &&
          userData.username.trim() !== "";

        // Obter tipo de usuário
        const tipoUsuario = userData.tipoUsuario || null;

        // Atualizar cache
        const perfilCriadoTimestamp = localStorage.getItem(
          "perfilCriadoTimestamp"
        );
        const perfilCriadoTimestampNum = perfilCriadoTimestamp
          ? parseInt(perfilCriadoTimestamp, 10)
          : 0;

        authCache.token = token;
        authCache.isValid = true;
        authCache.perfilCriado = perfilFoiCriado;
        authCache.tipoUsuario = tipoUsuario;
        authCache.timestamp = now;
        authCache.perfilCriadoTimestamp = perfilCriadoTimestampNum;

        // Se o perfil não foi criado, redirecionar para criar perfil
        if (!perfilFoiCriado) {
          router.push("/pages/criarPerfil");
          setPerfilVerificado(false);
          setTipoUsuarioVerificado(false);
          checkingRef.current = false;
          return;
        }

        // Verificar se é rota de professor e se o usuário é aluno (professor e administrador podem acessar)
        if (rotaProfessor && tipoUsuario === "ALUNO") {
          router.push("/pages/home");
          setPerfilVerificado(true);
          setTipoUsuarioVerificado(false);
          checkingRef.current = false;
          return;
        }

        // Perfil criado e tipo de usuário verificado, permitir acesso
        setPerfilVerificado(true);
        setTipoUsuarioVerificado(true);
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        localStorage.removeItem("token");
        authCache.token = null;
        authCache.isValid = false;
        authCache.perfilCriado = null;
        authCache.tipoUsuario = null;
        authCache.timestamp = Date.now();
        router.push("/pages/login");
        setIsAuthenticated(false);
        setPerfilVerificado(false);
        setTipoUsuarioVerificado(false);
      } finally {
        checkingRef.current = false;
      }
    };

    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]); // router não precisa estar nas dependências

  // Mostrar loading enquanto verifica autenticação
  if (isAuthenticated === null) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center bg-[var(--bg-page)] transition-colors duration-300" 
        style={{ 
          backgroundColor: 'var(--bg-page)', 
          minHeight: '100vh',
          width: '100%',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      >
        <div className="text-[var(--text-secondary)]">Verificando autenticação...</div>
      </div>
    );
  }

  // Se não está autenticado e não é rota pública, não renderizar (já redirecionou)
  if (!isAuthenticated && !publicRoute) {
    return null;
  }

  // Mostrar loading enquanto verifica perfil (apenas para rotas que precisam de perfil)
  if (!publicRoute && !rotaSemPerfil && perfilVerificado === null) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center bg-[var(--bg-page)] transition-colors duration-300" 
        style={{ 
          backgroundColor: 'var(--bg-page)', 
          minHeight: '100vh',
          width: '100%',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      >
        <div className="text-[var(--text-secondary)]">Verificando perfil...</div>
      </div>
    );
  }

  // Se o perfil não foi verificado e não é rota pública nem rota sem perfil, não renderizar (já redirecionou)
  if (!publicRoute && !rotaSemPerfil && perfilVerificado === false) {
    return null;
  }

  // Mostrar loading enquanto verifica tipo de usuário (apenas para rotas de professor)
  if (
    !publicRoute &&
    !rotaSemPerfil &&
    rotaProfessor &&
    tipoUsuarioVerificado === null
  ) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center bg-[var(--bg-page)] transition-colors duration-300" 
        style={{ 
          backgroundColor: 'var(--bg-page)', 
          minHeight: '100vh',
          width: '100%',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      >
        <div className="text-[var(--text-secondary)]">Verificando permissões...</div>
      </div>
    );
  }

  // Se o tipo de usuário não foi verificado e é rota de professor, não renderizar (já redirecionou)
  if (
    !publicRoute &&
    !rotaSemPerfil &&
    rotaProfessor &&
    tipoUsuarioVerificado === false
  ) {
    return null;
  }

  return <>{children}</>;
}
