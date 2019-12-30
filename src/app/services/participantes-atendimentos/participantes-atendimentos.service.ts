import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { ParticipanteAtendimento } from 'src/app/core/participante-atendimento';
import { Rotas } from 'src/app/core/rotas';

@Injectable({
  providedIn: 'root'
})
export class ParticipantesAtendimentosService extends BaseService<ParticipanteAtendimento> {

  constructor(http: HttpClient) {
    super(http, Rotas.PARTICIPANTE_ATENDIMENTO);
  }
  
}
