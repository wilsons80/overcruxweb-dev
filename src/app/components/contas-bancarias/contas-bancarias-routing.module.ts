import { ContasBancariasComponent } from './contas-bancarias.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarContasBancariasComponent } from './cadastrar-contas-bancarias/cadastrar-contas-bancarias.component';


const routes: Routes = [
  {path: 'contasbancarias/cadastrar', component: CadastrarContasBancariasComponent},
  {path: 'contasbancarias', component: ContasBancariasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContasBancariasRoutingModule { }
