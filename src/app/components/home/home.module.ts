import { MaterialCommonModule } from './../../material-modules/material-common.module';
import { TempoSessaoModule } from './../tempo-sessao/tempo-sessao.module';
import { TempoSessaoComponent } from './../tempo-sessao/tempo-sessao.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatToolbarModule,
    FlexLayoutModule,
    TempoSessaoModule,
    MaterialCommonModule
  ],
})
export class HomeModule { }
