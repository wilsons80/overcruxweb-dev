import { PedidosMateriais } from './../../core/pedidos-materiais';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';
import { Rotas } from 'src/app/core/rotas';

@Injectable({
  providedIn: 'root'
})
export class PedidosMateriaisService  extends BaseService<PedidosMateriais> {

  constructor(http: HttpClient) {
    super(http, Rotas.PEDIDOS_MATERIAIS);
  }
}
