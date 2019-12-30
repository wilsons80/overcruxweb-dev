import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ObjetivoRoutingModule } from './objetivo-routing.module';
import { ObjetivoComponent } from './objetivo.component';
import { CadastrarObjetivoComponent } from './cadastrar-objetivo/cadastrar-objetivo.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';

@NgModule({
  declarations: [ObjetivoComponent, CadastrarObjetivoComponent],
  imports: [
    CommonModule,
    ObjetivoRoutingModule,
    MaterialCommonModule,
  ]
})
export class ObjetivoModule { }
