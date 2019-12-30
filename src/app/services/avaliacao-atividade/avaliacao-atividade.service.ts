import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Avaliacao } from 'src/app/core/avaliacao';
import { Rotas } from 'src/app/core/rotas';

interface Path {
  rootPath: 'api/avaliacoes/';
}

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoAtividadeService extends BaseService<Avaliacao> {

  constructor(http: HttpClient) {
    super(http, Rotas.AVALIACAO_ATIVIDADE);
  }
}
