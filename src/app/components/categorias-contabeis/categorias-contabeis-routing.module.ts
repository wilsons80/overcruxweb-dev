import { CategoriasContabeisComponent } from './categorias-contabeis.component';
import { CadastrarCategoriasContabeisComponent } from './cadastrar-categorias-contabeis/cadastrar-categorias-contabeis.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { NgModule } from '@angular/core';


const routes: Routes = [
  {path: 'categoriascontabeis/cadastrar', component: CadastrarCategoriasContabeisComponent},
  {path: 'categoriascontabeis', component: CategoriasContabeisComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasContabeisRoutingModule { }
