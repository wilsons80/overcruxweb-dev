import { MaterialCommonModule } from './../../material-modules/material-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstoquesRoutingModule } from './estoques-routing.module';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';
import { EstoquesComponent } from './estoques.component';


@NgModule({
  declarations: [EstoquesComponent],
  imports: [
    CommonModule,
    SharedDirectivesModule,
    MaterialCommonModule,
    EstoquesRoutingModule
  ]
})
export class EstoquesModule { }
