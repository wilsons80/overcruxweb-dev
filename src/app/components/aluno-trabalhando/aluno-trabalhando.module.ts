import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlunoTrabalhandoRoutingModule } from './aluno-trabalhando-routing.module';
import { AlunoTrabalhandoComponent } from './aluno-trabalhando.component';
import { CadastrarAlunoTrabalhandoComponent } from './cadastrar-aluno-trabalhando/cadastrar-aluno-trabalhando.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { DadosAlunoModule } from '../common/dados-aluno/dados-aluno.module';
import { ComboBeneficiarioModule } from '../common/combo-beneficiario/combo-beneficiario.module';
import { ComboPesquisavelModule } from '../common/combo-pesquisavel/combo-pesquisavel.module';



@NgModule({
  declarations: [AlunoTrabalhandoComponent, CadastrarAlunoTrabalhandoComponent],
  imports: [
    CommonModule,
    AlunoTrabalhandoRoutingModule,
    MaterialCommonModule,
    DadosAlunoModule,
    ComboBeneficiarioModule,
    ComboPesquisavelModule
  ]
})
export class AlunoTrabalhandoModule { }
