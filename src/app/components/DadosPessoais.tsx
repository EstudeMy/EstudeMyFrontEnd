export default function DadosPessoais() {
    return (
        // Container principal do card de dados pessoais
        <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md mx-auto">

            {/* Título do card */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Dados Pessoais</h2>

            {/* Seção com os detalhes do usuário */}
            <div className="space-y-3 text-gray-700">
                <div>
                    <p className="font-semibold">Nome completo</p>
                    <p>João da Silva</p>
                </div>
                <div>
                    <p className="font-semibold">Email</p>
                    <p>joao.silva@email.com</p>
                </div>
                <div>
                    <p className="font-semibold">Data de nascimento</p>
                    <p>15/08/1990</p>
                </div>
                <div>
                    <p className="font-semibold">Telefone</p>
                    <p>(11) 91234-5678</p>
                </div>
                <div>
                    <p className="font-semibold">Endereço</p>
                    <p>Rua das Flores, 123 - São Paulo, SP</p>
                </div>
            </div>

            {/* Botão de ação para editar os dados */}
            <div className="mt-6 text-right">
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                    Editar
                </button>
            </div>
        </div>
    );
}
