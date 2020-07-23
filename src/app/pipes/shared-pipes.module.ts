import { CnpjPipe } from './cnpj.pipe';
import { FormatTimePipe } from './format-time.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSimplesPipe } from './data-simples.pipe';
import { OrderByPipe } from './order-by.pipe';



@NgModule({
  declarations: [DataSimplesPipe, FormatTimePipe,CnpjPipe, OrderByPipe],
  imports: [
    CommonModule
  ],
  exports:[DataSimplesPipe,FormatTimePipe, OrderByPipe , CnpjPipe]
})
export class SharedPipesModule { }
