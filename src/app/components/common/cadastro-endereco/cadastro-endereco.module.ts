import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { CadastroEnderecoComponent } from './cadastro-endereco.component';



@NgModule({
  declarations: [CadastroEnderecoComponent],
  imports: [
    CommonModule,
    MaterialCommonModule
  ],
  exports:[CadastroEnderecoComponent]
})
export class CadastroEnderecoModule { }
