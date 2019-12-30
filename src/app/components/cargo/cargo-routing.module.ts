import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarCargoComponent } from './cadastrar-cargo/cadastrar-cargo.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CargoComponent } from './cargo.component';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';


const routes: Routes = [
  { path: 'cargo/cadastrar', component: CadastrarCargoComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.CARGO} },
  { path: 'cargo', component: CargoComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.CARGO} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CargoRoutingModule { }
