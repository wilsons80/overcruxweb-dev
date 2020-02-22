import { ParceriasCategoriasModule } from './../common/parcerias-categorias/parcerias-categorias.module';
import { ContasCentrosCustoModule } from './../common/contas-centros-custo/contas-centros-custo.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxCurrencyModule } from 'ngx-currency';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { DadosFuncionarioModule } from './../common/dados-funcionario/dados-funcionario.module';
import { UnidadesMultiplasModule } from './../common/unidades-multiplas/unidades-multiplas.module';
import { CadastrarProgramasComponent } from './cadastrar-programas/cadastrar-programas.component';
import { ColaboradoresProgramaComponent } from './cadastrar-programas/colaboradores-programa/colaboradores-programa.component';
import { ComposicaoRhProgramaComponent } from './cadastrar-programas/composicao-rh-programa/composicao-rh-programa.component';
import { DadosProgramaComponent } from './cadastrar-programas/dados-programa/dados-programa.component';
import { DadosParceiroProgramaComponent } from './cadastrar-programas/parcerias-programa/dados-parceiro-programa/dados-parceiro-programa.component';
import { MateriaisProgramaComponent } from './cadastrar-programas/parcerias-programa/materiais-programa/materiais-programa.component';
import { ParceriasProgramaComponent } from './cadastrar-programas/parcerias-programa/parcerias-programa.component';
import { ProgramasRoutingModule } from './programas-routing.module';
import { ProgramasComponent } from './programas.component';



@NgModule({
  declarations: [
    ProgramasComponent
    , CadastrarProgramasComponent
    , DadosProgramaComponent
    , ComposicaoRhProgramaComponent
    , ColaboradoresProgramaComponent
    , DadosParceiroProgramaComponent
    , MateriaisProgramaComponent
    , ParceriasProgramaComponent
  ],
  imports: [
    CommonModule,
    ProgramasRoutingModule,
    MaterialCommonModule,
    DadosFuncionarioModule,
    UnidadesMultiplasModule,
    NgxCurrencyModule,
    ContasCentrosCustoModule,
    ParceriasCategoriasModule
  ]
})
export class ProgramasModule { }
