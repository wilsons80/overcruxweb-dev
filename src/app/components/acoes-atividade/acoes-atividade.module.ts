import { DadosAtividadeModule } from './../common/dados-atividade/dados-atividade.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { AcoesAtividadeRoutingModule } from './acoes-atividade-routing.module';
import { AcoesAtividadeComponent } from './acoes-atividade.component';
import { CadastrarAcoesAtividadeComponent } from './cadastrar-acoes-atividade/cadastrar-acoes-atividade.component';
import { FormularioAcaoOficinaComponent } from './formulario-acao-oficina/formulario-acao-oficina.component';
import { MateriaisAcoesComponent } from './materiais-acoes/materiais-acoes.component';
import { CadastrarMateriaisAcaoComponent } from './cadastrar-materiais-acao/cadastrar-materiais-acao.component';
import { ListarMateriaisAcaoComponent } from './listar-materiais-acao/listar-materiais-acao.component';
import { MatExpansionModule, MatTabsModule } from '@angular/material';
import { NgxCurrencyModule } from 'ngx-currency';



@NgModule({
  declarations: [CadastrarAcoesAtividadeComponent,
                 AcoesAtividadeComponent,
                 FormularioAcaoOficinaComponent,
                 MateriaisAcoesComponent,
                 CadastrarMateriaisAcaoComponent,
                 ListarMateriaisAcaoComponent],
  imports: [
    CommonModule,
    AcoesAtividadeRoutingModule,
    MaterialCommonModule,
    DadosAtividadeModule,
    MatExpansionModule,
    MatTabsModule,
    NgxCurrencyModule,
  ]
})
export class AcoesAtividadeModule { }
