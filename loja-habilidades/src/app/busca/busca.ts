// Importa o que precisamos do Angular
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarrinhoService } from '../services/carrinho/carrinho.service';

//  COMPONENT 
@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './busca.html'
})
export class Busca implements OnInit {

  //  MODAL 

  // Controla se a modal está visível ou não
  mostrarModal: boolean = false;

  // Guarda o produto que foi adicionado (para mostrar na modal)
  produtoSelecionado: any = null;

  //  BUSCA 

  // Termo digitado pelo usuário
  termo: string = '';

  // Resultados filtrados a partir do termo
  resultados: any[] = [];

  //  TEMPO 

  // Opções de tempo (1h, 5h, 10h)
  tempos = [1, 5, 10];

  // Guarda o tempo selecionado para cada produto (id > tempo)
  tempoSelecionado: { [key:number]: number } = {};

  //  PRODUTOS 

  // Lista de produtos/habilidades disponíveis
  produtos = [
    { 
      id: 1, 
      nome: 'Fale qualquer idioma fluentemente', 
      imagem: 'idioma.jpg', 
      precos: {1:10,5:45,10:80}, 

      // Lista de idiomas (dropdown)
      opcoes: ['Inglês', 'Espanhol', 'Francês', 'Alemão', 'Mandarim', 'Italiano'], 

      // Armazena escolha do usuário
      idiomaSelecionado: ''
    },
    { id: 2, nome: 'Tornese um mestre da programação', imagem: 'programar.jpg', precos: {1:15,5:70,10:130} },
    { id: 3, nome: 'Habilidade para falar em público', imagem: 'falar.jpg', precos: {1:15,5:70,10:130} },
    { id: 4, nome: 'Tornese um atleta profissional', imagem: 'atleta.jpg', precos: {1:15,5:70,10:130} },
    { id: 5, nome: 'Toque qualquer instrumento', imagem: 'instrumento.jpg', precos: {1:15,5:70,10:130} },
    { id: 6, nome: 'Tenha memória fotográfica', imagem: 'memoria.jpg', precos: {1:20,5:90,10:160} },
    { id: 7, nome: 'Aprenda qualquer coisa mais rápido', imagem: 'aprender.png', precos: {1:20,5:90,10:160} },
    { id: 8, nome: 'Não sentir fome temporariamente', imagem: 'fome.png', precos: {1:20,5:90,10:160} },
    { id: 9, nome: 'Habilidade de não ficar bêbado', imagem: 'bebado.png', precos: {1:20,5:90,10:160} },
    { id: 10, nome: 'Tornese um artista habilidoso', imagem: 'artista.png', precos: {1:20,5:90,10:160} }
  ];

  //  CONSTRUTOR 
  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private carrinho: CarrinhoService
  ) {}

  //  INICIALIZAÇÃO 
  ngOnInit() {

    // Pega o termo de busca da URL (?q=algo)
    this.route.queryParams.subscribe(params => {
      this.termo = params['q'] || '';
      this.pesquisar();
    });

    // Define tempo padrão como 1h para todos
    this.produtos.forEach(p => this.tempoSelecionado[p.id] = 1);
  }

  //  FILTRO 
  pesquisar() {
    const termoLower = this.termo.toLowerCase().trim();

    // Se não tiver nada digitado, limpa resultados
    if (!termoLower) {
      this.resultados = [];
      return;
    }

    // Filtra pelo nome
    this.resultados = this.produtos.filter(p =>
      p.nome.toLowerCase().includes(termoLower)
    );
  }

  //  PREÇO 
  getPreco(p:any) {
    const tempo = this.tempoSelecionado[p.id] || 1;
    return p.precos[tempo as keyof typeof p.precos];
  }

  //  TEMPO 
  selecionarTempo(produtoId:number, tempo:number) {
    this.tempoSelecionado[produtoId] = tempo;
  }

  //  COMPRA 
  comprar(p:any) {

    const tempo = this.tempoSelecionado[p.id] || 1;
    const preco = p.precos[tempo as keyof typeof p.precos];

    // 🔴 Validação do idioma
    if (p.nome === 'Fale qualquer idioma fluentemente' && !p.idiomaSelecionado) {
      alert('❗ Por favor, escolha um idioma antes de comprar.');
      return;
    }

    // Cria objeto do carrinho
    const itemCarrinho = {
      ...p,
      tempo,
      precoSelecionado: preco,
      idiomaSelecionado: p.idiomaSelecionado || null
    };

    // Adiciona no carrinho
    this.carrinho.adicionar(itemCarrinho);

    //  MODAL 

    // Guarda produto para exibir na modal
    this.produtoSelecionado = itemCarrinho;

    // Abre a modal
    this.mostrarModal = true;
  }

  //  AÇÕES DA MODAL 

  // Continua na busca
  continuarCompra() {
    this.mostrarModal = false;
    this.router.navigate(['/vitrine']);
  }

  // Vai para a cesta
  irParaCesta() {
    this.mostrarModal = false;
    this.router.navigate(['/cesta']);
  }

  //  NAVEGAÇÃO 

  sugestao() {
    this.router.navigate(['/contato']);
  }

  voltar() {
    this.router.navigate(['/vitrine']);
  }

  // Vai para tela de detalhes do produto
  irDetalhe(id: number) {
    this.router.navigate(['/detalhe', id]);
  }
  
}