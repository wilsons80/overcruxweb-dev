import { ItensPedidosMateriais } from './../../core/itens-pedidos-materiais';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { GrausInstrucao } from 'src/app/core/graus-instrucao';
import { HttpClient } from '@angular/common/http';
import { Rotas } from 'src/app/core/rotas';

@Injectable({
  providedIn: 'root'
})
export class ItensPedidosMateriaisService extends BaseService<ItensPedidosMateriais> {

  constructor(http: HttpClient) {
    super(http, Rotas.ITENS_PEDIDOS_MATERIAIS);
  }
}
