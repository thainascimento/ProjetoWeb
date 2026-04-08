// Define um "molde" (estrutura) para um usuário
// Interface serve para garantir que todo usuário tenha esses campos
export interface Usuario {

  // Nome da pessoa
  nome: string;

  // Email (usado para login)
  email: string;

  // Senha (ainda está em texto simples - cuidado em projetos reais!)
  senha: string;

  // CPF do usuário
  cpf: string;

  // Endereço do usuário
  endereco: string;

  // Caminho da imagem do ícone (ex: "icone1.png")
  icone: string;
}


// Lista que armazena todos os usuários cadastrados
// Começa vazia []
// Funciona como um "banco de dados fake" em memória
export const usuarioCadastrado: Usuario[] = [];