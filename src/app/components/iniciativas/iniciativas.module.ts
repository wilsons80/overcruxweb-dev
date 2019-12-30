import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CadastrarIniciativasComponent } from './cadastrar-iniciativas/cadastrar-iniciativas.component';
import { IniciativasRoutingModule } from './iniciativas-routing.module';
import { IniciativasComponent } from './iniciativas.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';



@NgModule({
  declarations: [IniciativasComponent, CadastrarIniciativasComponent],
  imports: [
    CommonModule,
    IniciativasRoutingModule,
    MaterialCommonModule
  ]
})
export class IniciativasModule { }
