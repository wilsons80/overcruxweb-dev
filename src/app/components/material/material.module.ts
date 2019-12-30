import { NgModule } from '@angular/core';
import { MaterialComponent } from './material.component';
import { CommonModule } from '@angular/common';
import { MaterialRoutingModule } from './material-routing.module';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { CadastrarMaterialComponent } from './cadastrar-material/cadastrar-material.component';


@NgModule({
  declarations: [
    MaterialComponent
   ,CadastrarMaterialComponent
  
  ],
  imports: [
    CommonModule,
    MaterialRoutingModule,
    MaterialCommonModule
  ]
})
export class MaterialModule { }
