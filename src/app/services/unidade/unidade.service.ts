import { Unidade } from './../../core/unidade';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { BaseService } from '../base/base.service';
import { Rotas } from 'src/app/core/rotas';

const rotaPath = Rotas.UNIDADE;

@Injectable({
  providedIn: 'root'
})
export class UnidadeService extends BaseService<Unidade> {

  constructor(http: HttpClient) {
    super(http, rotaPath);
  }

  getAllUnidadeParaCombo(){
    return this.http.get(rotaPath + `combo`);
  }

  getUnidadeSetandoLogada(idUnidade: number) {
    return this.http.get(rotaPath + `logada/${idUnidade}`);
  }

  getAllTiposUnidade() {
    return this.http.get(rotaPath + `tiposunidade`);
  }

  getAllClassificadorSituacaoImovel() {
    return this.http.get(rotaPath + `classificadorimovel`);
  }

  getAllUnidadesUsuarioLogadoTemAcesso() {
    return this.http.get(rotaPath);
  }

  getAllUnidadesInstituicaoUsuarioLogado() {
    return this.http.get(rotaPath + `unidadesinstituicao`);
  }

  getUnidadeLogada(){
    return this.http.get(rotaPath + `/unidadelogada`);
  }

  getAllByInstituicaoDaUnidadeLogada() {
    return this.http.get(rotaPath + `/instituicao`);
  }
}



