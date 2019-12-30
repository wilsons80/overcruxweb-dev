import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovaSenhaComponent } from './nova-senha.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule, MatInputModule, MatButtonModule, MatDialogModule, MatToolbarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { NovaSenhaRoutingModule } from './nova-senha-routing.module';



@NgModule({
  declarations: [NovaSenhaComponent],
  entryComponents: [],
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
