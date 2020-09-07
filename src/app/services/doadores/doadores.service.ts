import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doadores } from 'src/app/core/doadores';
import { Rotas } from 'src/app/core/rotas';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class DoadoresService extends BaseService<Doadores> {

  constructor(http: HttpClient) {
    super(http, Rotas.DOADORES);
  }

}
