import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rotas } from 'src/app/core/rotas';
import { Funcionario } from './../../core/funcionario';
import { BaseService } from '../base/base.service';


@Injectable({
  providedIn: 'root'
})
export class FuncionarioService extends BaseService<Funcionario> {
  constructor(http: HttpClient) {
    super(http, Rotas.FUNCIONARIOS);
  }

  getByPessoaFisica(idPessoaFisica: number) {
    return this.http.get(Rotas.FUNCIONARIOS + 'pessoafisica/' + idPessoaFisica);
  }
 
  getPorUnidades(idsUnidades: number[]) {
    let params = new HttpParams();
    params = params.append('ids', idsUnidades.join(', '));
    return this.http.get(Rotas.FUNCIONARIOS + 'porunidades',  { params: params });
  }

  getPorInstituicaoCombo(idInstituicao: number) {
    return this.http.get(Rotas.FUNCIONARIOS + 'combo/instituicao/' + idInstituicao);
  }

}

