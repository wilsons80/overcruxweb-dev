import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Atendimento } from 'src/app/core/atendimento';
import { Rotas } from 'src/app/core/rotas';


@Injectable({
  providedIn: 'root'
})
export class AtendimentosService extends BaseService<Atendimento> {

  constructor(http: HttpClient) {
    super(http, Rotas.ATENDIMENTO);
  }
}
