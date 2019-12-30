import { CursoFormacaoComponent } from './curso-formacao.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursoFormacaoRoutingModule } from './curso-formacao-routing.module';
import { CadastrarCursoFormacaoComponent } from './cadastrar-curso-formacao/cadastrar-curso-formacao.component';


@NgModule({
  declarations: [CursoFormacaoComponent, CadastrarCursoFormacaoComponent],
  imports: [
    CommonModule,
    CursoFormacaoRoutingModule,
    MaterialCommonModule
  ]
})
export class CursoFormacaoModule { }
