// Importando módulos necessários do Angular
import { Component } from '@angular/core'; 
import { ActivatedRoute, RouterModule } from '@angular/router'; 
import { CarrinhoService } from '../services/carrinho/carrinho.service'; 
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';

// Criando o componente Detalhe
@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  selector: 'app-detalhe', 
  templateUrl: 'detalhe.html' 
})
export class Detalhe {

  // Produto atualmente exibido
  produto: any; 

  // Valor do slider de tempo selecionado (1 = 1h, 2 = 5h, 3 = 10h)
  tempoSelecionado: number = 1; 

  // Lista de produtos disponíveis (simulando banco de dados)
  produtos = [
    { 
      id: 1, 
      nome: 'Fale qualquer idioma fluentemente', 
      imagem: 'idioma.jpg', 
      descricao: 'Aquela sensação de não entender nada desaparece. Você escuta, responde e se expressa com naturalidade em qualquer idioma, sem precisar pensar duas vezes.', 
      precos: {1:10,5:45,10:80}, 
      tipoInput: 'dropdown',           // Define que este produto terá dropdown de idioma
      opcoes: ['Inglês', 'Espanhol', 'Francês', 'Alemão', 'Japonês'], // opções disponíveis
      idiomaSelecionado: ''            // Guarda o idioma selecionado pelo usuário
    },
    { 
      id: 2, nome: 'Torne-se um mestre da programação', 
      imagem: 'programar.jpg', 
      descricao: 'Pense como um dev experiente, resolva bugs sem sofrer e escreva código bonito.', 
      precos: {1:15,5:70,10:130} 
    },
    { id: 3, nome: 'Habilidade para falar em público', imagem: 'falar.jpg', descricao: 'Fala com mais confiança e mantém atenção das pessoas.', precos: {1:15,5:70,10:130} },
    { id: 4, nome: 'Torne-se um atleta profissional', imagem: 'atleta.jpg', descricao: 'Desempenho físico aprimorado e constância.', precos: {1:15,5:70,10:130} },
    { id: 5, nome: 'Toque qualquer instrumento', imagem: 'instrumento.jpg', descricao: 'Toca qualquer instrumento com habilidade natural.', precos: {1:15,5:70,10:130} },
    { id: 6, nome: 'Tenha memória fotográfica', imagem: 'memoria.jpg', descricao: 'Lembrar de tudo com clareza e rapidez.', precos: {1:20,5:90,10:160} },
    { id: 7, nome: 'Aprenda qualquer coisa mais rápido', imagem: 'aprender.png', descricao: 'Aprende rapidamente qualquer conteúdo.', precos: {1:20,5:90,10:160} },
    { id: 8, nome: 'Não sentir fome temporariamente', imagem: 'fome.png', descricao: 'Sua fome desaparece temporariamente.', precos: {1:20,5:90,10:160} },
    { id: 9, nome: 'Habilidade de não ficar bêbado', imagem: 'bebado.png', descricao: 'Permanece sóbrio mesmo bebendo.', precos: {1:20,5:90,10:160} },
    { id: 10, nome: 'Torne-se um artista habilidoso', imagem: 'artista.png', descricao: 'Domina técnicas artísticas com facilidade.', precos: {1:20,5:90,10:160} }  
  ];

  // Construtor: injeta serviços de rota e carrinho
  constructor(private route: ActivatedRoute, private carrinho: CarrinhoService) {}

  // Inicialização do componente
  ngOnInit() {
    // Obtém o id do produto da URL
    const id = Number(this.route.snapshot.params['id']); 
    // Busca o produto correspondente na lista
    this.produto = this.produtos.find(p => p.id === id); 
  }

  // Mapeia o valor do slider (1,2,3) para horas reais (1h, 5h, 10h)
  getTempo(): number {
    switch(this.tempoSelecionado) {
      case 1: return 1;
      case 2: return 5;
      case 3: return 10;
      default: return 1;
    }
  }

  // Adiciona o produto ao carrinho
  comprar() {
    const tempo = this.getTempo();                   // Pega o tempo selecionado
    const preco = this.produto.precos[tempo];        // Pega o preço baseado no tempo

    // Prepara o objeto que será enviado para o carrinho
    const itemCarrinho: any = {
      ...this.produto,
      tempo: tempo,
      precoSelecionado: preco
    };

    // Se for o produto de idioma, adiciona o idioma selecionado
    if(this.produto.tipoInput === 'dropdown') {
      if(!this.produto.idiomaSelecionado) {
        alert('Por favor, selecione um idioma antes de comprar!');
        return;
      }
      itemCarrinho.idiomaSelecionado = this.produto.idiomaSelecionado;
    }

    // Adiciona ao carrinho
    this.carrinho.adicionar(itemCarrinho);

    alert(`🛒 ${this.produto.nome} adicionado à cesta!`);
  }
}