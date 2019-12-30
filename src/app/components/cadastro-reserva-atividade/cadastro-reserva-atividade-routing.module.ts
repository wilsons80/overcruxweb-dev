import { CadastroReservaAtividadeComponent } from './cadastro-reserva-atividade.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarCadastroReservaAtividadeComponent } from './cadastrar-cadastro-reserva-atividade/cadastrar-cadastro-reserva-atividade.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';


const routes: Routes = [
  { path: 'cadastroreservaatividade/cadastrar', component: CadastrarCadastroReservaAtividadeComponent, canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.CADASTRO_RESERVA_ATIVIDADE}  },
  { path: 'cadastroreservaatividade', component: CadastroReservaAtividadeComponent, canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.CADASTRO_RESERVA_ATIVIDADE}  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroReservaAtividadeRoutingModule { }
