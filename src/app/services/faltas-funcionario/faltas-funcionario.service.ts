import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rotas } from 'src/app/core/rotas';
import { BaseService } from '../base/base.service';
import { FaltasFuncionario } from './../../core/faltas-funcionario';

@Injectable({
  providedIn: 'root'
})
export class FaltasFuncionarioService extends BaseService<FaltasFuncionario> {

  constructor(http: HttpClient) {
    super(http, Rotas.FALTAS_FUNCIONARIOS);
  }

  getPorFuncionario(idFuncionario:number){
   return this.http.get(Rotas.FALTAS_FUNCIONARIOS + `funcionario/${idFuncionario}`)
  }
}