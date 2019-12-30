import { Rotas } from './../../core/rotas';
import { Cbo } from './../../core/cbo';
import { BaseService } from './../base/base.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CboService extends BaseService<Cbo> {

  constructor(http: HttpClient) {
    super(http, Rotas.CBO);
  }
  
}
