import { NgModule } from '@angular/core';
import { CnpjValidatorDirective } from '../validacao/cnpj-validator.directive';
import { CpfValidatorDirective } from '../validacao/cpf-validator.directive';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    CnpjValidatorDirective,
    CpfValidatorDirective,
  ],

  exports: [
    CnpjValidatorDirective,
    CpfValidatorDirective,
  ],

  imports: [
    CommonModule
  ]
})
export class SharedDirectivesModule { }
