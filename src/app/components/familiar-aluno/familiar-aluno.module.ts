import { DadosAlunoModule } from './../common/dados-aluno/dados-aluno.module';
import { CadastrarFamiliarAlunoComponent } from './cadastrar-familiar-aluno/cadastrar-familiar-aluno.component';
import { FamiliarAlunoComponent } from './familiar-aluno.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FamiliarAlunoRoutingModule } from './familiar-aluno-routing.module';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { PessoaFisicaModule } from '../common/pessoa-fisica/pessoa-fisica.module';
import { FamiliaresComponent } from './familiares/familiares.component';
import { EscolhaFamiliarComponent } from './escolha-familiar/escolha-familiar.component';
import { ParentescoComponent } from './parentesco/parentesco.component';
import { ProfissionalComponent } from './profissional/profissional.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { ResponsavelComponent } from './responsavel/responsavel.component';
import { CadastrarResponsavelComponent } from './responsavel/cadastrar-responsavel/cadastrar-responsavel.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ListaResponsaveisComponent } from './responsavel/lista-responsaveis/lista-responsaveis.component';
import { VulnerabilidadeComponent } from './vulnerabilidade/vulnerabilidade.component';
import { CadastrarVulnerabilidadeComponent } from './vulnerabilidade/cadastrar-vulnerabilidade/cadastrar-vulnerabilidade.component';
import { ListarVulnerabilidadeComponent } from './vulnerabilidade/listar-vulnerabilidade/listar-vulnerabilidade.component';


@NgModule({
  declarations: [FamiliarAlunoComponent,
                 CadastrarFamiliarAlunoComponent,
                 FamiliaresComponent,
                 EscolhaFamiliarComponent,
                 ParentescoComponent,
                 ProfissionalComponent,
                 ResponsavelComponent,
                 CadastrarResponsavelComponent,
                 ListaResponsaveisComponent,
                 VulnerabilidadeComponent,
                 CadastrarVulnerabilidadeComponent,
                 ListarVulnerabilidadeComponent],
  imports: [
    CommonModule,
    FamiliarAlunoRoutingModule,
    MaterialCommonModule,
    PessoaFisicaModule,
    NgxCurrencyModule,
    DadosAlunoModule,
    MatExpansionModule
  ]
})
export class FamiliarAlunoModule { }
