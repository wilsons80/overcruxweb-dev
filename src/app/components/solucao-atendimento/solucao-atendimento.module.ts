import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolucaoAtendimentoRoutingModule } from './solucao-atendimento-routing.module';
import { SolucaoAtendimentoComponent } from './solucao-atendimento.component';
import { CadastrarSolucaoAtendimentoComponent } from './cadastrar-solucao-atendimento/cadastrar-solucao-atendimento.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';


@NgModule({
  declarations: [SolucaoAtendimentoComponent, CadastrarSolucaoAtendimentoComponent],
  imports: [
    CommonModule,
    SolucaoAtendimentoRoutingModule,
    MaterialCommonModule
  ]
})
export class SolucaoAtendimentoModule { }
