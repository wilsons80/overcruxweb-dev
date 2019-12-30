import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { DadosAlunoModule } from '../common/dados-aluno/dados-aluno.module';
import { CadastrarEncaminhamentoAlunoComponent } from './cadastrar-encaminhamento-aluno/cadastrar-encaminhamento-aluno.component';
import { EncaminhamentoAlunoRoutingModule } from './encaminhamento-aluno-routing.module';
import { EncaminhamentoAlunoComponent } from './encaminhamento-aluno.component';
import { DadosEntidadeSocialModule } from '../common/dados-entidade-social/dados-entidade-social.module';



@NgModule({
  declarations: [EncaminhamentoAlunoComponent, CadastrarEncaminhamentoAlunoComponent],
  imports: [
    CommonModule,
    EncaminhamentoAlunoRoutingModule,
    MaterialCommonModule,
    DadosEntidadeSocialModule,
    DadosAlunoModule
  ]
})
export class EncaminhamentoAlunoModule { }
