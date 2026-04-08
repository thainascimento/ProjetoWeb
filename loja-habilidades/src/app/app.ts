// Importando coisas do Angular
import { Component } from '@angular/core'; 
// Component = "bloco" que representa uma parte da tela ou a página inteira

import { RouterOutlet } from '@angular/router'; 
// RouterOutlet = espaço onde as páginas vão aparecer dependendo da rota
// Tipo um "buraco mágico" que mostra o conteúdo da rota atual

import { Navbar } from './navbar/navbar'; 
// Importando o componente Navbar pra mostrar sempre no topo da página

// Criando o componente principal da aplicação
@Component({
  selector: 'app-root', 
  // Nome do componente que vai estar no HTML principal: <app-root></app-root>

  standalone: true, 
  // Significa que ele funciona sozinho, sem precisar estar em um módulo

  imports: [RouterOutlet, Navbar], 
  // Aqui digo que dentro desse componente vou usar RouterOutlet e Navbar

  templateUrl: './app.html' 
  // HTML que vai mostrar a Navbar e o conteúdo das páginas
})
export class App {} 
// Classe do componente principal, não tem lógica adicional porque só mostra layout