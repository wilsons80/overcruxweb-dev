import { AuthGuard } from 'src/app/guards/auth.guard';
import { FuncoesComponent } from './funcoes.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarFuncoesComponent } from './cadastrar-funcoes/cadastrar-funcoes.component';


const routes: Routes = [
  {path:'funcoes/cadastrar', component: CadastrarFuncoesComponent, canActivate: [AuthGuard]},
  {path:'funcoes', component: FuncoesComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncoesRoutingModule { }
