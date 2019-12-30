import { AuthGuard } from './../../guards/auth.guard';
import { CadastrarDocumentoAtividadeComponent } from './cadastrar-documento-atividade/cadastrar-documento-atividade.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentoAtividadeComponent } from './documento-atividade.component';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';


const routes: Routes = [
  {path: 'documentoatividade/cadastrar', component: CadastrarDocumentoAtividadeComponent, canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.DOCUMENTO_ATIVIDADE} },
  {path: 'documentoatividade', component: DocumentoAtividadeComponent, canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.DOCUMENTO_ATIVIDADE} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentoAtividadeRoutingModule { }
