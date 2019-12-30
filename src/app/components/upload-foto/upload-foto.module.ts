import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadFotoRoutingModule } from './upload-foto-routing.module';
import { UploadFotoComponent } from './upload-foto.component';
import { MatButtonModule, MatIconModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, MatTableModule, MatListModule, MatDatepickerModule, MatPaginatorModule, MatTooltipModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedPipesModule } from 'src/app/pipes/shared-pipes.module';
import { ImageCropperModule } from 'ngx-image-cropper';


@NgModule({
  declarations: [  UploadFotoComponent],
  imports: [
    CommonModule,
    UploadFotoRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    TextMaskModule,
    MatListModule,
    FlexLayoutModule,
    SharedPipesModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatTooltipModule,
    ImageCropperModule
  ]
})
export class UploadFotoModule { }
