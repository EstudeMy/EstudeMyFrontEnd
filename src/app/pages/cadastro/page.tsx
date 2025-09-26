import Cadastrar from "@/app/components/Cadastro"; // Importa o componente de cadastro

export default function Home() {
    return (
        <>
            {/* ===========================
          Container principal da página
          =========================== */}
            <div className="flex min-h-screen flex-col transition-all duration-300 justify-space-between bg-gray-50">

                {/* Componente de cadastro */}
                <Cadastrar/>
            </div>
        </>
    );
}
