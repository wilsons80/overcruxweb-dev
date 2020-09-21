import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConciliacaoRoutingModule } from './conciliacao-routing.module';
import { ConciliacaoComponent } from './conciliacao.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';


@NgModule({
  declarations: [ConciliacaoComponent],
  imports: [
    CommonModule,
    ConciliacaoRoutingModule,
    MaterialCommonModule
  ]
})
export class ConciliacaoModule { }
