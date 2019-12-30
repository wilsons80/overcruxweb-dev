import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material';
import { LoadingPopupComponent } from './loading-popup.component';



@NgModule({
  declarations: [LoadingPopupComponent],
  entryComponents: [LoadingPopupComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
  ]
})
export class LoadingPopupModule { }
