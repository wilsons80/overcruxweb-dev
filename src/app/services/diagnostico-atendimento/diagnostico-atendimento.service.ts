import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Diagnostico } from 'src/app/core/diagnostico';
import { BaseService } from '../base/base.service';
import { Rotas } from 'src/app/core/rotas';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticoAtendimentoService extends BaseService<Diagnostico> {

  constructor(http: HttpClient) {
    super(http, Rotas.DIAGNOSTICOS);
  }

}
