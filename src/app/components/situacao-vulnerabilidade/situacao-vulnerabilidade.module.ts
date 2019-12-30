import { MaterialCommonModule } from './../../material-modules/material-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SituacaoVulnerabilidadeRoutingModule } from './situacao-vulnerabilidade-routing.module';
import { SituacaoVulnerabilidadeComponent } from './situacao-vulnerabilidade.component';
import { CadastrarSituacaoVulnerabilidadeComponent } from './cadastrar-situacao-vulnerabilidade/cadastrar-situacao-vulnerabilidade.component';


@NgModule({
  declarations: [SituacaoVulnerabilidadeComponent, CadastrarSituacaoVulnerabilidadeComponent],
  imports: [
    CommonModule,
    SituacaoVulnerabilidadeRoutingModule,
    MaterialCommonModule
  ]
})
export class SituacaoVulnerabilidadeModule { }
