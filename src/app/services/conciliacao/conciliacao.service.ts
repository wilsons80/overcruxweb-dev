import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Conciliacao } from 'src/app/core/conciliacao';
import { Rotas } from 'src/app/core/rotas';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class ConciliacaoService extends BaseService<Conciliacao> {

  constructor(http: HttpClient) {
    super(http, Rotas.CONCILIACAO);
  }


  getFilter(dataInicio: any,
            dataFim: any,
            idContaBancaria: any) {

    idContaBancaria = idContaBancaria ? Number(idContaBancaria) : '';

    const p_dataInicio = dataInicio ? dataInicio.getTime() : '';
    const p_dataFim = dataFim ? dataFim.getTime() : '';

    return this.http.get(Rotas.CONCILIACAO + 'filter', { params: {
        dataInicio: `${p_dataInicio}`,
        dataFim: `${p_dataFim}`,
        contaBancaria: `${idContaBancaria}`
        }
    });
  }


  exportar(dataInicio: any,
           dataFim: any,
           idContaBancaria: any) {

    idContaBancaria = idContaBancaria || '';

    const p_dataInicio = dataInicio ? dataInicio.getTime() : '';
    const p_dataFim = dataFim ? dataFim.getTime() : '';

    return this.http.post(Rotas.CONCILIACAO + 'exportar', { params: {
        dataInicio: `${p_dataInicio}`,
        dataFim: `${p_dataFim}`,
        contaBancaria: `${idContaBancaria}`
        }
    });
  }

}
