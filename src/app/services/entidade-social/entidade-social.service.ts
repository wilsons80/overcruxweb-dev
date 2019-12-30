import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { EntidadesSociais } from 'src/app/core/entidades-sociais';
import { Rotas } from 'src/app/core/rotas';

@Injectable({
  providedIn: 'root'
})
export class EntidadeSocialService extends BaseService<EntidadesSociais> {

  constructor(http: HttpClient) {
    super(http, Rotas.ENTIDADE_SOCIAL);
  }
}
