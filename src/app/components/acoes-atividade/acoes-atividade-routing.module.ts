import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Modulos } from 'src/app/core/modulos';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AcoesAtividadeComponent } from './acoes-atividade.component';
import { CadastrarAcoesAtividadeComponent } from './cadastrar-acoes-atividade/cadastrar-acoes-atividade.component';


const routes: Routes = [
  { path: 'acoesatividade/cadastrar', component: CadastrarAcoesAtividadeComponent, canActivate: [AuthGuard], resolve: { perfilAcesso: AcessoModuloResolver }, data: { modulo: Modulos.ACOES_ATIVIDADE } },
  { path: 'acoesatividade', component: AcoesAtividadeComponent, canActivate: [AuthGuard], resolve: { perfilAcesso: AcessoModuloResolver }, data: { modulo: Modulos.ACOES_ATIVIDADE } },


];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcoesAtividadeRoutingModule { }
