import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstituicaoRoutingModule } from './instituicao-routing.module';
import { InstituicaoComponent } from './instituicao.component';
import { CadastrarInstituicaoComponent } from './cadastrar-instituicao/cadastrar-instituicao.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';

@NgModule({
  declarations: [InstituicaoComponent, CadastrarInstituicaoComponent],
  imports: [
    CommonModule,
    InstituicaoRoutingModule,
    MaterialCommonModule
  ]
})
export class InstituicaoModule { }
