import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferenciaValoresRoutingModule } from './transferencia-valores-routing.module';
import { CadastrarTransferenciaValoresComponent } from './cadastrar-transferencia-valores/cadastrar-transferencia-valores.component';
import { TransferenciaValoresComponent } from './transferencia-valores.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { ComboPesquisavelModule } from '../common/combo-pesquisavel/combo-pesquisavel.module';


@NgModule({
  declarations: [TransferenciaValoresComponent, 
                 CadastrarTransferenciaValoresComponent],
  imports: [
    CommonModule,
    TransferenciaValoresRoutingModule,
    MaterialCommonModule,
    ComboPesquisavelModule
  ]
})
export class TransferenciaValoresModule { }
