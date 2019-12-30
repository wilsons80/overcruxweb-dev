import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrestacaoContasRoutingModule } from './prestacao-contas-routing.module';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { CadastrarPrestacaoContasComponent } from './cadastrar-prestacao-contas/cadastrar-prestacao-contas.component';
import { PrestacaoContasComponent } from './prestacao-contas.component';


@NgModule({
  declarations: [PrestacaoContasComponent, CadastrarPrestacaoContasComponent],
  imports: [
    CommonModule,
    PrestacaoContasRoutingModule,
    MaterialCommonModule
  ]
})
export class PrestacaoContasModule { }
