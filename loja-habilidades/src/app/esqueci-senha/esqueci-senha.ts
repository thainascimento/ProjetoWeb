// Importando coisas do Angular que vamos usar
import { Component } from '@angular/core'; 
// Component serve pra criar um "bloco" que representa uma parte da tela ou página

import { Router, RouterModule } from '@angular/router'; 
// Router permite a gente navegar entre páginas (tipo redirecionar pra login)
// RouterModule é necessário se a gente quiser usar links ou navegação no HTML

import { FormsModule } from '@angular/forms'; 
// FormsModule permite usar formulários e ligar campos do HTML com variáveis do TypeScript

import { CommonModule } from '@angular/common'; 
// CommonModule traz funcionalidades básicas como *ngIf e *ngFor

// Criando o componente EsqueciSenha
@Component({
  selector: 'app-esqueci-senha', 
  // É o nome que a gente usa no HTML pra chamar esse componente: <app-esqueci-senha></app-esqueci-senha>

  standalone: true, 
  // Significa que o componente funciona sozinho, sem precisar estar dentro de um módulo

  imports: [RouterModule, FormsModule, CommonModule], 
  // Aqui eu digo que vou usar RouterModule, FormsModule e CommonModule nesse componente

  templateUrl: './esqueci-senha.html' 
  // Esse é o arquivo HTML que mostra o formulário de recuperação de senha
})
export class EsqueciSenha { 
  // Começo da classe do componente EsqueciSenha

  email = ''; 
  // Aqui vai guardar o email que a pessoa digita no formulário

  // Constructor roda quando o componente é criado
  constructor(private router: Router) {}
  // Estou dizendo que quero usar o Router pra poder navegar pra outra página

  // Função que roda quando a pessoa clica no botão "resetar senha"
  resetarSenha() {
    // Verifica se o campo de email está vazio
    if (!this.email) {
      alert('Por favor, informe seu email.');
      // Mostra alerta pedindo pra preencher o email
      return; 
      // Para a execução da função
    }

    // Simula o envio de email (aqui só mostra alerta)
    alert(`Um e-mail para resetar a senha foi enviado para ${this.email}`);
    
    // Redireciona pra página de login usando o Router
    this.router.navigate(['/login']);
  }
}