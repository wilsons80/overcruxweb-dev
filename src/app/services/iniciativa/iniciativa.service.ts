import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Iniciativa } from 'src/app/core/iniciativa';


const rootPath = 'api/iniciativa/';

@Injectable({
  providedIn: 'root'
})
export class IniciativaService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(rootPath);
  }

  getById(id:number) {
    return this.http.get(rootPath + `${id}`);
  }
 
  cadastrar(iniciativa:Iniciativa) {
    return this.http.post(rootPath, iniciativa);
  }

  alterar(iniciativa:Iniciativa) {
    return this.http.put(rootPath, iniciativa);
  }

  excluir(id:number) {
    return this.http.delete(rootPath+ `${id}`);
  }

}
