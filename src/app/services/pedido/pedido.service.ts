import { Pedido } from './../../core/pedido';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseService } from '../base/base.service';



import { Rotas } from 'src/app/core/rotas';
import { Material } from 'src/app/core/material';

@Injectable({
  providedIn: 'root'
})
export class PedidoService extends BaseService<Pedido> {

  constructor(http: HttpClient) {
    super(http, Rotas.PEDIDOS);
  }

}