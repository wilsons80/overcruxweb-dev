import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresa } from 'src/app/core/empresa';


const rootPath = 'api/empresa/';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {


  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(rootPath);
  }

  getById(id: number) {
    return this.http.get(rootPath + `${id}`);
  }

  cadastrar(empresa: Empresa) {
    return this.http.post(rootPath, empresa);
  }

  alterar(empresa: Empresa) {
    return this.http.put(rootPath, empresa);
  }

  excluir(id: number) {
    return this.http.delete(rootPath + `${id}`);
  }
}
