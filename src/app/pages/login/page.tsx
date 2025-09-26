import Login from "@/app/components/Login"; // Componente de login do usuário

export default function Home() {
    return (
        <>
            {/* ===========================
          Container principal da página
          =========================== */}
            <div className="flex min-h-screen flex-col transition-all duration-300 justify-space-between bg-gray-50">

                {/* Componente de login */}
                <Login/>

            </div>
        </>
    );
}
