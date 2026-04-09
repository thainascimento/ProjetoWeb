// Importa o decorator Component e o ciclo de vida OnInit do Angular
import { Component, OnInit } from '@angular/core';
// Importa ferramentas de navegação entre páginas (rotas)
import { Router, ActivatedRoute } from '@angular/router';
// Importa o serviço responsável pelo carrinho de compras
import { CarrinhoService } from '../services/carrinho/carrinho.service';
// Importa funcionalidades básicas do Angular (*ngIf, *ngFor, etc)
import { CommonModule } from '@angular/common';
// Permite usar navegação no HTML (routerLink)
import { RouterModule } from '@angular/router';
// Permite usar formulários e ngModel (input, select, etc)
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vitrine', // Nome da tag HTML do componente
  standalone: true, // Indica que o componente não precisa de módulo (Angular moderno)
  imports: [RouterModule, CommonModule, FormsModule], // Módulos utilizados no HTML
  templateUrl: './vitrine.html', // Arquivo HTML ligado a esse componente
  styleUrls: ['./vitrine.css'] // Arquivo CSS do componente
})
export class Vitrine implements OnInit {

  // - CONFIGURAÇÕES DE TEMPO -

  // Lista de tempos disponíveis (em horas)
  // O slider usa índices (0,1,2), mas aqui estão os valores reais
  tempos = [1, 5, 10];

  // Guarda qual posição do slider foi escolhida para cada produto
  // Exemplo:
  // produto 1 → índice 0 → tempo = 1h
  tempoSelecionadoIndex: { [key: number]: number } = {};

  // - CONTROLE DA MODAL (SUBSTITUI ALERT) -

  // Controla se a modal aparece ou não
  mostrarModal: boolean = false;

  // Guarda o produto que foi comprado (para mostrar na modal)
  produtoSelecionado: any = null;

  // - LISTA DE PRODUTOS -

  // Lista principal de habilidades da loja
  produtos = [
    {
      id: 1,
      nome: 'Fale qualquer idioma fluentemente',
      imagem: 'idioma.jpg',

      // Preços variam conforme o tempo escolhido
      precos: { 1: 10, 5: 45, 10: 80 },

      // Indica que esse produto tem um input extra (dropdown)
      tipoInput: 'dropdown',

      // Lista de idiomas disponíveis
      opcoes: ['Inglês', 'Espanhol', 'Francês', 'Alemão', 'Japonês'],

      // Aqui será armazenado o idioma escolhido pelo usuário
      idiomaSelecionado: ''
    },

    // Outros produtos não possuem input extra
    { id: 2, nome: 'Torne-se um mestre da programação', imagem: 'programar.jpg', precos: { 1: 15, 5: 70, 10: 130 } },
    { id: 3, nome: 'Habilidade para falar em público', imagem: 'falar.jpg', precos: { 1: 15, 5: 70, 10: 130 } },
    { id: 4, nome: 'Torne-se um atleta profissional', imagem: 'atleta.jpg', precos: { 1: 15, 5: 70, 10: 130 } },
    { id: 5, nome: 'Toque qualquer instrumento', imagem: 'instrumento.jpg', precos: { 1: 15, 5: 70, 10: 130 } },
    { id: 6, nome: 'Tenha memória fotográfica', imagem: 'memoria.jpg', precos: { 1: 20, 5: 90, 10: 160 } },
    { id: 7, nome: 'Aprenda qualquer coisa mais rápido', imagem: 'aprender.png', precos: { 1: 20, 5: 90, 10: 160 } },
    { id: 8, nome: 'Não sentir fome temporariamente', imagem: 'fome.png', precos: { 1: 20, 5: 90, 10: 160 } },
    { id: 9, nome: 'Habilidade de não ficar bêbado', imagem: 'bebado.png', precos: { 1: 20, 5: 90, 10: 160 } },
    { id: 10, nome: 'Torne-se um artista habilidoso', imagem: 'artista.png', precos: { 1: 20, 5: 90, 10: 160 } }
  ];

  // - BUSCA -

  // Lista que será exibida na tela (pode estar filtrada)
  produtosFiltrados: any[] = [];

  // Texto digitado pelo usuário na busca
  termo: string = '';

  constructor(
    private router: Router, // Responsável por trocar de página
    private route: ActivatedRoute, // Permite ler parâmetros da URL (?q=...)
    private carrinho: CarrinhoService // Serviço que guarda os itens da cesta
  ) {
    // Inicialmente, todos os produtos aparecem
    this.produtosFiltrados = this.produtos;

    // Define que todos os sliders começam na posição 0 (1h)
    this.produtos.forEach(p => this.tempoSelecionadoIndex[p.id] = 0);
  }

  // Executa automaticamente quando o componente carrega
  ngOnInit() {
    // Escuta mudanças na URL (ex: busca vindo da navbar)
    this.route.queryParams.subscribe(params => {

      // Pega o termo de busca (q)
      this.termo = params['q'] || '';

      // Filtra os produtos com base no termo
      this.filtrarProdutos();
    });
  }

  // - FILTRO DE PRODUTOS -

  filtrarProdutos() {
    const termoLower = this.termo.trim().toLowerCase();

    // Se não digitou nada → mostra tudo
    if (!termoLower) {
      this.produtosFiltrados = this.produtos;
      return;
    }

    // Filtra pelo nome
    const encontrados = this.produtos.filter(p =>
      p.nome.toLowerCase().includes(termoLower)
    );

    // Se não encontrou nada
    if (encontrados.length === 0) {
      const fazerSugestao = confirm("Nenhuma habilidade encontrada.\nDeseja fazer uma sugestão?");
      if (fazerSugestao) this.router.navigate(['/contato']);

      this.produtosFiltrados = this.produtos;
      return;
    }

    // Atualiza lista com resultados
    this.produtosFiltrados = encontrados;
  }

  // - CONTROLE DO SLIDER -

  // Atualiza a posição do slider
  selecionarTempoIndex(produtoId: number, index: number) {
    this.tempoSelecionadoIndex[produtoId] = index;
  }

  // Converte índice → tempo real
  getTempo(p: any): number {
    const index = this.tempoSelecionadoIndex[p.id];
    return this.tempos[index];
  }

  // Calcula preço baseado no tempo
  getPreco(p: any): number {
    const tempo = this.getTempo(p);
    return p.precos[tempo as keyof typeof p.precos];
  }

  // - COMPRA -

  comprar(p: any) {

    // 🔴 Validação: se for idioma e não escolheu
    if (p.tipoInput === 'dropdown' && !p.idiomaSelecionado) {
      alert('Por favor, selecione um idioma antes de comprar.');
      return;
    }

    // Tempo e preço escolhidos
    const tempo = this.getTempo(p);
    const preco = p.precos[tempo as keyof typeof p.precos];

    // Cria objeto para enviar ao carrinho
    const produtoCarrinho = { ...p, tempo, precoSelecionado: preco };

    // Se tiver idioma, adiciona
    if (p.tipoInput === 'dropdown') {
      produtoCarrinho.idiomaSelecionado = p.idiomaSelecionado;
    }

    // Adiciona no carrinho
    this.carrinho.adicionar(produtoCarrinho);

    // atualizei: abre a modal (substitui alert)
    this.produtoSelecionado = produtoCarrinho;
    this.mostrarModal = true;
  }

  // - AÇÕES DA MODAL -

  // Usuário quer continuar comprando → só fecha modal
  continuarCompra() {
    this.mostrarModal = false;
  }

  // Usuário quer ir para a cesta
  irParaCesta() {
    this.mostrarModal = false;
    this.router.navigate(['/cesta']);
  }

  // - NAVEGAÇÃO -

  // Vai para tela de detalhes do produto
  irDetalhe(id: number) {
    this.router.navigate(['/detalhe', id]);
  }
}