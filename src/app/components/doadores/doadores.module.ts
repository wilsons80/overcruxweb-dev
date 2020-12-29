import { ComboEmpresaModule } from './../common/combo-empresa/combo-empresa.module';
import { ComboPessoaFisica } from './../../core/combo-pessoa-fisica';
import { DadosPessoaFisicaModule } from './../common/dados-pessoa/dados-pessoa-fisica.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { DadosAlunoModule } from '../common/dados-aluno/dados-aluno.module';
import { ComboBeneficiarioModule } from '../common/combo-beneficiario/combo-beneficiario.module';
import { ComboPesquisavelModule } from '../common/combo-pesquisavel/combo-pesquisavel.module';
import { CadastrarDoadoresComponent } from './cadastrar-doadores/cadastrar-doadores.component';
import { DoadoresRoutingModule } from './doadores-routing.module';
import { DoadoresComponent } from './doadores.component';
import { ComboPessoaFisicaModule } from '../common/combo-pessoa-fisica/combo-pessoa-fisica.module';


@NgModule({
  declarations: [DoadoresComponent, CadastrarDoadoresComponent],
  imports: [
    CommonModule,
    DoadoresRoutingModule,
    MaterialCommonModule,
    DadosAlunoModule,
    DadosPessoaFisicaModule,
    ComboPessoaFisicaModule,
    ComboEmpresaModule

  ]
})
export class DoadoresModule { }
