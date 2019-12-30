import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadFotoComponent } from './upload-foto.component';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  { path: 'upload', component: UploadFotoComponent,  canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadFotoRoutingModule { }
