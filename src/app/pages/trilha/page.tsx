import Footer from "@/app/components/Footer"; // Componente do rodapé da página
import Topo from "@/app/components/Topo";     // Componente do topo / barra de navegação
import Trilhas from "@/app/components/Triha"; // Componente que exibe as trilhas/cursos
import game from "@/app/components/game/RPGQuizGame";

export default function Home() {
    return (
        <>
            {/* ===========================
          Container principal da página
          =========================== */}
            <div
                className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
                style={{
                    backgroundImage: "url('/img/backgroundteste1.png')", // Imagem de fundo
                    backgroundColor: '#f3f4f6'                           // Cor de fundo alternativa
                }}
            >
                {/* ===========================
            Container relativo para controle de z-index
            =========================== */}
                <div className="relative z-10">

                    {/* Estrutura principal em coluna com espaçamento */}
                    <div className="flex min-h-screen flex-col transition-all duration-300 justify-space-between">

                        {/* Topo / barra de navegação */}
                        <Topo/>

                        {/* Componente que exibe as trilhas/cursos */}
                        <Trilhas/>

                        {/* Rodapé */}
                        <Footer/>
                    </div>
                </div>
            </div>
        </>
    );
}
