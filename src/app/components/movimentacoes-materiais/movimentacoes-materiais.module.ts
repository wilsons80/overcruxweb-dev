import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovimentacoesMateriaisRoutingModule } from './movimentacoes-materiais-routing.module';
import { CadastrarMovimentacoesMateriaisComponent } from './cadastrar-movimentacoes-materiais/cadastrar-movimentacoes-materiais.component';
import { MovimentacoesMateriaisComponent } from './movimentacoes-materiais.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';


@NgModule({
  declarations: [
    MovimentacoesMateriaisComponent,
    CadastrarMovimentacoesMateriaisComponent
  ],
  imports: [
    CommonModule,
    MovimentacoesMateriaisRoutingModule,
    MaterialCommonModule
  ]
})
export class MovimentacoesMateriaisModule { }
