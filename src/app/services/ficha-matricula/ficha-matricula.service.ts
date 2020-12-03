import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTTP_BYPASS_INTERCEPTOR } from 'src/app/components/common/http-mgmt/http-mgmt.module';


const fichaMatriculaRootPath = 'api/fichamatricula/';

@Injectable({
  providedIn: 'root'
})
export class FichaMatriculaService {

  constructor(private http: HttpClient, 
             @Inject(HTTP_BYPASS_INTERCEPTOR) private httpBypassInterceptor: HttpClient) { 

  }

  showRelatorio(tipo, listaIdsPessoaFisica:any[]): any {
    return this.http.post(`${fichaMatriculaRootPath}tipo/${tipo}`, listaIdsPessoaFisica , {responseType: 'arraybuffer'});
  }

}
