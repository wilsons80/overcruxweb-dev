import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SituacoesVulnerabilidade } from 'src/app/core/situacoes-vulnerabilidade';
import { BaseService } from '../base/base.service';
import { Rotas } from 'src/app/core/rotas';

@Injectable({
  providedIn: 'root'
})
export class SituacaoVulnerabilidadeService extends BaseService<SituacoesVulnerabilidade> {

  constructor(http: HttpClient) {
    super(http, Rotas.SITUACAO_VULNERABILIDADE);
  }

}
