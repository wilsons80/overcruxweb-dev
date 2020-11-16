import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rotas } from 'src/app/core/rotas';
import { Solucoes } from 'src/app/core/solucoes';
import { TiposAtividades } from 'src/app/core/tipos-atividades';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class TiposAtividadesService extends BaseService<TiposAtividades> {

  constructor(http: HttpClient) {
    super(http, Rotas.TIPOS_ATIVIDADES);
  }
}
