import { MaterialCommonModule } from './../../material-modules/material-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovimentacoesRoutingModule } from './movimentacoes-routing.module';
import { MovimentacoesComponent } from './movimentacoes.component';
import { CadastrarMovimentacoesComponent } from './cadastrar-movimentacoes/cadastrar-movimentacoes.component';
import { DadosMovimentacaoComponent } from './cadastrar-movimentacoes/dados-movimentacao/dados-movimentacao.component';
import { ItensMovimentacaoComponent } from './cadastrar-movimentacoes/itens-movimentacao/itens-movimentacao.component';
import { FaturasMovimentacaoComponent } from './cadastrar-movimentacoes/faturas-movimentacao/faturas-movimentacao.component';
import { PagamentosMovimentacaoComponent } from './cadastrar-movimentacoes/pagamentos-movimentacao/pagamentos-movimentacao.component';


@NgModule({
  declarations: [MovimentacoesComponent, CadastrarMovimentacoesComponent, DadosMovimentacaoComponent, ItensMovimentacaoComponent, FaturasMovimentacaoComponent, PagamentosMovimentacaoComponent],
  imports: [
    CommonModule,
    MovimentacoesRoutingModule,
    MaterialCommonModule
  ]
})
export class MovimentacoesModule { }
