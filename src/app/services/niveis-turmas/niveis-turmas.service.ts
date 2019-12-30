import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { NiveisTurmas } from 'src/app/core/niveis-turmas';
import { HttpClient } from '@angular/common/http';
import { Rotas } from 'src/app/core/rotas';

@Injectable({
  providedIn: 'root'
})
export class NiveisTurmasService extends BaseService<NiveisTurmas> {
  constructor(http: HttpClient) {
    super(http, Rotas.NIVEIS_TURMAS);
  }
}
