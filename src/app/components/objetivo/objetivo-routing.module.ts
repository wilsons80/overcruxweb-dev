import { CadastrarObjetivoComponent } from './cadastrar-objetivo/cadastrar-objetivo.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObjetivoComponent } from './objetivo.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';


const routes: Routes = [
  { path: 'objetivo/cadastrar', component: CadastrarObjetivoComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.OBJETIVO} },
  { path: 'objetivo', component: ObjetivoComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.OBJETIVO} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObjetivoRoutingModule {
}
