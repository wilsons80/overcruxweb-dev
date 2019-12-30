import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rotas } from 'src/app/core/rotas';
import { BaseService } from '../base/base.service';
import { Questionario } from './../../core/questionario';

@Injectable({
  providedIn: 'root'
})
export class QuestionarioService extends BaseService<Questionario> {

  constructor(http: HttpClient) {
    super(http, Rotas.QUESTIONARIO);
  }
}
