import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlanosAcao } from 'src/app/core/planos-acao';

const rootPath = 'api/planosacao/';

@Injectable({
  providedIn: 'root'
})
export class PlanosAcaoService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(rootPath);
  }

  getById(id:number) {
    return this.http.get(rootPath + `${id}`);
  }
 
  cadastrar(planosAcao:PlanosAcao) {
    return this.http.post(rootPath, planosAcao);
  }

  alterar(planosAcao:PlanosAcao) {
    return this.http.put(rootPath, planosAcao);
  }

  excluir(id:number) {
    return this.http.delete(rootPath+ `${id}`);
  }
}
