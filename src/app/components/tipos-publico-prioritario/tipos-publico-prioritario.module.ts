import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { DadosAlunoModule } from '../common/dados-aluno/dados-aluno.module';
import { ComboBeneficiarioModule } from '../common/combo-beneficiario/combo-beneficiario.module';
import { ComboPesquisavelModule } from '../common/combo-pesquisavel/combo-pesquisavel.module';
import { CadastrarTiposPublicoPrioritarioComponent } from './cadastrar-situacao-ex-aluno/cadastrar-tipos-publico-prioritario.component';
import { TiposPublicoPrioritarioComponent } from './tipos-publico-prioritario.component';
import { TiposPublicoPrioritarioRoutingModule } from './tipos-publico-prioritario-routing.module';


@NgModule({
  declarations: [TiposPublicoPrioritarioComponent, CadastrarTiposPublicoPrioritarioComponent],
  imports: [
    CommonModule,
    TiposPublicoPrioritarioRoutingModule,
    MaterialCommonModule,
    DadosAlunoModule,
    ComboBeneficiarioModule,
    ComboPesquisavelModule

  ]
})
export class TiposPublicoPrioritarioModule { }
