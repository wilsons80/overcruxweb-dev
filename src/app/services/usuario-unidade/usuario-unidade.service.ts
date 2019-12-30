import { Rotas } from './../../core/rotas';
import { BaseService } from './../base/base.service';
import { Injectable } from '@angular/core';
import { UsuariosUnidades } from '../../core/usuarios-unidades';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioUnidadeService extends BaseService<UsuariosUnidades> {

  constructor(http: HttpClient) {
    super(http, Rotas.USUARIO_UNIDADE);
  }

  getUnidadesUsuarioLogadoTemAcesso() {
    return this.http.get(Rotas.USUARIO_UNIDADE + `usuario` );
  }

  getUnidadesUsuarioTemAcesso(idUsuario: number) {
    return this.http.get(Rotas.USUARIO_UNIDADE + `usuario/${idUsuario}` );
  }
}
