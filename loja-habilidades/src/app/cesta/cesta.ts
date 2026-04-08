import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrinhoService } from '../services/carrinho/carrinho.service';

@Component({
  standalone: true, // Componente independente
  imports: [CommonModule], // Para usar *ngIf, *ngFor
  templateUrl: './cesta.html' // Arquivo HTML do componente
})
export class Cesta implements OnInit { 

  itens: any[] = []; // Array com os itens do carrinho
  total: number = 0; // Total do carrinho

  constructor(private carrinho: CarrinhoService) {}

  ngOnInit() {
    // Pega os itens do serviço e calcula total ao iniciar
    this.itens = this.carrinho.getItens();
    this.total = this.carrinho.getTotal();
  }

  // Finaliza a compra: apenas limpa o carrinho e mostra alerta
  public finalizarCompra() {
    alert('Compra finalizada com sucesso!');

    // Limpa carrinho do serviço e local
    this.carrinho.itens = [];
    this.itens = [];
    this.total = 0;

    // Tudo relacionado a habilidades e tempo foi removido
  }

  // Limpa o carrinho sem finalizar compra
  public limparCarrinho() {
    this.carrinho.itens = [];
    this.itens = [];
    this.total = 0;
  }
}