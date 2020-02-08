import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rotas } from 'src/app/core/rotas';
import { BaseService } from '../base/base.service';
import { Funcoes } from './../../core/funcoes';

@Injectable({
  providedIn: 'root'
})
export class FuncoesService extends BaseService<Funcoes> {

  constructor(http: HttpClient) {
    super(http, Rotas.FUNCOES);
  }

}
