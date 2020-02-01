import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstituicaoRoutingModule } from './instituicao-routing.module';
import { InstituicaoComponent } from './instituicao.component';
import { CadastrarInstituicaoComponent } from './cadastrar-instituicao/cadastrar-instituicao.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { DadosInstituicaoComponent } from './cadastrar-instituicao/dados-instituicao/dados-instituicao.component';

@NgModule({
  declarations: [InstituicaoComponent, CadastrarInstituicaoComponent, DadosInstituicaoComponent],
  imports: [
    CommonModule,
    InstituicaoRoutingModule,
    MaterialCommonModule
  ]
})
export class InstituicaoModule { }
