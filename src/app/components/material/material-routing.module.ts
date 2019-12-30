import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Modulos } from 'src/app/core/modulos';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { MaterialComponent } from './material.component';
import { CadastrarMaterialComponent } from './cadastrar-material/cadastrar-material.component';


const routes: Routes = [
  { path: 'material', component: MaterialComponent, canActivate: [AuthGuard], resolve: { perfilAcesso: AcessoModuloResolver }, data: { modulo: Modulos.MATERIAL } },
  { path: 'material/cadastrar', component: CadastrarMaterialComponent, canActivate: [AuthGuard], resolve: { perfilAcesso: AcessoModuloResolver }, data: { modulo: Modulos.MATERIAL } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialRoutingModule { }
