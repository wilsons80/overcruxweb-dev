import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConciliacaoRoutingModule } from './conciliacao-routing.module';
import { ConciliacaoComponent } from './conciliacao.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { MovimentosBancariosInconsistestesModule } from '../common/movimentos-bancarios-inconsistentes/movimentos-bancarios-inconsistestes.module';


@NgModule({
  declarations: [ConciliacaoComponent],
  imports: [
    CommonModule,
    ConciliacaoRoutingModule,
    MaterialCommonModule,
    MovimentosBancariosInconsistestesModule
  ]
})
export class ConciliacaoModule { }
