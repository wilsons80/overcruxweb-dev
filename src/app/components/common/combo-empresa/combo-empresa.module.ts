import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { ComboPesquisavelModule } from '../combo-pesquisavel/combo-pesquisavel.module';
import { ComboEmpresaComponent } from './combo-empresa.component';
import { SharedPipesModule } from 'src/app/pipes/shared-pipes.module';



@NgModule({
  declarations: [ComboEmpresaComponent],
  imports: [
    CommonModule,
    MaterialCommonModule,
    SharedPipesModule,
    MatExpansionModule,
    ComboPesquisavelModule
  ],
  exports:[ComboEmpresaComponent]
})
export class ComboEmpresaModule { }
