import React from 'react';
import CalendarPage from '@/app/components/Calendario'; // Componente do calendário
import Footer from '@/app/components/Footer';           // Componente do rodapé
import Topo from '@/app/components/Topo';               // Componente do topo/navegação

function App() {
    return (
        <>
            {/* ===========================
          Container principal da página
          =========================== */}
            <div
                className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
                style={{
                    backgroundImage: "url('/img/backgroundteste2.png')", // Imagem de fundo
                    backgroundColor: '#f3f4f6' // Cor de fundo alternativa
                }}
            >
                {/* ===========================
            Topo / Barra de navegação
            =========================== */}
                <Topo/>

                {/* ===========================
            Página do calendário
            =========================== */}
                <CalendarPage/>

                {/* ===========================
            Rodapé da página
            =========================== */}
                <Footer/>
            </div>
        </>
    );
}

export default App;
