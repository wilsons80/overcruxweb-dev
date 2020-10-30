import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Modulos } from 'src/app/core/modulos';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ExportarDadosAlunoComponent } from './exportar-dados-aluno.component';



const routes: Routes = [
  { path: 'exportardadosaluno', component: ExportarDadosAlunoComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.EXPORTAR_DADOS_ALUNO} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExportarDadosAlunoRoutingModule { }
