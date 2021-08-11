import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { CadastrarEmpresaComponent } from './cadastrar-empresa/cadastrar-empresa.component';
import { EmpresaRoutingModule } from './empresa-routing.module';
import { EmpresaComponent } from './empresa.component';
import { CadastroEnderecoModule } from '../common/cadastro-endereco/cadastro-endereco.module';
import { ParceirasComponent } from './parceiras/parceiras.component';
import { FornecedorasComponent } from './fornecedoras/fornecedoras.component';
import { ClientesComponent } from './clientes/clientes.component';
import { CadastrarParceirasComponent } from './parceiras/cadastrar-parceiras/cadastrar-parceiras.component';
import { CadastrarFornecedorasComponent } from './fornecedoras/cadastrar-fornecedoras/cadastrar-fornecedoras.component';
import { CadastrarClientesComponent } from './clientes/cadastrar-clientes/cadastrar-clientes.component';
import { ComboEmpresaModule } from '../common/combo-empresa/combo-empresa.module';
import { ComboRubricaModule } from '../common/combo-rubrica/combo-rubrica.module';
import { FormularioCategoriaContabilComponent } from './formulario-categoria-contabil/formulario-categoria-contabil.component';



@NgModule({
  declarations: [EmpresaComponent, 
                 CadastrarEmpresaComponent, 
                 ParceirasComponent, 
                 FornecedorasComponent, 
                 ClientesComponent, 
                 CadastrarParceirasComponent, 
                 CadastrarFornecedorasComponent, 
                 CadastrarClientesComponent,
                 FormularioCategoriaContabilComponent],
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    MaterialCommonModule,
    SharedDirectivesModule,
    CadastroEnderecoModule,
    ComboEmpresaModule,
    ComboRubricaModule
  ]
})
export class EmpresaModule { }
