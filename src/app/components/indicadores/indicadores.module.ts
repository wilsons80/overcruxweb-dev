import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndicadoresRoutingModule } from './indicadores-routing.module';
import { IndicadoresComponent } from './indicadores.component';
import { MatButtonModule, MatIconModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, MatTableModule, MatListModule, MatDatepickerModule, MatPaginatorModule, MatTooltipModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedPipesModule } from 'src/app/pipes/shared-pipes.module';
import { CadastrarIndicadoresComponent } from './cadastrar-indicadores/cadastrar-indicadores.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';


@NgModule({
  declarations: [IndicadoresComponent, CadastrarIndicadoresComponent],
  imports: [
    CommonModule,
    IndicadoresRoutingModule,
    MaterialCommonModule
  ]
})
export class IndicadoresModule { }
