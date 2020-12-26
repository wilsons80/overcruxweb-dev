import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Rotas } from 'src/app/core/rotas';
import { HttpClient } from '@angular/common/http';
import { MotivoDesligamento } from 'src/app/core/motivo-desligamento';
import { TiposPublicoPrioritario } from 'src/app/core/tipos-publico-prioritario';

@Injectable({
  providedIn: 'root'
})
export class TiposPublicoPrioritarioService extends BaseService<TiposPublicoPrioritario> {

  constructor(http: HttpClient) {
    super(http, Rotas.TIPOS_PUBLICO_PRIORITARIO);
  }

}
