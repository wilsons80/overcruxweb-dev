import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntidadeSocialComponent } from './entidade-social.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CadastrarEntidadeSocialComponent } from './cadastrar-entidade-social/cadastrar-entidade-social.component';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';


const routes: Routes = [
  { path: 'entidadesocial/cadastrar', component: CadastrarEntidadeSocialComponent,canActivate: [AuthGuard], resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.ENTIDADE_SOCIAL} },
  { path: 'entidadesocial', component: EntidadeSocialComponent,canActivate: [AuthGuard], resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.ENTIDADE_SOCIAL} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntidadeSocialRoutingModule { }
