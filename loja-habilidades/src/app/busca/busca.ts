// Importa o que precisamos do Angular
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarrinhoService } from '../services/carrinho/carrinho.service';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './busca.html'
})
export class Busca implements OnInit {

  // 🔍 Termo digitado pelo usuário
  termo: string = '';

  // 🎯 Resultados filtrados a partir do termo
  resultados: any[] = [];

  // ⏱ Opções de tempo (1h, 5h, 10h)
  tempos = [1, 5, 10];

  // Guarda o tempo selecionado para cada produto (id -> tempo)
  tempoSelecionado: { [key:number]: number } = {};

  // Lista de produtos/habilidades disponíveis
  produtos = [
    { 
      id: 1, 
      nome: 'Fale qualquer idioma fluentemente', 
      imagem: 'idioma.jpg', 
      precos: {1:10,5:45,10:80}, 
      // Lista de idiomas para o dropdown
      opcoes: ['Inglês', 'Espanhol', 'Francês', 'Alemão', 'Mandarim', 'Italiano'], 
      // Valor selecionado pelo usuário
      idiomaSelecionado: ''
    },
    { id: 2, nome: 'Torne-se um mestre da programação', imagem: 'programar.jpg', precos: {1:15,5:70,10:130} },
    { id: 3, nome: 'Habilidade para falar em público', imagem: 'falar.jpg', precos: {1:15,5:70,10:130} },
    { id: 4, nome: 'Torne-se um atleta profissional', imagem: 'atleta.jpg', precos: {1:15,5:70,10:130} },
    { id: 5, nome: 'Toque qualquer instrumento', imagem: 'instrumento.jpg', precos: {1:15,5:70,10:130} },
    { id: 6, nome: 'Tenha memória fotográfica', imagem: 'memoria.jpg', precos: {1:20,5:90,10:160} },
    { id: 7, nome: 'Aprenda qualquer coisa mais rápido', imagem: 'aprender.png', precos: {1:20,5:90,10:160} },
    { id: 8, nome: 'Não sentir fome temporariamente', imagem: 'fome.png', precos: {1:20,5:90,10:160} },
    { id: 9, nome: 'Habilidade de não ficar bêbado', imagem: 'bebado.png', precos: {1:20,5:90,10:160} },
    { id: 10, nome: 'Torne-se um artista habilidoso', imagem: 'artista.png', precos: {1:20,5:90,10:160} }
  ];

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private carrinho: CarrinhoService
  ) {}

  ngOnInit() {
    // Pega o termo de busca da URL, se houver
    this.route.queryParams.subscribe(params => {
      this.termo = params['q'] || '';
      this.pesquisar(); // atualiza os resultados
    });

    // Inicializa todos os tempos selecionados como 1h
    this.produtos.forEach(p => this.tempoSelecionado[p.id] = 1);
  }

  // 🔎 Filtra os produtos pelo termo digitado
  pesquisar() {
    const termoLower = this.termo.toLowerCase().trim();
    if (!termoLower) {
      this.resultados = [];
      return;
    }

    this.resultados = this.produtos.filter(p =>
      p.nome.toLowerCase().includes(termoLower)
    );
  }

  // 💰 Retorna o preço do produto baseado no tempo selecionado
  getPreco(p:any) {
    const tempo = this.tempoSelecionado[p.id] || 1;
    return p.precos[tempo as keyof typeof p.precos];
  }

  // ⏱ Atualiza o tempo selecionado ao clicar nos botões
  selecionarTempo(produtoId:number, tempo:number) {
    this.tempoSelecionado[produtoId] = tempo;
  }

  // 🛒 Compra o produto e adiciona no carrinho
  comprar(p:any) {
    const tempo = this.tempoSelecionado[p.id] || 1;
    const preco = p.precos[tempo as keyof typeof p.precos];

    // Se for a habilidade de idioma, valida se o usuário selecionou um idioma
    if (p.nome === 'Fale qualquer idioma fluentemente' && !p.idiomaSelecionado) {
      alert('❗ Por favor, escolha um idioma antes de comprar.');
      return;
    }

    // Adiciona produto no carrinho, incluindo idioma selecionado se houver
    this.carrinho.adicionar({
      ...p,
      tempo,
      precoSelecionado: preco,
      idiomaSelecionado: p.idiomaSelecionado || null
    });

    alert(`🛒 ${p.nome} adicionado à cesta!`);
  }

  // Navega para a página de sugestão de habilidades
  sugestao() {
    this.router.navigate(['/contato']);
  }

  // Volta para a vitrine principal
  voltar() {
    this.router.navigate(['/']);
  }
}