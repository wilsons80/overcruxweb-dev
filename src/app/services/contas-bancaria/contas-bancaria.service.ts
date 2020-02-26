import { ContasBancaria } from '../../core/contas-bancaria';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rotas } from 'src/app/core/rotas';
import { BaseService } from '../base/base.service';
import { Funcoes } from '../../core/funcoes';

@Injectable({
  providedIn: 'root'
})
export class ContasBancariaService extends BaseService<ContasBancaria> {

  constructor(http: HttpClient) {
    super(http, Rotas.CONTAS_BANCARIA);
  }

  getAllComboByInstituicaoLogada() {
    return this.http.get(`${Rotas.CONTAS_BANCARIA}combo/instituicoes`);
  }
}
