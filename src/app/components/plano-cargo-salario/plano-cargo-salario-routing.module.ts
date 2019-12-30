import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanoCargoSalarioComponent } from './plano-cargo-salario.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';
import { CadastrarPlanoCargoSalarioComponent } from './cadastrar-plano-cargo-salario/cadastrar-plano-cargo-salario.component';


const routes: Routes = [
  { path: 'planocargosalario/cadastrar', component: CadastrarPlanoCargoSalarioComponent, canActivate: [AuthGuard], resolve: { perfilAcesso: AcessoModuloResolver }, data: { modulo: Modulos.PERSPECTIVA } },
  { path: 'planocargosalario', component: PlanoCargoSalarioComponent, canActivate: [AuthGuard], resolve: { perfilAcesso: AcessoModuloResolver }, data: { modulo: Modulos.PERSPECTIVA } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanoCargoSalarioRoutingModule { }
