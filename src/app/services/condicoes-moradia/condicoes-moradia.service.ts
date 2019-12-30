import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Rotas } from 'src/app/core/rotas';
import { CondicoesMoradia } from 'src/app/core/condicoes-moradia';

@Injectable({
  providedIn: 'root'
})
export class CondicoesMoradiaService extends BaseService<CondicoesMoradia> {

  constructor(http: HttpClient) {
    super(http, Rotas.CONDICAO_MORADIA);
  }
}
