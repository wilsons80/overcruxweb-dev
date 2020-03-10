import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rotas } from 'src/app/core/rotas';
import { BaseService } from '../base/base.service';
import { CategoriasContabeis } from './../../core/categorias-contabeis';

@Injectable({
  providedIn: 'root'
})
export class CategoriasContabeisService extends BaseService<CategoriasContabeis> {

  constructor(http: HttpClient) {
    super(http, Rotas.PLANOS_CONTAS_CONTABEIS);
  }

}
