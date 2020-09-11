import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rotas } from 'src/app/core/rotas';
import { Tributos } from 'src/app/core/tributos';
import { Turmas } from 'src/app/core/turmas';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class TributosService extends BaseService<Tributos> {

  constructor(http: HttpClient) {
    super(http, Rotas.TRIBUTOS);
  }
}
