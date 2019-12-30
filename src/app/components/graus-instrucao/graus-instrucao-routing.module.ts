import { CadastrarGrausInstrucaoComponent } from './cadastrar-graus-instrucao/cadastrar-graus-instrucao.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrausInstrucaoComponent } from './graus-instrucao.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';


const routes: Routes = [
  { path: 'grausinstrucao/cadastrar', component: CadastrarGrausInstrucaoComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.GRAUS_INSTRUCAO}},
  { path: 'grausinstrucao', component: GrausInstrucaoComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.GRAUS_INSTRUCAO}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrausInstrucaoRoutingModule { }
