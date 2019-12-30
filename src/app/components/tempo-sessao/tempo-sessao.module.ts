import { SharedPipesModule } from './../../pipes/shared-pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TempoSessaoComponent } from './tempo-sessao.component';



@NgModule({
  declarations: [TempoSessaoComponent],
  imports: [
    CommonModule,
    SharedPipesModule
  ],
  exports:[TempoSessaoComponent]
})
export class TempoSessaoModule { }
