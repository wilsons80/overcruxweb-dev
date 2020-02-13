import { ContasBancariasComponent } from './contas-bancarias.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarContasBancariasComponent } from './cadastrar-contas-bancarias/cadastrar-contas-bancarias.component';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';

// ,resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.CONTAS_BANCARIA} 
const routes: Routes = [
  {path: 'contasbancarias/cadastrar', component: CadastrarContasBancariasComponent,resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.CONTAS_BANCARIA}},
  {path: 'contasbancarias', component: ContasBancariasComponent,resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.CONTAS_BANCARIA}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContasBancariasRoutingModule { }
