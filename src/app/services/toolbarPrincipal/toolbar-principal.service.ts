import { AcessoUnidade } from './../../core/acesso-unidade';
import { Injectable } from '@angular/core';

import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';
import { UsuarioLogado } from 'src/app/core/usuario-logado';
import { UnidadeService } from '../unidade/unidade.service';


@Injectable({
  providedIn: 'root'
})
export class ToolbarPrincipalService {


  unidades: AcessoUnidade[] = [];
  unidadeSelecionada: AcessoUnidade;
  idPessoaFisica: number;
  username: string;
  nomeUsuario: string;
  logo: any;
  loadingCompleto = true;

  constructor(private http: HttpClient,
              private unidadeService: UnidadeService
              ) { }

  setarPropriedadesUsuarioLogado(usuarioLogado: UsuarioLogado) {
    this.unidades = usuarioLogado.unidades;
    if (usuarioLogado.unidadeLogada) {
      this.unidadeSelecionada = _.filter(this.unidades, unidade => unidade.id === usuarioLogado.unidadeLogada.id)[0];
    }
    this.username = usuarioLogado.username;
    this.nomeUsuario = usuarioLogado.nomeUsuario;
    this.idPessoaFisica = usuarioLogado.idPessoaFisica;
  }

  apagaPropriedadesdoUsuarioLogado() {
    this.unidades = [];
    this.unidadeSelecionada = null;
    this.username = null;
    this.nomeUsuario = null;
  }

  setLoadingCompleto(isCompleto: boolean) {
    this.loadingCompleto = isCompleto;
  }

  getUnidadeLogada(){
    return this.unidadeSelecionada;
  }

}
