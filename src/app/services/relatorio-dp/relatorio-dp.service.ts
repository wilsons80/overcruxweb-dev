import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTTP_BYPASS_INTERCEPTOR } from 'src/app/components/common/http-mgmt/http-mgmt.module';


const rootPath = 'api/relatoriogestaopessoal/';

@Injectable({
  providedIn: 'root'
})
export class RelatorioDpService {

  constructor(private http: HttpClient, 
             @Inject(HTTP_BYPASS_INTERCEPTOR) private httpBypassInterceptor: HttpClient) { 

  }

  showRelatorio(tipoRelatorio, mimetype, listaIdsPessoaFisica:any[]): any {
    return this.http.post(`${rootPath}mimetype/${mimetype}/tipo/${tipoRelatorio}`, listaIdsPessoaFisica , {responseType: 'arraybuffer'});
  }

  
  getFilter(cpf: string|number,
            idColaborador: string|number,
            idUnidade: string|number,
            idDepartamento: string|number,
            idCargo: string|number,
            idFuncao: string|number,
            dataInicio: any,
            dataFim: any) {

    cpf             = cpf || '';
    idColaborador   = idColaborador || '';
    idUnidade       = idUnidade || '';
    idDepartamento  = idDepartamento || '';
    idCargo         = idCargo || '';
    idFuncao        = idFuncao || '';

    const p_dataInicio = dataInicio ? dataInicio.getTime() : '';
    const p_dataFim = dataFim ? dataFim.getTime() : '';

    return this.http.get(`${rootPath}filter`, { params: {
      cpf: `${cpf}` ,
      idColaborador: `${idColaborador}` ,
      idUnidade: `${idUnidade}`,
      idDepartamento: `${idDepartamento}`,
      idCargo: `${idCargo}`,
      idFuncao: `${idFuncao}`,
      dataInicio: `${p_dataInicio}`,
      dataFim: `${p_dataFim}`,
      }
    });
  }


}
