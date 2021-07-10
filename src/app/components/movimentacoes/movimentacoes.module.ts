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
import { NgxCurrencyModule } from 'ngx-currency';
import { FormularioRateioComponent } from './cadastrar-movimentacoes/formulario-rateio/formulario-rateio.component';
import { FormularioRateioUnidadeComponent } from './cadastrar-movimentacoes/formulario-rateio-unidade/formulario-rateio-unidade.component';
import { TableCellModule } from '../common/table-cell/table-cell.module';
import { ComboPesquisavelModule } from '../common/combo-pesquisavel/combo-pesquisavel.module';
import { FormularioReembolsoComponent } from './cadastrar-movimentacoes/formulario-reembolso/formulario-reembolso.component';
import { FormularioRateioPagamentoComponent } from './cadastrar-movimentacoes/formulario-rateio-pagamento/formulario-rateio-pagamento.component';
import { FormularioTributoComponent } from './cadastrar-movimentacoes/formulario-tributo/formulario-tributo.component';
import { TableRateiosProgramaProjetoComponent } from './table-rateios-programa-projeto/table-rateios-programa-projeto.component';
import { QtdServicosPendentesComponent } from './qtd-servicos-pendentes-cell/qtd-servicos-pendentes-cell.component';
import { ComboProgramaModule } from '../common/combo-programa/combo-programa.module';
import { ComboProjetoModule } from '../common/combo-projeto/combo-projeto.module';
import { FormularioRateioCategoriaComponent } from './cadastrar-movimentacoes/formulario-rateio-categoria/formulario-rateio-categoria.component';
import { CategoriasMovimentosComponent } from './cadastrar-movimentacoes/categorias-movimentos/categorias-movimentos.component';
import { ComboRubricaModule } from '../common/combo-rubrica/combo-rubrica.module';


@NgModule({
  declarations: [MovimentacoesComponent, 
                 CadastrarMovimentacoesComponent, 
                 DadosMovimentacaoComponent, 
                 ItensMovimentacaoComponent, 
                 FaturasMovimentacaoComponent, 
                 PagamentosMovimentacaoComponent, 
                 FormularioRateioComponent, 
                 FormularioRateioUnidadeComponent, 
                 FormularioReembolsoComponent, 
                 FormularioRateioPagamentoComponent, 
                 FormularioTributoComponent, 
                 TableRateiosProgramaProjetoComponent,
                 QtdServicosPendentesComponent,
                 CategoriasMovimentosComponent,
                 FormularioRateioCategoriaComponent],
  imports: [
    CommonModule,
    MovimentacoesRoutingModule,
    MaterialCommonModule,
    NgxCurrencyModule,
    TableCellModule,
    ComboPesquisavelModule,
    ComboProgramaModule,
    ComboProjetoModule,
    ComboRubricaModule
  ]
})
export class MovimentacoesModule { }
