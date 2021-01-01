import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fornecedor } from 'src/app/core/Fornecedores';
import { Rotas } from 'src/app/core/rotas';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class FornecedoresService extends BaseService<Fornecedor> {

  constructor(http: HttpClient) {
    super(http, Rotas.FORNECEDORES);
  }

    getAllByCombo() {
    return this.http.get(`${Rotas.FORNECEDORES}dados/combo`);
  }

}
