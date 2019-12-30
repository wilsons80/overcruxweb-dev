import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { CadastrarUnidadeComponent } from './cadastrar-unidade/cadastrar-unidade.component';
import { EscolherUnidadeComponent } from './escolher-unidade/escolher-unidade.component';
import { UnidadeRoutingModule } from './unidade-routing.module';
import { UnidadeComponent } from './unidade.component';
import { CadastroEnderecoModule } from '../common/cadastro-endereco/cadastro-endereco.module';


@NgModule({
  declarations: [
    EscolherUnidadeComponent
    , UnidadeComponent
    , CadastrarUnidadeComponent

  ],
  imports: [
    CommonModule,
    UnidadeRoutingModule,
    MaterialCommonModule,
    SharedDirectivesModule,
    CadastroEnderecoModule
  ],

})
export class UnidadeModule { }
