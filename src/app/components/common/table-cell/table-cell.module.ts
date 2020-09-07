import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { ProjetoProgramaCellComponent } from './projeto-programa-cell/projeto-programa-cell.component';



@NgModule({
  declarations: [ProjetoProgramaCellComponent],
  imports: [
    CommonModule,
    MaterialCommonModule,
    FlexLayoutModule,
  ],
  exports: [ProjetoProgramaCellComponent]
})
export class TableCellModule { }
