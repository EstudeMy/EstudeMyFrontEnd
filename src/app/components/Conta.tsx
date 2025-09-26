"use client";
import React from "react";

// ===============================
// Componente: MinhaConta
// ===============================
export default function MinhaConta() {
    // Dados do usuário (exemplo estático)
    const user = {
        nome: "João Silva",
        email: "joao.silva@example.com",
        telefone: "(11) 98765-4321",
    };

    // Funções de ação para os botões
    const handleEditar = () => alert("Editar informações");
    const handleAlterarSenha = () => alert("Alterar senha");
    const handleExcluirConta = () => alert("Conta excluída");
    const handleSair = () => alert("Você saiu da conta");

    return (
        <div className="p-4">
            {/* ===============================
          Card principal da conta
          =============================== */}
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md mx-auto">

                {/* ===============================
            Cabeçalho com título e botão Sair
            =============================== */}
                <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold">Minha Conta</h2>
                    <button
                        onClick={handleSair}
                        className="bg-red-500 text-white px-4 py-1 mt-2 rounded hover:bg-red-600"
                    >
                        Sair
                    </button>
                </div>

                {/* ===============================
            Informações Pessoais
            =============================== */}
                <div className="mb-6">
                    <h3 className="font-semibold text-lg border-b pb-1 mb-2">
                        Informações Pessoais
                    </h3>
                    <div className="flex justify-between mb-1">
                        <span className="font-medium">Nome:</span>
                        <span>{user.nome}</span>
                    </div>
                    <div className="flex justify-between mb-1">
                        <span className="font-medium">E-mail:</span>
                        <span>{user.email}</span>
                    </div>
                    <div className="flex justify-between mb-3">
                        <span className="font-medium">Telefone:</span>
                        <span>{user.telefone}</span>
                    </div>

                    {/* Botões de ação */}
                    <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t">
                        <button
                            onClick={handleEditar}
                            className="bg-blue-600 text-white px-6 py-2 rounded transition hover:bg-blue-700 flex-1"
                        >
                            Editar Informações
                        </button>
                        <button
                            className="bg-blue-600 text-white px-6 py-2 rounded transition hover:bg-blue-700 flex-1"
                        >
                            Criar Trilha
                        </button>
                    </div>
                </div>

                {/* ===============================
            Configurações
            =============================== */}
                <div>
                    <h3 className="font-semibold text-lg border-b pb-1 mb-2">
                        Configurações
                    </h3>
                    <button
                        onClick={handleAlterarSenha}
                        className="bg-sky-400 text-white w-full py-2 rounded mb-2 hover:bg-sky-500"
                    >
                        Alterar Senha
                    </button>
                    <button
                        onClick={handleExcluirConta}
                        className="bg-sky-400 text-white w-full py-2 rounded hover:bg-sky-500"
                    >
                        Excluir Conta
                    </button>
                </div>
            </div>
        </div>
    );
}
