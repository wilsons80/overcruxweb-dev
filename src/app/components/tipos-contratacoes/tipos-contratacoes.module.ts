import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TiposContratacoesRoutingModule } from './tipos-contratacoes-routing.module';
import { TiposContratacoesComponent } from './tipos-contratacoes.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { CadastrarTipoContratacoesComponent } from './cadastrar-tipo-contratacoes/cadastrar-tipo-contratacoes.component';


@NgModule({
  declarations: [TiposContratacoesComponent, CadastrarTipoContratacoesComponent],
  imports: [
    CommonModule,
    MaterialCommonModule,
    TiposContratacoesRoutingModule
  ]
})
export class TiposContratacoesModule { }
