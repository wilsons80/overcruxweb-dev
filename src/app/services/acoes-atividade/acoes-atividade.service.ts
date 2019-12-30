import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Aluno } from 'src/app/core/aluno';
import { BaseService } from '../base/base.service';
import { Rotas } from 'src/app/core/rotas';
import { Acoes } from 'src/app/core/acoes';

@Injectable({
  providedIn: 'root'
})
export class AcoesAtividadeService extends BaseService<Acoes> {

  constructor(http: HttpClient) {
    super(http, Rotas.ACOES_ATIVIDADE);
  }

}
