import Form from "@/app/components/Forms";     // Componente de formulário
import Footer from "@/app/components/Footer";  // Componente do rodapé
import Topo from "@/app/components/Topo";      // Componente do topo/navegação

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

                    {/* ===========================
              Estrutura principal da página
              =========================== */}
                    <div className="flex min-h-screen flex-col transition-all duration-300 justify-space-between">

                        {/* Topo / Barra de navegação */}
                        <Topo/>

                        {/* Área de conteúdo principal com formulário */}
                        <div className="pt-3 w-full max-w-6xl mx-auto px-4">
                            <div className="text-3xl p-4 rounded-xl">
                                <Form/>
                            </div>
                        </div>

                        {/* Rodapé */}
                        <Footer/>
                    </div>
                </div>
            </div>
        </>
    );
}
