import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OficinaRoutingModule } from './oficina-routing.module';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { OficinaComponent } from './oficina.component';
import { CadastrarOficinaComponent } from './cadastrar-oficina/cadastrar-oficina.component';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';


import { NgxCurrencyModule } from 'ngx-currency';
import { MateriaisOficinaComponent } from './materiais-oficina/materiais-oficina.component';
import { CadastrarMateriaisComponent } from './materiais-oficina/cadastrar-materiais/cadastrar-materiais.component';
import { ListarMateriaisComponent } from './materiais-oficina/listar-materiais/listar-materiais.component';
import { DadosAtividadeComponent } from './dados-atividade/dados-atividade.component';
import { ColaboradoresAtividadeComponent } from './colaboradores-atividade/colaboradores-atividade.component';
import { CadastrarColaboradoresAtividadeComponent } from './colaboradores-atividade/cadastrar-colaboradores-atividade/cadastrar-colaboradores-atividade.component';
import { ListarColaboradoresAtividadeComponent } from './colaboradores-atividade/listar-colaboradores-atividade/listar-colaboradores-atividade.component';
import { DadosFuncionarioModule } from '../common/dados-funcionario/dados-funcionario.module';


@NgModule({
  declarations: [OficinaComponent,
                 CadastrarOficinaComponent,
                 MateriaisOficinaComponent,
                 CadastrarMateriaisComponent,
                 ListarMateriaisComponent,
                 DadosAtividadeComponent,
                 ColaboradoresAtividadeComponent,
                 CadastrarColaboradoresAtividadeComponent,
                 ListarColaboradoresAtividadeComponent],
  imports: [
    CommonModule,
    OficinaRoutingModule,
    MaterialCommonModule,
    MatExpansionModule,
    MatTabsModule,
    NgxCurrencyModule,
    DadosFuncionarioModule
  ]
})
export class OficinaModule { }
