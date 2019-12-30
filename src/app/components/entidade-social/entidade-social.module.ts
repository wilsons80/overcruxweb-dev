import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { CadastrarEntidadeSocialComponent } from './cadastrar-entidade-social/cadastrar-entidade-social.component';
import { EntidadeSocialRoutingModule } from './entidade-social-routing.module';
import { EntidadeSocialComponent } from './entidade-social.component';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';
import { CadastroEnderecoModule } from '../common/cadastro-endereco/cadastro-endereco.module';



@NgModule({
  declarations: [EntidadeSocialComponent, CadastrarEntidadeSocialComponent],
  imports: [
    CommonModule,
    EntidadeSocialRoutingModule,
    MaterialCommonModule,
    SharedDirectivesModule,
    CadastroEnderecoModule
  ]
})
export class EntidadeSocialModule { }
