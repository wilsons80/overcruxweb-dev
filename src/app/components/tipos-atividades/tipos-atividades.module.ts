import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TiposAtividadesRoutingModule } from './tipos-atividades-routing.module';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { CadastrarTiposAtividadesComponent } from './cadastrar-tipos-atividades/cadastrar-tipos-atividades.component';
import { TiposAtividadesComponent } from './tipos-atividades.component';


@NgModule({
  declarations: [TiposAtividadesComponent,CadastrarTiposAtividadesComponent],
  imports: [
    CommonModule,
    TiposAtividadesRoutingModule,
    MaterialCommonModule,
  ]
})
export class TiposAtividadesModule { }
