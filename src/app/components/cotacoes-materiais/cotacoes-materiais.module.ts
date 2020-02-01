import { NgxCurrencyModule } from 'ngx-currency';
import { CotacoesMateriaisComponent } from './cotacoes-materiais.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CotacoesMateriaisRoutingModule } from './cotacoes-materiais-routing.module';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { CadastrarCotacoesMateriaisComponent } from './cadastrar-cotacoes-materiais/cadastrar-cotacoes-materiais.component';


@NgModule({
  declarations: [
    CotacoesMateriaisComponent,
    CadastrarCotacoesMateriaisComponent
  ],
  imports: [
    CommonModule,
    CotacoesMateriaisRoutingModule,
    MaterialCommonModule,
    NgxCurrencyModule
  ]
})
export class CotacoesMateriaisModule { }
