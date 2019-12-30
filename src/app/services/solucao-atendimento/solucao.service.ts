import { Solucoes } from '../../core/solucoes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Rotas } from 'src/app/core/rotas';

@Injectable({
  providedIn: 'root'
})
export class SolucaoService  extends BaseService<Solucoes> {

  constructor(http: HttpClient) {
    super(http, Rotas.SOLUCOES);
  }

}
