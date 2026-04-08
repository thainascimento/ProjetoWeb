// Aqui eu importo algumas coisas que preciso do Angular
import { Component } from '@angular/core'; 
// Component serve pra criar "blocos" que representam páginas ou partes da tela

import { FormsModule } from '@angular/forms'; 
// FormsModule é usado pra poder fazer formulários, tipo usar [(ngModel)] pra ligar os campos do HTML com as variáveis do TypeScript

import { CommonModule } from '@angular/common'; 
// CommonModule tem funcionalidades básicas do Angular, tipo *ngIf e *ngFor pra mostrar/esconder ou repetir elementos no HTML

// Aqui estou criando o componente Contato
@Component({
  selector: 'app-contato', 
  // selector é o nome que eu uso no HTML pra chamar esse componente. Tipo <app-contato></app-contato>

  standalone: true, 
  // standalone significa que esse componente funciona sozinho, sem precisar estar dentro de um módulo

  imports: [FormsModule, CommonModule], 
  // Aqui eu digo que vou usar o FormsModule e CommonModule dentro desse componente

  templateUrl: './contato.html' 
  // Esse é o arquivo HTML que vai mostrar a tela do formulário de contato
})
export class Contato { 
  // Começo da classe que representa o componente Contato

  // Aqui eu declaro as variáveis que vão receber os valores do formulário
  nome = ''; 
  email = '';
  telefone = '';
  tipo = ''; // 🔥 esse é um novo campo que indica o tipo de contato
  mensagem = '';

  // Aqui eu criei um array com os tipos de contato que a pessoa pode escolher
  tiposContato = [
    'Sugestão',
    'Crítica',
    'Reclamação',
    'Informação',
    'Elogio'
  ];

  // Função que vai rodar quando a pessoa clicar em "enviar"
  enviar() {
    // Aqui eu verifico se todos os campos foram preenchidos
    if (!this.nome || !this.email || !this.telefone || !this.tipo || !this.mensagem) {
      alert('Preencha todos os campos.');
      // Se algum campo estiver vazio, mostra uma mensagem de alerta e não continua
      return; 
    }

    // Se todos os campos estiverem preenchidos, mostra uma mensagem de sucesso
    alert(`Sua mensagem (${this.tipo}) foi enviada com sucesso!`);

    // Aqui eu limpo todos os campos do formulário, voltando para o estado inicial
    this.nome = '';
    this.email = '';
    this.telefone = '';
    this.tipo = '';
    this.mensagem = '';
  }
}