import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

const ROOT_PATH = 'api/arquivos/';

@Injectable({
  providedIn: 'root'
})
export class AnexosAcaoService {

  constructor(
    private http: HttpClient
  ) { }

  getArquivo(idArquivo: number): string {
    return ROOT_PATH + `${idArquivo}`;
  }

  getUrlConteudoArquivo(idArquivo: number, nomeArquivo: string) {
    return ROOT_PATH + `conteudo/${idArquivo}/nome/${nomeArquivo}`;
  }


  getConteudoArquivo(idArquivo: number, nomeArquivo: string) {
    return this.http.post(`${ROOT_PATH}dados/${idArquivo}/nome/${nomeArquivo}`, {} , {responseType: 'arraybuffer'});
  }

  showRelatorio(tipoRelatorio, mimetype, listaIdsPessoaFisica:any[]): any {
  }

  gravar(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(ROOT_PATH, formData);
  }
  
}
