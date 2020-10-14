import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvisionamentoRoutingModule } from './provisionamento-routing.module';
import { ProvisionamentoComponent } from './provisionamento.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { MovimentosBancariosInconsistestesModule } from '../common/movimentos-bancarios-inconsistentes/movimentos-bancarios-inconsistestes.module';


@NgModule({
  declarations: [ProvisionamentoComponent],
  imports: [
    CommonModule,
    ProvisionamentoRoutingModule,
    MaterialCommonModule,
    MovimentosBancariosInconsistestesModule
  ]
})
export class ProvisionamentoModule { }
