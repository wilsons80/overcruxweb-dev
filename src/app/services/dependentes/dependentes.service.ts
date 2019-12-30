import { Rotas } from './../../core/rotas';
import { Dependentes } from './../../core/dependentes';
import { BaseService } from './../base/base.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DependentesService extends BaseService<Dependentes> {

  constructor(http: HttpClient) {
    super(http, Rotas.DEPENDENTES);
  }


  getAllByCpf(cpf: number) {
    return this.http.get(Rotas.DEPENDENTES + 'pessoafisica/' + cpf);
  }
}
