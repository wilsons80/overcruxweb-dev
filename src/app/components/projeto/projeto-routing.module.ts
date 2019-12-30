import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CadastrarProjetoComponent } from './cadastrar-projeto/cadastrar-projeto.component';
import { ProjetoComponent } from './projeto.component';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';


const routes: Routes = [
  { path: 'projeto/cadastrar', component: CadastrarProjetoComponent, canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.PROJETO}  },
  { path: 'projeto', component: ProjetoComponent, canActivate: [AuthGuard] ,resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.PROJETO} },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjetoRoutingModule { }
