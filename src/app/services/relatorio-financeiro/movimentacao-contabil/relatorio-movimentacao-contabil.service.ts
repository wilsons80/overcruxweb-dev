import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTTP_BYPASS_INTERCEPTOR } from 'src/app/components/common/http-mgmt/http-mgmt.module';
import * as moment from 'moment';

const rootPath = 'api/movimentacaocontabil/';

@Injectable({
  providedIn: 'root'
})
export class RelatorioMovimentacaoContabilService {

  constructor(private http: HttpClient, 
             @Inject(HTTP_BYPASS_INTERCEPTOR) private httpBypassInterceptor: HttpClient) { 

  }

  showRelatorio(mimetype, dados:any[]): any {
    return this.http.post(`${rootPath}mimetype/${mimetype}`, dados , {responseType: 'arraybuffer'});
  }

  getContasContabeisSubordinadas(idPlanoConta: number){
    return this.http.get(`${rootPath}contascontabeissubordinadas/${idPlanoConta}`);
  }
  
  atualizarSaldoContabil(idPlanoConta: number, dataInicio: any){
    const p_dataInicio = dataInicio ? moment(dataInicio).format('YYYY-MM-DD') : '';
    return this.http.put(`${rootPath}atualizarsaldocontacontabil/${idPlanoConta}/${p_dataInicio}`, {});
  }

  atualizarSaldoContabilPrograma(idPlanoConta: number, dataInicio: any, idPrograma: number){
    const p_dataInicio = dataInicio ? moment(dataInicio).format('YYYY-MM-DD') : '';
    return this.http.put(`${rootPath}atualizarsaldocontacontabilprograma/${idPlanoConta}/${p_dataInicio}/${idPrograma}`, {});
  }

  atualizarSaldoContabilProjeto(idPlanoConta: number, dataInicio: any, idProjeto: number){
    const p_dataInicio = dataInicio ? moment(dataInicio).format('YYYY-MM-DD') : '';
    return this.http.put(`${rootPath}atualizarsaldocontacontabilprojeto/${idPlanoConta}/${p_dataInicio}/${idProjeto}`, {});
  }


  getSaldoContaContabilPrograma(idPlanoConta: number, dataInicio: any, dataFim: any, idPrograma: number) {
    const p_dataInicio = dataInicio ? moment(dataInicio).format('YYYY-MM-DD') : '';
    const p_dataFim    = dataFim ? moment(dataFim).format('YYYY-MM-DD') : '';
   
    return this.http.get(`${rootPath}saldocontacontabilprograma`, { 
      params: {
        idPlanoConta: `${idPlanoConta}`,
        dataInicio: `${p_dataInicio}`,
        dataFim: `${p_dataFim}`,
        idPrograma: `${idPrograma}`,
      }
    });
  }

  getSaldoContaContabilProjeto(idPlanoConta: number, dataInicio: any, dataFim: any, idProjeto: number) {
    const p_dataInicio = dataInicio ? moment(dataInicio).format('YYYY-MM-DD') : '';
    const p_dataFim    = dataFim ? moment(dataFim).format('YYYY-MM-DD') : '';
   
    return this.http.get(`${rootPath}saldocontacontabilprojeto`, { 
      params: {
        idPlanoConta: `${idPlanoConta}`,
        dataInicio: `${p_dataInicio}`,
        dataFim: `${p_dataFim}`,
        idProjeto: `${idProjeto}`,
      }
    });
  }

  getSaldoContaContabil(idPlanoConta: number, dataInicio: any, dataFim: any) {
    const p_dataInicio = dataInicio ? moment(dataInicio).format('YYYY-MM-DD') : '';
    const p_dataFim    = dataFim ? moment(dataFim).format('YYYY-MM-DD') : '';
   
    return this.http.get(`${rootPath}saldocontacontabil`, { 
      params: {
        idPlanoConta: `${idPlanoConta}`,
        dataInicio: `${p_dataInicio}`,
        dataFim: `${p_dataFim}`
      }
    });
  }
  
  getFilter(idcategoria: string|number,
            idPrograma: string|number,
            idProjeto: string|number,
            dataInicio: any,
            dataFim: any) {

    idcategoria       = idcategoria || '';
    idPrograma        = idPrograma || '';
    idProjeto         = idProjeto || '';

    const p_dataInicio = dataInicio ? dataInicio.getTime() : '';
    const p_dataFim = dataFim ? dataFim.getTime() : '';

    return this.http.get(`${rootPath}filter`, { params: {
      idcategoria: `${idcategoria}` ,
      idprograma: `${idPrograma}`,
      idprojeto: `${idProjeto}` ,
      dataInicio: `${p_dataInicio}`,
      dataFim: `${p_dataFim}`
      }
    });
  }


}
