import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';
import { CadastrarBeneficilSocialComponent } from './cadastrar-beneficio-social/cadastrar-beneficil-social.component';
import { BeneficilSocialComponent } from './beneficil-social.component';


const routes: Routes = [
  { path: 'beneficiossociais/cadastrar', component: CadastrarBeneficilSocialComponent, canActivate: [AuthGuard], resolve: { perfilAcesso: AcessoModuloResolver }, data: { modulo: Modulos.BENEFICIOS_SOCIAIS } },
  { path: 'beneficiossociais', component: BeneficilSocialComponent, canActivate: [AuthGuard], resolve: { perfilAcesso: AcessoModuloResolver }, data: { modulo: Modulos.BENEFICIOS_SOCIAIS } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeneficilSocialRoutingModule { }
