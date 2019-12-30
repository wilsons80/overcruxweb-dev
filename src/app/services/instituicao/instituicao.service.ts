import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Instituicao } from 'src/app/core/instituicao';
import { HttpClient } from '@angular/common/http';
import { Rotas } from 'src/app/core/rotas';

@Injectable({
  providedIn: 'root'
})
export class InstituicaoService extends BaseService<Instituicao> {

  constructor(http: HttpClient) {
    super(http, Rotas.INSTITUICAO);
  }

}
