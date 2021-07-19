import { NgxCurrencyModule } from 'ngx-currency';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovimentacoesContabeisRoutingModule } from './movimentacoes-contabeis-routing.module';
import { CadastrarMovimentacoesContabeisComponent } from './cadastrar-movimentacoes-contabeis/cadastrar-movimentacoes-contabeis.component';
import { ComboRubricaModule } from '../common/combo-rubrica/combo-rubrica.module';
import { MovimentacoesContabeisComponent } from './movimentacoes-contabeis.component';
import { ComboProgramaModule } from '../common/combo-programa/combo-programa.module';
import { ComboProjetoModule } from '../common/combo-projeto/combo-projeto.module';


@NgModule({
  declarations: [
    MovimentacoesContabeisComponent,
    CadastrarMovimentacoesContabeisComponent
  ],
  imports: [
    CommonModule,
    MovimentacoesContabeisRoutingModule,
    MaterialCommonModule,
    NgxCurrencyModule,
    ComboRubricaModule,
    ComboProgramaModule,
    ComboProjetoModule,
    ComboRubricaModule
  ]
})
export class MovimentacoesContabeisModule { }
