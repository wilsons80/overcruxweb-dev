import { GrausInstrucao } from 'src/app/core/graus-instrucao';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Rotas } from 'src/app/core/rotas';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GrausInstrucaoService extends BaseService<GrausInstrucao> {

  constructor(http: HttpClient) {
    super(http, Rotas.GRAUS_INSTRUCAO);
  }

}
