import { AuthGuard } from 'src/app/guards/auth.guard';
import { CadastrarMovimentacoesMateriaisComponent } from './cadastrar-movimentacoes-materiais/cadastrar-movimentacoes-materiais.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovimentacoesMateriaisComponent } from './movimentacoes-materiais.component';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';


const routes: Routes = [
  {path:'movimentacoesmateriais/cadastrar', component:CadastrarMovimentacoesMateriaisComponent, canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.MOVIMENTACOES_MATERIAIS} },
  {path:'movimentacoesmateriais', component:MovimentacoesMateriaisComponent, canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.MOVIMENTACOES_MATERIAIS} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimentacoesMateriaisRoutingModule { }
