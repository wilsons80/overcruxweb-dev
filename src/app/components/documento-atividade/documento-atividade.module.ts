import { DadosAtividadeModule } from './../common/dados-atividade/dados-atividade.module';
import { MaterialCommonModule } from './../../material-modules/material-common.module';
import { DocumentoAtividadeComponent } from './documento-atividade.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentoAtividadeRoutingModule } from './documento-atividade-routing.module';
import { CadastrarDocumentoAtividadeComponent } from './cadastrar-documento-atividade/cadastrar-documento-atividade.component';


@NgModule({
  declarations: [
    DocumentoAtividadeComponent
    ,CadastrarDocumentoAtividadeComponent],
  imports: [
    CommonModule,
    DocumentoAtividadeRoutingModule,
    MaterialCommonModule,
    DadosAtividadeModule
  ]
})
export class DocumentoAtividadeModule { }
