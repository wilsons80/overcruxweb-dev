import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTTP_BYPASS_INTERCEPTOR } from 'src/app/components/common/http-mgmt/http-mgmt.module';


const rootPath = 'api/relatoriobeneficiario/';

@Injectable({
  providedIn: 'root'
})
export class RelatorioBeneficiarioService {

  constructor(private http: HttpClient, 
             @Inject(HTTP_BYPASS_INTERCEPTOR) private httpBypassInterceptor: HttpClient) { 

  }

  showRelatorio(tipoRelatorio, mimetype, listaIdsPessoaFisica:any[]): any {
    return this.http.post(`${rootPath}mimetype/${mimetype}/tipo/${tipoRelatorio}`, listaIdsPessoaFisica , {responseType: 'arraybuffer'});
  }

}
