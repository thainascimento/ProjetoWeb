import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class Home {
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
      descricao: 'Selecione as habilidades que combinam com seu estilo e objetivo, temporárias por 1h, 7h ou 10h, e experimente novas formas de evolução.' 
    }
  ];

  descricaoHome = `
    A HyperSkill nasceu da ideia de criar um espaço único onde habilidades podem ser adquiridas por tempo limitado. 
    Aqui você encontra ferramentas para acelerar seu aprendizado, experimentar novas competências e se divertir enquanto evolui.
  `;
}