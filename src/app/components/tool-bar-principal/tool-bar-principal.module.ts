import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolBarPrincipalComponent } from './tool-bar-principal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';

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
