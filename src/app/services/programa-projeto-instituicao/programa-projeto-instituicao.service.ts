import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProgramaProjetoInstituicao } from 'src/app/core/programa-projeto-instituicao';
import { Rotas } from 'src/app/core/rotas';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class ProgramaProjetoInstituicaoService extends BaseService<ProgramaProjetoInstituicao> {

  constructor(http: HttpClient) {
    super(http, Rotas.PROGRAMA_PROJETO_INSTITUICAO);
  }
}
