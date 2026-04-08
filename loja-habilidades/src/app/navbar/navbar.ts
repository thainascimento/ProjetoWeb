import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './navbar.html'
})
export class Navbar implements OnInit { 

  usuario: any = null; // usuário logado
  termo: string = '';   // termo de busca

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    // Atualiza usuário logado sempre que muda
    this.authService.usuarioLogado$.subscribe(u => {
      this.usuario = u;
    });
  }

  // Logout
  logout() {
    this.authService.logout(); // limpa usuário
    this.router.navigate(['/login']); // redireciona para login
  }

  // Busca
  // Função que roda quando a pessoa faz uma busca
buscar() {
  if (!this.termo.trim()) return; // não faz nada se o campo estiver vazio

  // Navega para a página de busca com o termo digitado
  this.router.navigate(['/busca'], { queryParams: { q: this.termo.trim() } });

  // Limpa o campo de busca depois de enviar
  this.termo = '';
}
}