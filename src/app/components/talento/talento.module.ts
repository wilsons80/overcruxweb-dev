import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialCommonModule } from './../../material-modules/material-common.module';
import { DadosFuncionarioModule } from './../common/dados-funcionario/dados-funcionario.module';
import { CadastrarTalentoComponent } from './cadastrar-talento/cadastrar-talento.component';
import { TalentoRoutingModule } from './talento-routing.module';
import { TalentoComponent } from './talento.component';



@NgModule({
  declarations: [TalentoComponent, CadastrarTalentoComponent],
  imports: [
    CommonModule,
    TalentoRoutingModule,
    MaterialCommonModule,
    DadosFuncionarioModule
  ]
})
export class TalentoModule { }
