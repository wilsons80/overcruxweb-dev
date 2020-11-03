import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovimentacoesMateriaisRoutingModule } from './movimentacoes-materiais-routing.module';
import { CadastrarMovimentacoesMateriaisComponent } from './cadastrar-movimentacoes-materiais/cadastrar-movimentacoes-materiais.component';
import { MovimentacoesMateriaisComponent } from './movimentacoes-materiais.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { DadosMovimentacoesMateriaisComponent } from './cadastrar-movimentacoes-materiais/dados-movimentacoes-materiais/dados-movimentacoes-materiais.component';
import { ItensMovimentacoesMateriaisComponent } from './cadastrar-movimentacoes-materiais/itens-movimentacoes-materiais/itens-movimentacoes-materiais.component';
import { ComboProgramaModule } from '../common/combo-programa/combo-programa.module';
import { ComboProjetoModule } from '../common/combo-projeto/combo-projeto.module';


@NgModule({
  declarations: [
    MovimentacoesMateriaisComponent,
    CadastrarMovimentacoesMateriaisComponent,
    DadosMovimentacoesMateriaisComponent,
    ItensMovimentacoesMateriaisComponent
  ],
  imports: [
    CommonModule,
    MovimentacoesMateriaisRoutingModule,
    MaterialCommonModule,
    ComboProgramaModule,
    ComboProjetoModule
  ]
})
export class MovimentacoesMateriaisModule { }
