import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ResetSenha() {
  const router = useRouter();
  const { token } = router.query; // pega ?token=abc123 da URL

  const [novaSenha, setNovaSenha] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      alert("Token inválido ou não encontrado.");
      return;
    }

    // aqui você chama sua API para resetar a senha
    console.log("Resetando senha com token:", token, "nova senha:", novaSenha);
  };

  return (
    <div>
      <h1>Redefinir Senha</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Digite a nova senha"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
        />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}
