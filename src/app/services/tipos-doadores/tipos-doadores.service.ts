import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';
import { Rotas } from 'src/app/core/rotas';
import { TiposDoadores } from 'src/app/core/tipos-doadores';

@Injectable({
  providedIn: 'root'
})
export class TiposDoadoresService extends BaseService<TiposDoadores> {

  constructor(http: HttpClient) {
    super(http, Rotas.TIPOS_DOADORES);
  }

}
