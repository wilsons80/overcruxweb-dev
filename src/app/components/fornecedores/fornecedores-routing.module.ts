import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';
import { CadastrarFornecedoresComponent } from './fornecedores-doadores/cadastrar-fornecedores.component';
import { FornecedoresComponent } from './fornecedores.component';


const routes: Routes = [
  { path: 'fornecedores/cadastrar', component: CadastrarFornecedoresComponent, canActivate: [AuthGuard], resolve: { perfilAcesso: AcessoModuloResolver }, data: { modulo: Modulos.FORNECEDORES } },
  { path: 'fornecedores', component: FornecedoresComponent, canActivate: [AuthGuard], resolve: { perfilAcesso: AcessoModuloResolver }, data: { modulo: Modulos.FORNECEDORES } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FornecedoresRoutingModule { }
