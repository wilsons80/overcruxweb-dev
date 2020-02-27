import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovaSenhaComponent } from './nova-senha.component';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';


import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { NovaSenhaRoutingModule } from './nova-senha-routing.module';



@NgModule({
  declarations: [NovaSenhaComponent],
  imports: [
    CommonModule,
    NovaSenhaRoutingModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    FlexLayoutModule,
    MatButtonModule,
    RouterModule,
    MatDialogModule,
    MatToolbarModule
    
  ]
})
export class NovaSenhaModule { 

}
