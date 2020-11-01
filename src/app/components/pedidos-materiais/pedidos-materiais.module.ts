import { MaterialCommonModule } from './../../material-modules/material-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosMateriaisRoutingModule } from './pedidos-materiais-routing.module';
import { PedidosMateriaisComponent } from './pedidos-materiais.component';
import { CadastrarPedidosMateriaisComponent } from './cadastrar-pedidos-materiais/cadastrar-pedidos-materiais.component';
import { DadosPedidosMateriaisComponent } from './cadastrar-pedidos-materiais/dados-pedidos-materiais/dados-pedidos-materiais.component';
import { ItensPedidosMateriaisComponent } from './cadastrar-pedidos-materiais/itens-pedidos-materiais/itens-pedidos-materiais.component';
import { ComboProjetoModule } from '../common/combo-projeto/combo-projeto.module';
import { ComboProgramaModule } from '../common/combo-programa/combo-programa.module';


@NgModule({
  declarations: [PedidosMateriaisComponent, CadastrarPedidosMateriaisComponent, DadosPedidosMateriaisComponent, ItensPedidosMateriaisComponent],
  imports: [
    CommonModule,
    PedidosMateriaisRoutingModule,
    MaterialCommonModule,
    ComboProjetoModule,
    ComboProgramaModule
  ]
})
export class PedidosMateriaisModule { }
