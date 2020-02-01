import { MaterialCommonModule } from './../../material-modules/material-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuncoesRoutingModule } from './funcoes-routing.module';
import { FuncoesComponent } from './funcoes.component';
import { CadastrarFuncoesComponent } from './cadastrar-funcoes/cadastrar-funcoes.component';


@NgModule({
  declarations: [
    FuncoesComponent,
    CadastrarFuncoesComponent
  ],
  imports: [
    CommonModule,
    FuncoesRoutingModule,
    MaterialCommonModule
  ]
})
export class FuncoesModule { }
