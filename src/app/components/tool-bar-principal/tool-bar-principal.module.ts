import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolBarPrincipalComponent } from './tool-bar-principal.component';
import { MatToolbarModule, MatIconModule, MatMenuModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatSelectModule, MatOptionModule, MatProgressBarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ToolBarPrincipalComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
   MaterialCommonModule,
   RouterModule
  
  ],
  exports: [ToolBarPrincipalComponent]
})
export class ToolBarPrincipalModule { }
