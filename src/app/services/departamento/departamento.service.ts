import { Departamento } from './../../core/departamento';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../base/base.service';
import { Rotas } from 'src/app/core/rotas';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService extends BaseService<Departamento> {

  constructor(http: HttpClient) {
    super(http, Rotas.DEPARTAMENTO);
  }

  getAllCombo() {
    return this.http.get(`${Rotas.DEPARTAMENTO}combo`);
  }

}
