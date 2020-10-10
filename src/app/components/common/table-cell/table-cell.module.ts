import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { ProjetoProgramaCellComponent } from './projeto-programa-cell/projeto-programa-cell.component';
import { CategoriasCellComponent } from './categorias-cell/categorias-cell.component';
import { ProximasFaturaCellComponent } from '././proximas-fatura-cell/proximas-fatura-cell.component';



@NgModule({
  declarations: [ProjetoProgramaCellComponent, 
                 CategoriasCellComponent, 
                 ProximasFaturaCellComponent],
  imports: [
    CommonModule,
    MaterialCommonModule,
    FlexLayoutModule,
  ],
  exports: [ProjetoProgramaCellComponent,
            CategoriasCellComponent, 
            ProximasFaturaCellComponent]
})
export class TableCellModule { }
