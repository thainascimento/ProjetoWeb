// Importa o tipo Routes do Angular, que é usado para definir as rotas da aplicação
import { Routes } from '@angular/router';

// Importação de todos os componentes que serão usados nas rotas
import { Vitrine } from './vitrine/vitrine';
import { Detalhe } from './detalhe/detalhe';
import { Cesta } from './cesta/cesta';
import { Login } from './login/login';
import { Cadastro } from './cadastro/cadastro';
import { EsqueciSenha } from './esqueci-senha/esqueci-senha';
import { Busca } from './busca/busca';
import { Contato } from './contato/contato';
import { Home } from './home/home';

// Definição das rotas da aplicação
export const routes: Routes = [

  // Rota padrão (quando o usuário acessa a raiz do site: "/")
  // Redireciona automaticamente para a página "home"
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Rota da página inicial
  // Quando acessar "/home", o componente Home será carregado
  { path: 'home', component: Home },

  // Página de vitrine (lista de produtos ou conteúdos)
  { path: 'vitrine', component: Vitrine },

  // Página de detalhes de um item específico
  { path: 'detalhe/:id', component: Detalhe },

  // Página da cesta/carrinho
  { path: 'cesta', component: Cesta },

  // Página de login do usuário
  { path: 'login', component: Login },

  // Página de cadastro de novo usuário
  { path: 'cadastro', component: Cadastro },

  // Página para recuperação de senha
  { path: 'esqueci-senha', component: EsqueciSenha },

  // Página de busca (provavelmente para pesquisar produtos ou conteúdos)
  { path: 'busca', component: Busca },

  // Página de contato
  { path: 'contato', component: Contato }
];