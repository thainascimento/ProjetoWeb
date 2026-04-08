import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CarrinhoService } from '../services/carrinho/carrinho.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vitrine', // Define o seletor do componente
  standalone: true, // Indica que o componente é independente, não precisa de módulo
  imports: [RouterModule, CommonModule, FormsModule], // Importa módulos necessários para router, diretivas e formulários
  templateUrl: './vitrine.html', // HTML do componente
  styleUrls: ['./vitrine.css'] // CSS do componente
})
export class Vitrine implements OnInit {

  // Array com os tempos disponíveis para as habilidades (em horas)
  tempos = [1, 5, 10];

  // Guarda o índice selecionado do slider de cada produto
  // Ex.: tempoSelecionadoIndex[1] = 0 significa que o produto com id 1 está no primeiro índice do array tempos (1h)
  tempoSelecionadoIndex: { [key: number]: number } = {};

  // Lista completa de produtos/habilidades disponíveis na vitrine
  produtos = [
    {
      id: 1,
      nome: 'Fale qualquer idioma fluentemente',
      imagem: 'idioma.jpg',
      precos: { 1: 10, 5: 45, 10: 80 },
      tipoInput: 'dropdown', // Identifica que este produto precisa de seleção via dropdown
      opcoes: ['Inglês', 'Espanhol', 'Francês', 'Alemão', 'Japonês'], // Opções de idiomas
      idiomaSelecionado: '' // Guarda a escolha do usuário
    },
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

  // Array que contém os produtos que serão exibidos após filtragem
  produtosFiltrados: any[] = [];

  // Termo digitado na barra de busca
  termo: string = '';

  constructor(
    private router: Router, // Serviço para navegação de rotas
    private route: ActivatedRoute, // Para acessar query params (busca)
    private carrinho: CarrinhoService // Serviço que gerencia o carrinho
  ) {
    // Inicializa a lista filtrada com todos os produtos
    this.produtosFiltrados = this.produtos;

    // Inicializa o índice de tempo de cada produto como 0 (corresponde a 1h)
    this.produtos.forEach(p => this.tempoSelecionadoIndex[p.id] = 0);
  }

  ngOnInit() {
    // Observa alterações nos queryParams (ex.: ?q=linguagem) para filtrar produtos automaticamente
    this.route.queryParams.subscribe(params => {
      this.termo = params['q'] || ''; // Pega o valor do parâmetro "q" ou vazio
      this.filtrarProdutos(); // Aplica filtro
    });
  }

  // Função que filtra os produtos com base no termo da busca
  filtrarProdutos() {
    const termoLower = this.termo.trim().toLowerCase(); // Normaliza o termo para comparação
    if (!termoLower) {
      // Se não houver termo, exibe todos os produtos
      this.produtosFiltrados = this.produtos;
      return;
    }

    // Procura produtos cujo nome contenha o termo digitado
    const encontrados = this.produtos.filter(p =>
      p.nome.toLowerCase().includes(termoLower)
    );

    // Caso não encontre nenhum produto, pergunta ao usuário se deseja sugerir
    if (encontrados.length === 0) {
      const fazerSugestao = confirm("Nenhuma habilidade encontrada.\nDeseja fazer uma sugestão?");
      if (fazerSugestao) this.router.navigate(['/contato']);
      // Mantém todos os produtos visíveis
      this.produtosFiltrados = this.produtos;
      return;
    }

    // Atualiza a lista filtrada com os produtos encontrados
    this.produtosFiltrados = encontrados;
  }

  // Atualiza o índice selecionado do slider de tempo para um produto específico
  selecionarTempoIndex(produtoId: number, index: number) {
    this.tempoSelecionadoIndex[produtoId] = index;
  }

  // Retorna o tempo real (em horas) baseado no índice do slider
  getTempo(p: any): number {
    const index = this.tempoSelecionadoIndex[p.id]; // Pega índice do produto
    return this.tempos[index]; // Retorna a hora correspondente
  }

  // Retorna o preço do produto baseado no tempo selecionado
  getPreco(p: any): number {
    const tempo = this.getTempo(p); // Pega tempo real selecionado
    return p.precos[tempo as keyof typeof p.precos]; // Retorna o preço correspondente
  }

  // Adiciona o produto ao carrinho
  comprar(p: any) {
    // Valida se o usuário selecionou um idioma (caso dropdown)
    if (p.tipoInput === 'dropdown' && !p.idiomaSelecionado) {
      alert('Por favor, selecione um idioma antes de comprar.');
      return;
    }

    const tempo = this.getTempo(p); // Tempo selecionado
    const preco = p.precos[tempo as keyof typeof p.precos]; // Preço do tempo

    // Cria objeto do produto para o carrinho, incluindo idioma se aplicável
    const produtoCarrinho = { ...p, tempo, precoSelecionado: preco };
    if (p.tipoInput === 'dropdown') produtoCarrinho.idiomaSelecionado = p.idiomaSelecionado;

    // Adiciona produto ao carrinho via serviço
    this.carrinho.adicionar(produtoCarrinho);

    alert(`🛒 ${p.nome} adicionado à cesta!`);
  }

  // Redireciona para a página de detalhes do produto
  irDetalhe(id: number) {
    this.router.navigate(['/detalhe', id]);
  }
}