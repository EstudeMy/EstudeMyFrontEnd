// /pages/resetSenha/page.js
import { useRouter } from "next/router";

export default function ResetSenhaPage() {
  const router = useRouter();
  const { token } = router.query; // pega ?token=XYZ da URL

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Resetar Senha</h1>
      {token ? (
        <p>Token recebido: {token}</p>
      ) : (
        <p>Nenhum token encontrado na URL.</p>
      )}
    </div>
  );
}
