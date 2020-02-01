import { CadastrarMovimentacoesMateriaisComponent } from './cadastrar-movimentacoes-materiais/cadastrar-movimentacoes-materiais.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovimentacoesMateriaisComponent } from './movimentacoes-materiais.component';


const routes: Routes = [
  {path:'movimentacoesmateriais/cadastrar', component:CadastrarMovimentacoesMateriaisComponent},
  {path:'movimentacoesmateriais', component:MovimentacoesMateriaisComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimentacoesMateriaisRoutingModule { }
