import { Cacheable } from 'ngx-cacheable';
import { ContasBancaria } from '../../core/contas-bancaria';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rotas } from 'src/app/core/rotas';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class ContasBancariaService extends BaseService<ContasBancaria> {

  constructor(http: HttpClient) {
    super(http, Rotas.CONTAS_BANCARIA);
  }

  @Cacheable()
  getAllComboByInstituicaoLogada() {
    return this.http.get(`${Rotas.CONTAS_BANCARIA}combo/instituicoes`);
  }

  
  getAllContasCentroCustos(dataReembolso: any) {
    const p_dataReembolso = dataReembolso ? dataReembolso.getTime() : '';
    return this.http.get(`${Rotas.CONTAS_BANCARIA}instituicao/contascentrocustos`, {params: {
      dataReembolso: `${p_dataReembolso}`
    }});
  }

}
