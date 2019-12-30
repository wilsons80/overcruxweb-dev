import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rotas } from 'src/app/core/rotas';
import { BaseService } from '../base/base.service';
import { TiposContratacoes } from './../../core/tipos-contratacoes';

@Injectable({
  providedIn: 'root'
})
export class TiposContratacoesService extends BaseService<TiposContratacoes> {

  constructor(http: HttpClient) {
    super(http, Rotas.TIPOS_CONTRATACOES);
  }

}
