import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Rotas } from 'src/app/core/rotas';
import { HttpClient } from '@angular/common/http';
import { MotivoDesligamento } from 'src/app/core/motivo-desligamento';

@Injectable({
  providedIn: 'root'
})
export class MotivoDesligamentoService extends BaseService<MotivoDesligamento> {

  constructor(http: HttpClient) {
    super(http, Rotas.MOTIVOS_DESLIGAMENTOS);
  }

}
