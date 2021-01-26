import { ClientesComponent } from './clientes/clientes.component';
import { FornecedorasComponent } from './fornecedoras/fornecedoras.component';
import { ParceirasComponent } from './parceiras/parceiras.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpresaComponent } from './empresa.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CadastrarEmpresaComponent } from './cadastrar-empresa/cadastrar-empresa.component';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';
import { CadastrarParceirasComponent } from './parceiras/cadastrar-parceiras/cadastrar-parceiras.component';
import { CadastrarFornecedorasComponent } from './fornecedoras/cadastrar-fornecedoras/cadastrar-fornecedoras.component';
import { CadastrarClientesComponent } from './clientes/cadastrar-clientes/cadastrar-clientes.component';



const routes: Routes = [
  { path: 'empresasparceiras',                component: ParceirasComponent,              canActivate: [AuthGuard], resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.EMPRESAS_PARCEIRAS} },
  { path: 'empresasfornecedoras',             component: FornecedorasComponent,           canActivate: [AuthGuard], resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.EMPRESAS_FORNECEDORAS} },
  { path: 'empresasclientes',                 component: ClientesComponent,               canActivate: [AuthGuard], resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.EMPRESAS_CLIENTES} },
  { path: 'empresasparceiras/cadastrar',      component: CadastrarParceirasComponent,     canActivate: [AuthGuard], resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.EMPRESAS_PARCEIRAS} },
  { path: 'empresasfornecedoras/cadastrar',   component: CadastrarFornecedorasComponent,  canActivate: [AuthGuard], resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.EMPRESAS_FORNECEDORAS} },
  { path: 'empresasclientes/cadastrar',       component: CadastrarClientesComponent,      canActivate: [AuthGuard], resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.EMPRESAS_CLIENTES} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaRoutingModule { }
