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
 
  getPorIntituicao(idsUnidades: number[]) {
    let params = new HttpParams();
    params = params.append('ids', idsUnidades.join(', '));
    return this.http.get(Rotas.FUNCIONARIOS + 'porinstituicao',  { params: params });
  }


  // @GetMapping(path = "/combo/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	// public FuncionarioTO getParaComboById(@PathVariable(name = "id") Long id) {
	// 	return getCmd.getParaComboById(id);
	// }

}

