
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { NovaSenhaComponent } from './nova-senha.component';


const routes: Routes = [
  { path: 'novasenha', component: NovaSenhaComponent,canActivate: [AuthGuard]},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NovaSenhaRoutingModule { }
