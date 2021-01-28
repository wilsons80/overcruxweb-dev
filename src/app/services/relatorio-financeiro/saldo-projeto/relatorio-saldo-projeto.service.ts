import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTTP_BYPASS_INTERCEPTOR } from 'src/app/components/common/http-mgmt/http-mgmt.module';


const rootPath = 'api/saldoprojetos/';

@Injectable({
  providedIn: 'root'
})
export class RelatorioSaldoProjetoService {

  constructor(private http: HttpClient, 
             @Inject(HTTP_BYPASS_INTERCEPTOR) private httpBypassInterceptor: HttpClient) { 

  }

  showRelatorio(mimetype, dados:any[]): any {
    return this.http.post(`${rootPath}mimetype/${mimetype}`, dados , {responseType: 'arraybuffer'});
  }

  
  getFilter(idPrograma: string|number,
            idProjeto: string|number,
            dataInicio: any,
            dataFim: any) {

    idPrograma        = idPrograma || '';
    idProjeto         = idProjeto || '';

    const p_dataInicio = dataInicio ? dataInicio.getTime() : '';
    const p_dataFim = dataFim ? dataFim.getTime() : '';

    return this.http.get(`${rootPath}filter`, { params: {
      idprograma: `${idPrograma}`,
      idprojeto: `${idProjeto}` ,
      dataInicio: `${p_dataInicio}`,
      dataFim: `${p_dataFim}`
      }
    });
  }


}
