import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { CadastrarUsuarioComponent } from './cadastrar-usuario/cadastrar-usuario.component';
import { PessoaFisicaModule } from '../common/pessoa-fisica/pessoa-fisica.module';
import { DadosUsuarioComponent } from './dados-usuario/dados-usuario.component';
import { UnidadeComponent } from './unidade/unidade.component';
import { MatExpansionModule } from '@angular/material';


@NgModule({
  declarations: [UsuarioComponent, CadastrarUsuarioComponent, DadosUsuarioComponent, UnidadeComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    PessoaFisicaModule,
    MaterialCommonModule,
    MatExpansionModule
  ]
})
export class UsuarioModule { }
