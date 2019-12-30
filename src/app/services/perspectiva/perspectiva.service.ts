import { Perspectiva } from './../../core/perspectiva';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const perspectivaRootPath = 'api/perspectiva/';

@Injectable({
  providedIn: 'root'
})
export class PerspectivaService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(perspectivaRootPath);
  }

  getById(idPerspectiva:number) {
    return this.http.get(perspectivaRootPath + `${idPerspectiva}`);
  }
 
  cadastrar(perspectiva:Perspectiva) {
    return this.http.post(perspectivaRootPath, perspectiva);
  }

  alterar(perspectiva:Perspectiva) {
    return this.http.put(perspectivaRootPath, perspectiva);
  }

  excluir(idPerspectiva:number) {
    return this.http.delete(perspectivaRootPath+ `${idPerspectiva}`);
  }

}
	