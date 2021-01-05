import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { ComboPessoaFisicaModule } from '../common/combo-pessoa-fisica/combo-pessoa-fisica.module';
import { DadosAlunoModule } from '../common/dados-aluno/dados-aluno.module';
import { ComboEmpresaModule } from '../common/combo-empresa/combo-empresa.module';
import { ComboPesquisavelModule } from '../common/combo-pesquisavel/combo-pesquisavel.module';
import { DadosPessoaFisicaModule } from '../common/dados-pessoa/dados-pessoa-fisica.module';
import { CadastrarFornecedoresComponent } from './fornecedores-doadores/cadastrar-fornecedores.component';
import { FornecedoresRoutingModule } from './fornecedores-routing.module';
import { FornecedoresComponent } from './fornecedores.component';



@NgModule({
  declarations: [FornecedoresComponent, CadastrarFornecedoresComponent],
  imports: [
    CommonModule,
    FornecedoresRoutingModule,
    MaterialCommonModule,
    DadosAlunoModule,
    DadosPessoaFisicaModule,
    ComboPessoaFisicaModule,
    ComboEmpresaModule,
    ComboPesquisavelModule
  ]
})
export class FornecedoresModule { }
