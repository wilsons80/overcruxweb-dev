import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerspectivaRoutingModule } from './perspectiva-routing.module';
import { PerspectivaComponent } from './perspectiva.component';


import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';

         

import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CadastrarPerspectivaComponent } from './cadastrar-perspectiva/cadastrar-perspectiva.component';
import { SharedPipesModule } from 'src/app/pipes/shared-pipes.module';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';


@NgModule({
  declarations: [PerspectivaComponent, CadastrarPerspectivaComponent],
  imports: [
    CommonModule,
    PerspectivaRoutingModule,
    MaterialCommonModule
  ]
})
export class PerspectivaModule { }
