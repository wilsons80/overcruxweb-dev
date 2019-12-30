import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cargo } from 'src/app/core/cargo';


const rootPath = 'api/cargos/';

@Injectable({
  providedIn: 'root'
})
export class CargosService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(rootPath);
  }

  getById(id: number) {
    return this.http.get(rootPath + `${id}`);
  }

  cadastrar(cargo: Cargo) {
    return this.http.post(rootPath, cargo);
  }

  alterar(cargo: Cargo) {
    return this.http.put(rootPath, cargo);
  }

  excluir(id: number) {
    return this.http.delete(rootPath + `${id}`);
  }
}
