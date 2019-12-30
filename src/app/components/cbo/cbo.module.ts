import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CboRoutingModule } from './cbo-routing.module';
import { CadastrarCboComponent } from './cadastrar-cbo/cadastrar-cbo.component';
import { CboComponent } from './cbo.component';


@NgModule({
  declarations: [
    CadastrarCboComponent,
    CboComponent
  ],
  imports: [
    CommonModule,
    CboRoutingModule,
    MaterialCommonModule
  ]
})
export class CboModule { }
