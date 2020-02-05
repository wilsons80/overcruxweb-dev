import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { ContasBancariasComponent } from './contas-bancarias.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContasBancariasRoutingModule } from './contas-bancarias-routing.module';
import { CadastrarContasBancariasComponent } from './cadastrar-contas-bancarias/cadastrar-contas-bancarias.component';


@NgModule({
  declarations: [
    ContasBancariasComponent,
    CadastrarContasBancariasComponent
  ],
  imports: [
    CommonModule,
    ContasBancariasRoutingModule,
    MaterialCommonModule
  ]
})
export class ContasBancariasModule { }
