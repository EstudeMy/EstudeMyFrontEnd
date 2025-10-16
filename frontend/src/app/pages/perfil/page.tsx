import Footer from "@/app/components/Footer";       // Componente do rodapé
        // Estilos específicos da página de perfil
import Topo from "@/app/components/Topo";         // Componente do topo/navegação
import Link from "next/link";                     // Componente para navegação entre páginas
import Image from "next/image";

export default function PerfilPage() {
  return (
    <>
      {/* ===========================
          Container principal da página
          =========================== */}
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: "url('/img/backgroundteste1.png')", // Imagem de fundo
          backgroundColor: "#f3f4f6", // Cor de fundo alternativa
        }}
      >
        {/* ===========================
            Container relativo para z-index
            =========================== */}
        <div className="relative z-10">
          {/* ===========================
              Estrutura principal da página
              =========================== */}
          <div className="flex flex-col min-h-screen ">
            {/* Topo / Barra de navegação */}
            <Topo />
            {/* Área de conteúdo principal */}
            <div className="pt-3 w-full max-w-6xl mx-auto px-4  bg-white mt-20">
              {/* Imagem do personagem */}
              <div className="text-3xl p-4 rounded-xl">
                <Image
                  className="mx-auto"
                  src="/img/personagem.png"
                  alt="Imagem do personagem Guerreiro"
                  width={90}
                  height={90}
                />
              </div>

              {/* Nome do personagem */}
              <div className="character">
                <p>Guerreiro</p>
              </div>

              {/* Botões de navegação do perfil */}
              <div className="buttons-container">
                <Link className="blue-btn" href={"/pages/dadosPessoais"}>
                  DADOS PESSOAIS
                </Link>
                <Link className="blue-btn" href={"/pages/progresso"}>
                  PROGRESSO
                </Link>
                <Link className="blue-btn" href={"/pages/meusCursos"}>
                  CURSOS FAVORITOS
                </Link>
                <Link className="blue-btn" href={"/pages/conquistas"}>
                  CONQUISTAS
                </Link>
              </div>
            </div>
            {/* Rodapé */}
            
          </div>
          
          <Footer />
        </div>
      </div>
    </>
  );
}


