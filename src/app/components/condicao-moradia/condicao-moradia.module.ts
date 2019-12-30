import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CondicaoMoradiaRoutingModule } from './condicao-moradia-routing.module';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { CondicaoMoradiaComponent } from './condicao-moradia.component';
import { CadastrarCondicaoMoradiaComponent } from './cadastrar-condicao-moradia/cadastrar-condicao-moradia.component';


@NgModule({
  declarations: [CondicaoMoradiaComponent, CadastrarCondicaoMoradiaComponent],
  imports: [
    CommonModule,
    CondicaoMoradiaRoutingModule,
    MaterialCommonModule
  ]
})
export class CondicaoMoradiaModule { }
