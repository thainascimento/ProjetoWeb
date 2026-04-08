// Importando coisas do Angular
import { Component } from '@angular/core'; 
// Component é o "bloco" que representa a página ou parte da tela

import { Router, RouterModule } from '@angular/router'; 
// Router permite navegar entre páginas (tipo redirecionar pra vitrine)
// RouterModule é necessário se quisermos usar rotas no HTML

import { FormsModule } from '@angular/forms'; 
// FormsModule permite usar formulários e ligar campos do HTML com variáveis do TypeScript

import { AuthService } from '../services/auth.service'; 
// AuthService é um serviço que vai checar se o usuário e senha estão corretos

// Criando o componente Login
@Component({
  selector: 'app-login', 
  // Nome do componente que podemos usar no HTML: <app-login></app-login>

  standalone: true, 
  // Significa que o componente funciona sozinho, sem estar dentro de um módulo

  imports: [RouterModule, FormsModule], 
  // Aqui eu digo que vou usar RouterModule e FormsModule dentro desse componente

  templateUrl: './login.html' 
  // Arquivo HTML que vai mostrar o formulário de login
})
export class Login { 
  // Começo da classe que representa a página de login

  // Variáveis que vão receber o que o usuário digitar
  email = ''; 
  senha = ''; 

  // Constructor roda quando o componente é criado
  constructor(private router: Router, private authService: AuthService) {}
  // Estou dizendo que quero usar Router (pra navegar entre páginas) e AuthService (pra checar login)

  // Função que roda quando o usuário clica em "login"
  login() {
    const sucesso = this.authService.login(this.email, this.senha); 
    // Chama a função login do AuthService e guarda o resultado (true ou false)

    if (sucesso) {
      // Se o login deu certo
      alert(`Login realizado com sucesso!`);
      this.router.navigate(['/vitrine']); 
      // Redireciona pra página da vitrine
    } else {
      // Se o login deu errado
      alert('Usuário não encontrado ou senha incorreta!'); 
      // Mostra alerta de erro
    }
  }
}