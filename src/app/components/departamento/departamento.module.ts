import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { DadosUnidadeModule } from '../common/dados-unidade/dados-unidade.module';
import { DadosDepartamentoModule } from './../common/dados-departamento/dados-departamento.module';
import { CadastrarDepartamentoComponent } from './cadastrar-departamento/cadastrar-departamento.component';
import { DepartamentoRoutingModule } from './departamento-routing.module';
import { DepartamentoComponent } from './departamento.component';



@NgModule({
  declarations: [
    DepartamentoComponent,
    CadastrarDepartamentoComponent,
  ],
  imports: [
    CommonModule,
    DepartamentoRoutingModule,
    MaterialCommonModule,
    DadosUnidadeModule,
    DadosDepartamentoModule
  ],
  exports: []
})
export class DepartamentoModule { }
