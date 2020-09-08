import { Movimentacoes } from 'src/app/core/movimentacoes';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';
import { Rotas } from 'src/app/core/rotas';
import { DataUtilService } from '../commons/data-util.service';

@Injectable({
  providedIn: 'root'
})
export class MovimentacoesService extends BaseService<Movimentacoes> {

  constructor(http: HttpClient) {
    super(http, Rotas.MOVIMENTACOES);
  }

  getAllDestino() {
    return this.http.get(Rotas.MOVIMENTACOES + `destino`);
  }

  getAllOrigem() {
    return this.http.get(Rotas.MOVIMENTACOES + `origem`);
  }

  getFilterOrigem(idEmpresa: string|number,
                  idPrograma: string|number,
                  idProjeto: string|number,
                  valor: string|number,
                  dataInicio: any,
                  dataFim: any,
                  dataVencimento: any ) {

    idEmpresa  = idEmpresa || '';
    idPrograma = idPrograma || '';
    idProjeto  = idProjeto || '';
    valor      = valor || '';

    const p_dataInicio = dataInicio ? dataInicio.getTime() : '';
    const p_dataFim = dataFim ? dataFim.getTime() : '';
    const p_dataVencimento = dataVencimento ? dataVencimento.getTime() : '';

    return this.http.get(Rotas.MOVIMENTACOES + 'filter/origem', { params: {
        empresa: `${idEmpresa}` ,
        programa: `${idPrograma}` ,
        projeto: `${idProjeto}`,
        valor: `${valor}`,
        dataInicio: `${p_dataInicio}`,
        dataFim: `${p_dataFim}`,
        dataVencimento: `${p_dataVencimento}`,
        }
    });
  }

}
