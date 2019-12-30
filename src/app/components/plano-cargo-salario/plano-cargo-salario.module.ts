import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanoCargoSalarioRoutingModule } from './plano-cargo-salario-routing.module';
import { CadastrarPlanoCargoSalarioComponent } from './cadastrar-plano-cargo-salario/cadastrar-plano-cargo-salario.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { PlanoCargoSalarioComponent } from './plano-cargo-salario.component';


@NgModule({
  declarations: [CadastrarPlanoCargoSalarioComponent, PlanoCargoSalarioComponent],
  imports: [
    CommonModule,
    PlanoCargoSalarioRoutingModule,
    MaterialCommonModule
  ]
})
export class PlanoCargoSalarioModule { }
