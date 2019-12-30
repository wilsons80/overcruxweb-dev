import { MaterialCommonModule } from './../../material-modules/material-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CargoRoutingModule } from './cargo-routing.module';
import { CargoComponent } from './cargo.component';
import { CadastrarCargoComponent } from './cadastrar-cargo/cadastrar-cargo.component';


@NgModule({
  declarations: [
    CargoComponent, 
    CadastrarCargoComponent
  ],
  imports: [
    CommonModule,
    CargoRoutingModule,
    MaterialCommonModule
  ]
})
export class CargoModule { }
