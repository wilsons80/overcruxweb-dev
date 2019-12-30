import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CursoFormacao } from 'src/app/core/curso-formacao';

const rootPath = 'api/cursoformacaopf/';

@Injectable({
  providedIn: 'root'
})
export class CursoFormacaoService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(rootPath);
  }

  getById(id:number) {
    return this.http.get(rootPath + `${id}`);
  }

  cadastrar(cursoFormacao:CursoFormacao) {
    return this.http.post(rootPath, cursoFormacao);
  }

  alterar(cursoFormacao:CursoFormacao) {
    return this.http.put(rootPath, cursoFormacao);
  }

  excluir(id:number) {
    return this.http.delete(rootPath+ `${id}`);
  }
}
