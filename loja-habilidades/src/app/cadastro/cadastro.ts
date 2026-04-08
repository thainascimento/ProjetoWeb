// Importa o Component → permite criar uma tela no Angular
import { Component } from '@angular/core';

// Router → usado para navegar entre páginas
// RouterModule → necessário para usar rotas no HTML
import { Router, RouterModule } from '@angular/router';

// FormsModule → permite usar ngModel (ligação entre input e variável)
import { FormsModule } from '@angular/forms';

// CommonModule → permite usar *ngIf, *ngFor, etc
import { CommonModule } from '@angular/common';

// Serviço de autenticação (onde está login e cadastro)
import { AuthService } from '../services/auth.service';

// Importa a lista de usuários (nosso "banco fake")
import { usuarioCadastrado } from '../usuario/usuario';

@Component({
  selector: 'app-cadastro', // nome do componente no HTML
  standalone: true, // não precisa de módulo separado
  imports: [RouterModule, FormsModule, CommonModule], // módulos usados no HTML
  templateUrl: './cadastro.html' // arquivo HTML dessa tela
})
export class Cadastro {

  //  VARIÁVEIS QUE GUARDAM OS DADOS DO FORMULÁRIO

  nome = '';              // nome digitado pelo usuário
  email = '';             // email digitado
  senha = '';             // senha digitada
  cpf = '';               // cpf digitado
  endereco = '';          // endereço digitado
  confirmarSenha = '';    // campo de confirmar senha
  iconeSelecionado = '';  // guarda qual ícone o usuário escolheu

  //  CONSTRUTOR
  // Angular injeta automaticamente os serviços aqui
  constructor(
    private router: Router,           // usado para mudar de página
    private authService: AuthService  // usado para cadastrar usuário
  ) {}

  //  FUNÇÃO PARA ESCOLHER O ÍCONE
  selecionarIcone(icone: string) {

    // salva o caminho da imagem escolhida
    this.iconeSelecionado = icone;
  }

  //  FUNÇÃO PARA VALIDAR CPF (forma simples)
  cpfValido(cpf: string): boolean {

    // remove tudo que não for número (ponto, traço, etc)
    const cpfLimpo = cpf.replace(/\D/g, '');

    // retorna true se tiver exatamente 11 números
    return cpfLimpo.length === 11;
  }

  //  FUNÇÃO PRINCIPAL DE CADASTRO
  cadastrar() {

    // VERIFICA SE ALGUM CAMPO ESTÁ VAZIO
    if (!this.nome || !this.email || !this.senha || !this.cpf || !this.endereco || !this.confirmarSenha) {
      alert('Preencha todos os campos!');
      return; // para a execução aqui
    }

    //  VERIFICA SE O EMAIL JÁ EXISTE
    const emailExiste = usuarioCadastrado.find(
      u => u.email === this.email
    );

    if (emailExiste) {
      alert('Este email já está cadastrado!');
      return;
    }

    //  VERIFICA TAMANHO DA SENHA
    if (this.senha.length < 6) {
      alert('A senha deve ter no mínimo 6 caracteres!');
      return;
    }

    //  VERIFICA SE AS SENHAS SÃO IGUAIS
    if (this.senha !== this.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    //  VERIFICA TAMANHO DO CPF
    if (this.cpf.length < 11) {
      alert('O CPF deve ter no mínimo 11 caracteres!');
      return;
    }

    //  VERIFICA SE CPF É VÁLIDO
    if (!this.cpfValido(this.cpf)) {
      alert('CPF inválido! Digite 11 números.');
      return;
    }

    //  VERIFICA SE O USUÁRIO ESCOLHEU UM ÍCONE
    if (!this.iconeSelecionado) {
      alert('Selecione um ícone!');
      return;
    }

    //  SE PASSOU EM TODAS AS VALIDAÇÕES, FAZ O CADASTRO

    this.authService.cadastrar(
      this.nome,               // envia nome
      this.email,              // envia email
      this.senha,              // envia senha
      this.cpf,                // envia cpf
      this.endereco,           // envia endereço
      this.iconeSelecionado    // envia ícone escolhido
    );

    //  Mostra mensagem de sucesso
    alert(`Cadastro realizado com sucesso! Bem-vindo(a) ${this.nome}`);

    //  Redireciona para a vitrine
    this.router.navigate(['/vitrine']);
  }
}