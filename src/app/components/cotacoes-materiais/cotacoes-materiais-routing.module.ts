import { CotacoesMateriaisComponent } from './cotacoes-materiais.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarCotacoesMateriaisComponent } from './cadastrar-cotacoes-materiais/cadastrar-cotacoes-materiais.component';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  {path: 'cotacoesmateriais/cadastrar', component: CadastrarCotacoesMateriaisComponent},
  {path: 'cotacoesmateriais', component: CotacoesMateriaisComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CotacoesMateriaisRoutingModule { }
