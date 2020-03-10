import { Rotas } from './../../core/rotas';
import { BaseService } from './../base/base.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SaldosContasBancaria } from '../../core/saldos-contas-bancaria';

@Injectable({
  providedIn: 'root'
})
export class SaldosContasBancariaService extends BaseService<SaldosContasBancaria> {

  constructor(http: HttpClient) {
    super(http, Rotas.SALDOS_CONTAS_BANCARIA);
  }

  getFilter(tipoContaBancaria: string|number,
            nomeBanco: string|number,
            numeroAgencia: string|number,
            numeroContaBancaria: string|number,
            dataInicio: string|Date,
            dataFim: string|Date ) {

    tipoContaBancaria = tipoContaBancaria || '';
    nomeBanco = nomeBanco || '';
    numeroAgencia = numeroAgencia || '';
    numeroContaBancaria = numeroContaBancaria || '';
    dataInicio = dataInicio || '';
    dataFim = dataFim || '';

    return this.http.get(Rotas.SALDOS_CONTAS_BANCARIA + 'filter', { params: {
      tipoContaBancaria: `${tipoContaBancaria}` ,
      nomeBanco: `${nomeBanco}` ,
      numeroAgencia: `${numeroAgencia}`,
      numeroContaBancaria: `${numeroContaBancaria}`,
      dataInicio: `${dataInicio}`,
      dataFim: `${dataFim}`,
      }
    });
  }

  getPorConta(id: number) {
    return this.http.get(`${this.rota}contabancaria/${id}`);
  }
}
