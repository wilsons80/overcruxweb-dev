import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProvisionamentoConciliacao } from 'src/app/core/provisionamento-conciliacao';
import { Rotas } from 'src/app/core/rotas';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class ConciliacaoService extends BaseService<ProvisionamentoConciliacao> {

  constructor(http: HttpClient) {
    super(http, Rotas.CONCILIACAO);
  }


  getFilter(dataInicio: any,
            dataFim: any,
            idContaBancaria: string,
            tipoAcao: string ) {

    idContaBancaria = idContaBancaria || '';
    tipoAcao        = tipoAcao || '';

    const p_dataInicio = dataInicio ? dataInicio.getTime() : '';
    const p_dataFim = dataFim ? dataFim.getTime() : '';

    return this.http.get(Rotas.CONCILIACAO + 'filter', { params: {
        dataInicio: `${p_dataInicio}`,
        dataFim: `${p_dataFim}`,
        contaBancaria: `${idContaBancaria}`,
        tipoAcao: `${tipoAcao}`
        }
    });
  }


  gerar(dataInicio: any,
        dataFim: any,
        idContaBancaria: string,
        tipoAcao: string ) {

    idContaBancaria = idContaBancaria || '';
    tipoAcao        = tipoAcao || '';

    const p_dataInicio = dataInicio ? dataInicio.getTime() : '';
    const p_dataFim = dataFim ? dataFim.getTime() : '';

    return this.http.post(Rotas.CONCILIACAO + 'exportar', { params: {
        dataInicio: `${p_dataInicio}`,
        dataFim: `${p_dataFim}`,
        contaBancaria: `${idContaBancaria}`,
        tipoAcao: `${tipoAcao}`
        }
    });
  }

}
