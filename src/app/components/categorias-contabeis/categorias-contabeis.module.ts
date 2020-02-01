import { CategoriasContabeisRoutingModule } from './categorias-contabeis-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriasContabeisComponent } from './categorias-contabeis.component';
import { CadastrarCategoriasContabeisComponent } from './cadastrar-categorias-contabeis/cadastrar-categorias-contabeis.component';



@NgModule({
  declarations: [CategoriasContabeisComponent, CadastrarCategoriasContabeisComponent],
  imports: [
    CommonModule,
    CategoriasContabeisRoutingModule
  ]
})
export class CategoriasContabeisModule { }
