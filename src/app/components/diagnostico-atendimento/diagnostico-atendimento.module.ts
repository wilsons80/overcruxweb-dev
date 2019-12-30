import { DiagnosticoAtendimentoComponent } from './diagnostico-atendimento.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiagnosticoAtendimentoRoutingModule } from './diagnostico-atendimento-routing.module';
import { CadastrarDiagnosticoAtendimentoComponent } from './cadastrar-diagnostico-atendimento/cadastrar-diagnostico-atendimento.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';


@NgModule({
  declarations: [DiagnosticoAtendimentoComponent, CadastrarDiagnosticoAtendimentoComponent],
  imports: [
    CommonModule,
    DiagnosticoAtendimentoRoutingModule,
    MaterialCommonModule
  ]
})
export class DiagnosticoAtendimentoModule { }
