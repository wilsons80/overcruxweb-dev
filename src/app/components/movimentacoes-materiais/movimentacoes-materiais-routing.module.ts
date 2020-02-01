import { AuthGuard } from 'src/app/guards/auth.guard';
import { CadastrarMovimentacoesMateriaisComponent } from './cadastrar-movimentacoes-materiais/cadastrar-movimentacoes-materiais.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovimentacoesMateriaisComponent } from './movimentacoes-materiais.component';


const routes: Routes = [
  {path:'movimentacoesmateriais/cadastrar', component:CadastrarMovimentacoesMateriaisComponent, canActivate: [AuthGuard]},
  {path:'movimentacoesmateriais', component:MovimentacoesMateriaisComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimentacoesMateriaisRoutingModule { }
