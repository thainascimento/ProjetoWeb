// Importando coisa do Angular
import { Injectable } from '@angular/core'; 
// Injectable significa que esse serviço pode ser "injetado" em outros componentes ou serviços
// Ele serve pra compartilhar dados e funções entre várias partes do app

// Decorador que define que esse serviço será global (root)
@Injectable({
  providedIn: 'root' 
  // Isso quer dizer que só existe uma cópia desse serviço pra toda a aplicação
})
export class CarrinhoService { 
  // Começo da classe do serviço, que vai gerenciar o carrinho de compras

  itens:any[] = []; 
  // Aqui guardo todos os produtos que foram adicionados ao carrinho
  // any[] significa que é um array que pode ter qualquer tipo de objeto

  // Função que adiciona um produto no carrinho
  adicionar(produto:any){
    // Procuro se já existe esse produto no carrinho com o mesmo tempo
    const item = this.itens.find(i => i.id === produto.id && i.tempo === produto.tempo);

    if(item){
      // Se o produto já existe, aumento a quantidade
      item.qtd++; 
    } else {
      // Se não existe, adiciono no carrinho com quantidade 1
      this.itens.push({...produto, qtd:1});
      // {...produto} copia todas as informações do produto e adiciona a propriedade qtd
    }
  }

  // Função que retorna todos os itens do carrinho
  getItens(){
    return this.itens; 
  }

  // Função que calcula o total do carrinho
  getTotal(){
    return this.itens.reduce((t,i)=> t + i.precoSelecionado * i.qtd,0); 
    // reduce percorre todos os itens e vai somando (total + preço * quantidade)
    // começa com 0 no final
  }
}