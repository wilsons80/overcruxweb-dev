import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { ComboPessoaFisicaModule } from '../common/combo-pessoa-fisica/combo-pessoa-fisica.module';
import { DadosAlunoModule } from '../common/dados-aluno/dados-aluno.module';
import { ComboEmpresaModule } from './../common/combo-empresa/combo-empresa.module';
import { ComboPesquisavelModule } from './../common/combo-pesquisavel/combo-pesquisavel.module';
import { DadosPessoaFisicaModule } from './../common/dados-pessoa/dados-pessoa-fisica.module';
import { CadastrarBeneficilSocialComponent } from './cadastrar-beneficio-social/cadastrar-beneficil-social.component';
import { BeneficilSocialRoutingModule } from './beneficil-social-routing.module';
import { BeneficilSocialComponent } from './beneficil-social.component';



@NgModule({
  declarations: [BeneficilSocialComponent, CadastrarBeneficilSocialComponent],
  imports: [
    CommonModule,
    BeneficilSocialRoutingModule,
    MaterialCommonModule,
    DadosAlunoModule,
    DadosPessoaFisicaModule,
    ComboPessoaFisicaModule,
    ComboEmpresaModule,
    ComboPesquisavelModule

  ]
})
export class BeneficilSocialModule { }
