import { HttpClient, HttpParams } from '@angular/common/http';
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
  
  getAllView(hasSintetica:boolean) {
    let params = new HttpParams().set("hasSintetica",`${hasSintetica}`);

    return this.http.get(Rotas.PLANOS_CONTAS_CONTABEIS+'view',{params: params});
  }

}
