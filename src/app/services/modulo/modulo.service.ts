import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base/base.service';
import { Modulo } from 'src/app/core/modulo';
import { Rotas } from 'src/app/core/rotas';

const moduloRootPath = 'api/modulo/';

@Injectable({
  providedIn: 'root'
})
export class ModuloService extends BaseService<Modulo> {

  constructor(http: HttpClient) {
    super(http, Rotas.MODULO);
  }

  getModulosPorUnidade(idUnidade: number) {
    return this.http.get(moduloRootPath + `unidade/${idUnidade}`);
  }

  getUsuariosPorUnidadeLogada() {
    return this.http.get(moduloRootPath + `unidade`);
  }

  getGrupoModulo(idUnidade: number, idModulo: number) {
    return this.http.get(moduloRootPath + `${idModulo}/unidade/${idUnidade}`);
  }

}
