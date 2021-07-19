import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rotas } from 'src/app/core/rotas';
import { BaseService } from '../base/base.service';
import { MovimentacoesContabeis } from 'src/app/core/movimentacoes-contabeis';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class MovimentacoesContabeisService extends BaseService<MovimentacoesContabeis> {

  constructor(http: HttpClient) {
    super(http, Rotas.MOVIMENTACOES_CONTABEIS);
  }
  
  getFilter(idPrograma: string|number,
            idProjeto: string|number,
            valor: string|number,
            dataInicio: any,
            dataFim: any,
            idContaDestino: string|number,
            idContaOrigem: string|number
            ) {

    idPrograma     = idPrograma || '';
    idProjeto      = idProjeto || '';
    valor          = valor || '';
    idContaDestino = idContaDestino || '';
    idContaOrigem  = idContaOrigem || '';

    const p_dataInicio   = dataInicio ? moment(dataInicio).format('YYYY-MM-DD') : '';
    const p_dataFim      = dataFim ? moment(dataFim).format('YYYY-MM-DD') : '';

    return this.http.get(Rotas.MOVIMENTACOES_CONTABEIS + 'filter', 
    { 
      params: {
        programa: `${idPrograma}`,
        projeto: `${idProjeto}`,
        valor: `${valor}`,
        dataInicio: `${p_dataInicio}`,
        dataFim: `${p_dataFim}`,
        contaDestino : `${idContaDestino}`,
        contaOrigem : `${idContaOrigem}`
      }
    });
  }
  
}
