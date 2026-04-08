// Importando ferramentas de teste do Angular
import { ComponentFixture, TestBed } from '@angular/core/testing'; 
// TestBed = serve pra criar um "ambiente de teste" parecido com a aplicação real
// ComponentFixture = permite acessar o componente ou serviço dentro do teste

import { CarrinhoService } from './carrinho.service'; 
// Importando o serviço que vamos testar

// Começando o bloco de testes
describe('Carrinho', () => { 
  // "describe" é como se fosse um grupo de testes com o mesmo tema (aqui: Carrinho)

  let component: CarrinhoService; 
  // Variável que vai guardar a instância do serviço que estamos testando

  let fixture: ComponentFixture<CarrinhoService>; 
  // Variável que permite manipular o serviço dentro do "ambiente de teste"

  // Antes de cada teste, esse bloco roda
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarrinhoService], 
      // Aqui estamos dizendo pro TestBed que vamos usar o CarrinhoService
    }).compileComponents(); 
    // compileComponents() prepara tudo pro teste rodar

    fixture = TestBed.createComponent(CarrinhoService); 
    // Cria a instância do serviço no "ambiente de teste"

    component = fixture.componentInstance; 
    // Guarda a instância do serviço na variável "component"

    await fixture.whenStable(); 
    // Espera o ambiente ficar estável antes de rodar os testes
  });

  // Aqui começa um teste específico
  it('should create', () => { 
    // "it" = define um teste
    // "should create" = o que estamos testando: se o serviço foi criado com sucesso

    expect(component).toBeTruthy(); 
    // expect = espera que algo seja verdadeiro
    // toBeTruthy() = checa se a instância do serviço existe (não é null ou undefined)
  });
});