'use client';

import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

const ResetSenha = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [novaSenha, setNovaSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  // Validação básica de senha
  const validarSenha = (senha: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(senha);
  };

  const redefinirSenha = async () => {
    setErro('');
    setSucesso('');

    if (!validarSenha(novaSenha)) {
      setErro('Senha deve ter ao menos 8 caracteres, com letra maiúscula, minúscula, número e símbolo.');
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/api/usuarios/reset-senha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, novaSenha }),
      });

      let data: { mensagem?: string } = {};
      try { data = await res.json(); } catch {}

      if (res.ok) {
        setSucesso(data?.mensagem || 'Senha redefinida com sucesso!');
        setNovaSenha('');
      } else {
        setErro(data?.mensagem || 'Erro ao redefinir senha');
      }
    } catch (error) {
      setErro('Erro ao conectar com o servidor.');
      console.error(error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50 px-4"
      style={{ backgroundImage: `url('/img/background-image-login-register.png')`, backgroundSize: 'cover' }}
    >
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="mb-6 text-center">
          <Image width={400} height={128} src="/svg/EstudeMyLogo.svg" alt="Logo" />
        </div>

        <h1 className="text-xl font-bold mb-4 text-center">Redefinir Senha</h1>

        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => { e.preventDefault(); redefinirSenha(); }}
        >
          <div className="flex flex-col relative">
            <label className="text-sm mb-1 text-left">Nova senha:</label>
            <input
              type={mostrarSenha ? 'text' : 'password'}
              placeholder="Digite sua nova senha"
              className="w-full rounded-lg py-2 px-4 pr-10 text-sm border border-gray-300 bg-blue-100"
              required
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-900"
              title={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {mostrarSenha ? '🙈' : '👁️'}
            </button>
          </div>

          {erro && <p className="text-red-600 text-sm">{erro}</p>}
          {sucesso && <p className="text-green-600 text-sm">{sucesso}</p>}

          <Button type="submit" variant="primary">Redefinir Senha</Button>

          <p className="text-center text-sm mt-2">
            <a href="/pages/login" className="text-blue-600 hover:underline">Voltar ao login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ResetSenha;
