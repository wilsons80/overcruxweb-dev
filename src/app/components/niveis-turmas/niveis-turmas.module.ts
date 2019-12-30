import { MaterialCommonModule } from './../../material-modules/material-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NiveisTurmasRoutingModule } from './niveis-turmas-routing.module';
import { CadastrarNiveisTurmasComponent } from './cadastrar-niveis-turmas/cadastrar-niveis-turmas.component';
import { NiveisTurmasComponent } from './niveis-turmas.component';


@NgModule({
  declarations: [CadastrarNiveisTurmasComponent, NiveisTurmasComponent],
  imports: [
    CommonModule,
    NiveisTurmasRoutingModule,
    MaterialCommonModule
  ]
})
export class NiveisTurmasModule { }
