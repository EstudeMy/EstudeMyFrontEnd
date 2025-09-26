import React from "react";
import {Trophy} from "lucide-react"; // Ícone de troféu usado para destacar os 3 primeiros

// Dados de ranking fictícios
const rankingData = [
    {position: 1, name: "João Victor", xp: 518, color: "bg-yellow-400", initial: "J"},
    {position: 2, name: "Beatriz", xp: 396, color: "bg-purple-400", initial: "B"},
    {position: 3, name: "Gabriel", xp: 367, color: "bg-orange-400", initial: "G"},
    {position: 4, name: "Wallacy", xp: 228, color: "bg-red-400", initial: "W"},
    {position: 5, name: "Milone", xp: 228, color: "bg-red-400", initial: "M"},
];

export default function Ranking() {
    return (
        <div className="min-h-screen bg-white text-white p-4 flex flex-col items-center">
            {/* Podium dos 3 primeiros lugares */}
            <div className="flex items-end justify-center gap-4 mb-6">

                {/* 2º lugar */}
                <div className="flex flex-col items-center">
                    <Trophy className="text-slate-300 w-10 h-10"/> {/* Troféu prata */}
                    <div className="h-20 w-10 bg-slate-300 rounded-t-lg"/>
                    {/* Coluna do podium */}
                </div>

                {/* 1º lugar */}
                <div className="flex flex-col items-center">
                    <Trophy className="text-yellow-400 w-12 h-12"/> {/* Troféu dourado */}
                    <div className="h-28 w-10 bg-yellow-400 rounded-t-lg"/>
                    {/* Coluna mais alta */}
                </div>

                {/* 3º lugar */}
                <div className="flex flex-col items-center">
                    <Trophy className="text-orange-400 w-10 h-10"/> {/* Troféu bronze */}
                    <div className="h-16 w-10 bg-orange-400 rounded-t-lg"/>
                    {/* Coluna mais baixa */}
                </div>
            </div>

            {/* Informação da posição do usuário */}
            <h1 className="text-xl font-bold mb-4">
                Você ficou em 17º semana passada
            </h1>

            {/* Lista do ranking completo */}
            <div className="w-full max-w-md space-y-4">
                {rankingData.map((user, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between bg-gray-800 p-4 rounded-xl"
                    >
                        {/* Avatar e nome */}
                        <div className="flex items-center space-x-4">
                            <div
                                className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${user.color}`}>
                                {user.initial} {/* Inicial do usuário */}
                            </div>
                            <div>
                                <p className="font-semibold">{user.name}</p> {/* Nome completo */}
                                <p className="text-sm text-gray-400">{user.xp} XP</p> {/* Pontos XP */}
                            </div>
                        </div>

                        {/* Posição no ranking */}
                        <span className="text-lg font-bold">#{user.position}</span>
                    </div>
                ))}
            </div>

            {/* Botão para continuar */}
            <button className="mt-8 bg-blue-500 px-6 m-3 py-2 rounded font-bold hover:bg-blue-600">
                CONTINUAR
            </button>
        </div>
    );
}
