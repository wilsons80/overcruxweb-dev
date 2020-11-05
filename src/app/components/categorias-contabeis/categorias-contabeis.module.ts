import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { CategoriasContabeisRoutingModule } from './categorias-contabeis-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriasContabeisComponent } from './categorias-contabeis.component';
import { CadastrarCategoriasContabeisComponent } from './cadastrar-categorias-contabeis/cadastrar-categorias-contabeis.component';
import { ComboPesquisavelModule } from '../common/combo-pesquisavel/combo-pesquisavel.module';



@NgModule({
  declarations: [CategoriasContabeisComponent, CadastrarCategoriasContabeisComponent],
  imports: [
    CommonModule,
    CategoriasContabeisRoutingModule,
    MaterialCommonModule,
    ComboPesquisavelModule
  ]
})
export class CategoriasContabeisModule { }
