import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DadosPessoaisComponent } from './dados-pessoais/dados-pessoais.component';
import { MatButtonModule} from '@angular/material';
import { EscolaridadeComponent } from './escolaridade/escolaridade.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { DadosProfissionaisComponent } from './dados-profissionais/dados-profissionais.component';
import { OutrasInformacoesComponent } from './outras-informacoes/outras-informacoes.component';
import { FuncionalComponent } from './funcional/funcional.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { AcademicoComponent } from './academico/academico.component';
import { EscolarComponent } from './escolar/escolar.component';
import { AtendimentoApoioComponent } from './atendimento-apoio/atendimento-apoio.component';
import { NgxCurrencyModule } from "ngx-currency";
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';
import { CadastroEnderecoModule } from '../cadastro-endereco/cadastro-endereco.module';

@NgModule({
  declarations: [
    DadosPessoaisComponent,
    EscolaridadeComponent,
    DocumentosComponent,
    DadosProfissionaisComponent,
    OutrasInformacoesComponent,
    FuncionalComponent,
    AcademicoComponent,
    EscolarComponent,
    AtendimentoApoioComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MaterialCommonModule,
    NgxCurrencyModule,
    SharedDirectivesModule,
    CadastroEnderecoModule
  ],
  exports:[
    DadosPessoaisComponent,
    EscolaridadeComponent,
    DocumentosComponent,
    DadosProfissionaisComponent,
    OutrasInformacoesComponent,
    FuncionalComponent,
    AcademicoComponent,
    EscolarComponent,
    AtendimentoApoioComponent
  ]
})
export class PessoaFisicaModule { }
