// Importa o Injectable → permite que esse serviço seja usado em toda a aplicação
import { Injectable } from '@angular/core';
// BehaviorSubject é um tipo especial que guarda um valor e notifica todos os "ouvintes" quando ele muda
import { BehaviorSubject } from 'rxjs';
// Importa a lista de usuários cadastrados (simulando um banco de dados)
import { usuarioCadastrado } from '../usuario/usuario';

// Define que esse serviço pode ser usado em toda a aplicação (global)
@Injectable({ providedIn: 'root' })
export class AuthService {

  // 🔥 Guarda o usuário logado atual
  // Começa como null (ninguém logado)
  // Qualquer componente pode "escutar" mudanças aqui (ex: Navbar)
  usuarioLogado$ = new BehaviorSubject<any>(null);

  constructor() {
    // 🧠 Ao criar o serviço, já inicializamos para recuperar usuário do localStorage
    this.init();
  }

  // 📝 Inicializa o usuário logado, se houver no localStorage
  init() {
    const usuario = localStorage.getItem('usuarioLogado');

    // Se existir um usuário salvo no navegador...
    if (usuario) {
      // Converte o texto (JSON) para objeto e atualiza o BehaviorSubject
      // Isso garante que o usuário continue logado mesmo após atualizar a página
      this.usuarioLogado$.next(JSON.parse(usuario));
    }
  }

  // 🔐 FUNÇÃO DE LOGIN
  login(email: string, senha: string): boolean {
    // Procura na lista de usuários alguém com o mesmo email e senha
    const usuario = usuarioCadastrado.find(
      u => u.email === email && u.senha === senha
    );

    // Se encontrou o usuário...
    if (usuario) {
      // Atualiza o usuário logado (avisa toda a aplicação)
      this.usuarioLogado$.next(usuario);

      // Salva no localStorage para não perder ao atualizar a página
      // localStorage só salva texto, então usamos JSON.stringify para converter o objeto em texto
      localStorage.setItem('usuarioLogado', JSON.stringify(usuario));

      return true; // login deu certo
    }

    return false; // login falhou
  }

  // 🚪 LOGOUT
  logout() {
    // Remove o usuário logado do BehaviorSubject (fica null)
    this.usuarioLogado$.next(null);

    // Remove do localStorage também, para não manter os dados salvos
    localStorage.removeItem('usuarioLogado');
  }

  // 📝 FUNÇÃO DE CADASTRO
  cadastrar(
    nome: string,
    email: string,
    senha: string,
    cpf: string,
    endereco: string,
    icone: string
  ) {
    // Cria um objeto usuário com todos os dados
    const usuario = { nome, email, senha, cpf, endereco, icone };

    // Adiciona esse usuário na lista de usuários cadastrados (simula banco de dados)
    // OBS: Só funciona enquanto a página não recarrega, pois é "fake"
    usuarioCadastrado.push(usuario);

    // Já loga automaticamente após cadastrar
    this.usuarioLogado$.next(usuario);

    // Salva no localStorage para manter logado mesmo após atualizar a página
    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
  }
}