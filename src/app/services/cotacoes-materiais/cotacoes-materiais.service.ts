import { CotacoesMateriais } from './../../core/cotacoes-materiais';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rotas } from 'src/app/core/rotas';
import { BaseService } from '../base/base.service';
import { CategoriasContabeis } from '../../core/categorias-contabeis';

@Injectable({
  providedIn: 'root'
})
export class CotacoesMateriaisService extends BaseService<CotacoesMateriais> {

  constructor(http: HttpClient) {
    super(http, Rotas.COTACOES_MATERIAIS);
  }

}
