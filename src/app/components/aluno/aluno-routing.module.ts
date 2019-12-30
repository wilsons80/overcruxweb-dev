import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastarAlunoComponent } from './cadastar-aluno/cadastar-aluno.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AlunoComponent } from './aluno.component';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';


const routes: Routes = [
  { path: 'aluno/cadastrar', component: CadastarAlunoComponent,canActivate: [AuthGuard], resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.ALUNO} },
  { path: 'aluno', component: AlunoComponent, canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.ALUNO} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlunoRoutingModule { }
