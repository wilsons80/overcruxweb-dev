import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Provisao } from 'src/app/core/provisao';
import { Rotas } from 'src/app/core/rotas';
import { BaseService } from '../base/base.service';

const httpOptions = {
  'responseType'  : 'arraybuffer' as 'json'
};

@Injectable({
  providedIn: 'root'
})
export class ProvisaoService extends BaseService<Provisao> {

  constructor(http: HttpClient) {
    super(http, Rotas.PROVISAO);
  }


  gerarArquivo(lista: Provisao[]) {
    return this.http.post(Rotas.PROVISAO + "gerar-arquivo", lista, httpOptions);
  }

  getAllInconsistentes() {
    return this.http.get(Rotas.PROVISAO + 'inconsistentes');
  }
  
  getFilter(dataInicio: any,
            dataFim: any,
            nomeProgramaProjeto: string) {

    const p_dataInicio = dataInicio ? dataInicio.getTime() : '';
    const p_dataFim = dataFim ? dataFim.getTime() : '';
    const p_centroCusto = nomeProgramaProjeto ? nomeProgramaProjeto : '';

    return this.http.get(Rotas.PROVISAO + 'filter', { params: {
        dataInicio: `${p_dataInicio}`,
        dataFim: `${p_dataFim}`,
        centrocusto: `${p_centroCusto}`
        }
    });
  }

  carregar(dataInicio: any,
           dataFim: any,
           nomeProgramaProjeto: string) {

    const p_dataInicio = dataInicio ? dataInicio.getTime() : '';
    const p_dataFim = dataFim ? dataFim.getTime() : '';
    const p_centroCusto = nomeProgramaProjeto ? nomeProgramaProjeto : '';

    return this.http.get(Rotas.PROVISAO + 'carregar', { params: {
        dataInicio: `${p_dataInicio}`,
        dataFim: `${p_dataFim}`,
        centrocusto: `${p_centroCusto}`
        }
    });
  }

}
