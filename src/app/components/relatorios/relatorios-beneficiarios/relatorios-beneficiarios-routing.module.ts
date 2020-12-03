import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Modulos } from 'src/app/core/modulos';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { RelatoriosBeneficiariosComponent } from './relatorios-beneficiarios.component';


const routes: Routes = [
  { path: 'relbeneficiarios', component: RelatoriosBeneficiariosComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.FICHA_MATRICULA} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatoriosBeneficiariosRoutingModule { }
