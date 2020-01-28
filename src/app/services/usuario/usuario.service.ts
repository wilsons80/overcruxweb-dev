import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/core/usuario';
import { BaseService } from '../base/base.service';
import { Rotas } from 'src/app/core/rotas';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseService<Usuario> {

  constructor(http: HttpClient) {
    super(http, Rotas.USUARIO);
  }

  getUsuariosPorUnidadeLogada() {
    return this.http.get(Rotas.USUARIO + `unidade`);
  }

  getUsuariosPorUnidade(idUnidade: number ) {
    return this.http.get(Rotas.USUARIO + `unidade/${idUnidade}`);
  }

  getUsuariosPorInstituicao(idInstituicao: number ) {
    return this.http.get(Rotas.USUARIO + `instituicao/${idInstituicao}`);
  }
}

