import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Projeto } from 'src/app/core/projeto';
import { BaseService } from '../base/base.service';
import { Rotas } from 'src/app/core/rotas';


const rootPath = 'api/projeto/';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService extends BaseService<Projeto> {

  constructor(http: HttpClient) {
    super(http, Rotas.PROJETOS);
  }

  getAllIntituicaoLogada() {
    return this.http.get(`${Rotas.PROJETOS}instituicao/logada`);
  }

  getAllPorPrograma(idPrograma: number) {
    return this.http.get(`${Rotas.PROJETOS}programa/${idPrograma}`);
  }

  getAllProgramasIntituicaoLogadaCombo() {
    return this.http.get(`${Rotas.PROJETOS}instituicao/logada/combo`);
  }

  getAllCombo() {
    return this.http.get(`${Rotas.PROJETOS}combo`);
  }


}
