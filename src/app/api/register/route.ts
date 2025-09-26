import {NextRequest, NextResponse} from 'next/server'

// Endpoint que lida com requisições POST para cadastro de usuários
export async function POST(req: NextRequest) {
    try {
        // Lê o corpo da requisição em formato JSON
        const body = await req.json()
        const {nome, email, senha} = body

        // Validação básica: verifica se todos os campos obrigatórios foram fornecidos
        if (!nome || !email || !senha) {
            return NextResponse.json(
                {sucesso: false, mensagem: 'Nome, email e senha são obrigatórios.'},
                {status: 400} // Bad Request
            )
        }

        // Apenas log para verificação no console (em produção, aqui você salvaria no banco)
        console.log('Dados recebidos para cadastro:', {nome, email})

        // Retorna sucesso simulando que o cadastro foi realizado
        return NextResponse.json({
            sucesso: true,
            mensagem: 'Cadastro realizado com sucesso!',
        })
    } catch (error) {
        // Captura e loga qualquer erro inesperado no servidor
        console.error('Erro no servidor:', error)
        return NextResponse.json(
            {sucesso: false, mensagem: 'Erro interno no servidor.'},
            {status: 500} // Internal Server Error
        )
    }
}
