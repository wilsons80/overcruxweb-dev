import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule, MatInputModule, MatButtonModule } from '@angular/material';
import { LoginComponent } from './login.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    FlexLayoutModule,
    MatButtonModule,
    RouterModule
  ]
})
export class LoginModule { }
