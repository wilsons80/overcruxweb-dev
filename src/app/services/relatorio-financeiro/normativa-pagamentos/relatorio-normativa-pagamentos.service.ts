import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTTP_BYPASS_INTERCEPTOR } from 'src/app/components/common/http-mgmt/http-mgmt.module';


const rootPath = 'api/normativapagamentos/';

@Injectable({
  providedIn: 'root'
})
export class RelatorioNormativaPagamentosService {

  constructor(private http: HttpClient, 
             @Inject(HTTP_BYPASS_INTERCEPTOR) private httpBypassInterceptor: HttpClient) { 
  }

  showRelatorio(mimetype, dados:any[]): any {
    return this.http.post(`${rootPath}mimetype/${mimetype}`, dados , {responseType: 'arraybuffer'});
  }


  
  getFilter(idcategoria: string|number,
            cnpj_cpf: string|number,
            programaProjeto: string|number,
            dataInicio: any,
            dataFim: any) {

    idcategoria       = idcategoria || '';
    cnpj_cpf          = cnpj_cpf || '';
    programaProjeto   = programaProjeto || '';

    const p_dataInicio = dataInicio ? dataInicio.getTime() : '';
    const p_dataFim = dataFim ? dataFim.getTime() : '';

    return this.http.get(`${rootPath}filter`, { params: {
      idcategoria: `${idcategoria}` ,
      cnpj_cpf: `${cnpj_cpf}` ,
      programaProjeto: `${programaProjeto}`,
      dataInicio: `${p_dataInicio}`,
      dataFim: `${p_dataFim}`
      }
    });
  }

}
