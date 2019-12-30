import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Metas } from 'src/app/core/metas';

const metasRootPath = 'api/metas/';

@Injectable({
  providedIn: 'root'
})
export class MetasService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(metasRootPath);
  }

  getById(idMetas:number) {
    return this.http.get(metasRootPath + `${idMetas}`);
  }
 
  cadastrar(metas:Metas) {
    return this.http.post(metasRootPath, metas);
  }

  alterar(metas:Metas) {
    return this.http.put(metasRootPath, metas);
  }

  excluir(idOjetivo:number) {
    return this.http.delete(metasRootPath+ `${idOjetivo}`);
  }
}
