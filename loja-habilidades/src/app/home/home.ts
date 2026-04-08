// Importa Component para criar componentes Angular
import { Component } from '@angular/core';

// Importa CommonModule, que oferece diretivas comuns como *ngIf e *ngFor
import { CommonModule } from '@angular/common';

// Importa RouterModule para permitir navegação entre páginas (routerLink)
import { RouterModule } from '@angular/router';

// Define o componente Home
@Component({
  // seletor usado no HTML para renderizar este componente
  selector: 'app-home',

  // arquivo HTML do componente
  templateUrl: './home.html',

  // arquivo CSS do componente
  styleUrls: ['./home.css'],

  // componente standalone, não precisa estar em um módulo específico
  standalone: true,

  // importa módulos necessários diretamente no componente
  imports: [CommonModule, RouterModule]
})
export class Home {

  // Array de conceitos que serão exibidos na página inicial
  // Cada conceito tem um título e uma descrição explicando a funcionalidade da HyperSkill
  conceitos = [
    { 
      titulo: 'Aprendizado Instantâneo', 
      descricao: 'Com HyperSkill, você adquire habilidades temporárias para dominar tarefas rapidamente e explorar novos horizontes sem limites.' 
    },
    { 
      titulo: 'Sugira sua Habilidade', 
      descricao: 'Não encontrou o que procurava? Envie sua sugestão e ajude a HyperSkill a oferecer novas habilidades para todos os usuários.' 
    },
    { 
      titulo: 'Escolha e Personalize', 
      descricao: 'Selecione as habilidades que combinam com seu estilo e objetivo, temporárias por 1h, 5h ou 10h, e experimente novas formas de evolução.' 
    }
  ];

  // Texto explicativo da página inicial
  // Pode ser usado como parágrafo introdutório ou banner de boas-vindas
  descricaoHome = `
    A HyperSkill nasceu da ideia de criar um espaço único onde habilidades podem ser adquiridas por tempo limitado. 
    Aqui você encontra ferramentas para acelerar seu aprendizado, experimentar novas competências e se divertir enquanto evolui.
  `;
}