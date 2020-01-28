import { MaterialCommonModule } from './../../material-modules/material-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovimentacoesRoutingModule } from './movimentacoes-routing.module';
import { MovimentacoesComponent } from './movimentacoes.component';
import { CadastrarMovimentacoesComponent } from './cadastrar-movimentacoes/cadastrar-movimentacoes.component';


@NgModule({
  declarations: [MovimentacoesComponent, CadastrarMovimentacoesComponent],
  imports: [
    CommonModule,
    MovimentacoesRoutingModule,
    MaterialCommonModule
  ]
})
export class MovimentacoesModule { }
