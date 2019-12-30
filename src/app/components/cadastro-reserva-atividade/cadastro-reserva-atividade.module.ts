import { DadosAtividadeModule } from './../common/dados-atividade/dados-atividade.module';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroReservaAtividadeRoutingModule } from './cadastro-reserva-atividade-routing.module';
import { CadastrarCadastroReservaAtividadeComponent } from './cadastrar-cadastro-reserva-atividade/cadastrar-cadastro-reserva-atividade.component';
import { CadastroReservaAtividadeComponent } from './cadastro-reserva-atividade.component';
import { NgxCurrencyModule } from 'ngx-currency';


@NgModule({
  declarations: [CadastrarCadastroReservaAtividadeComponent, CadastroReservaAtividadeComponent],
  imports: [
    CommonModule,
    CadastroReservaAtividadeRoutingModule,
    MaterialCommonModule,
    NgxCurrencyModule,
    DadosAtividadeModule
  ]
})
export class CadastroReservaAtividadeModule { }
