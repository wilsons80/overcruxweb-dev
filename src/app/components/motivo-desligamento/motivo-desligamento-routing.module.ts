import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';
import { CadastrarMotivoDesligamentoComponent } from './cadastrar-situacao-ex-aluno/cadastrar-motivo-desligamento.component';
import { MotivoDesligamentoComponent } from './motivo-desligamento.component';


const routes: Routes = [
  { path: 'motivosdesligamentos/cadastrar', component: CadastrarMotivoDesligamentoComponent, canActivate: [AuthGuard], resolve: { perfilAcesso: AcessoModuloResolver }, data: { modulo: Modulos.MOTIVOS_DESLIGAMENTOS } },
  { path: 'motivosdesligamentos', component: MotivoDesligamentoComponent, canActivate: [AuthGuard], resolve: { perfilAcesso: AcessoModuloResolver }, data: { modulo: Modulos.MOTIVOS_DESLIGAMENTOS } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MotivoDesligamentoRoutingModule { }
