import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rotas } from 'src/app/core/rotas';
import { Talento } from 'src/app/core/talento';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class TalentosService extends BaseService<Talento> {

  constructor(http: HttpClient) {
    super(http, Rotas.TALENTOS);
  }

  getByIdPessoaFisica(idPessoa:number){
    return this.http.get(Rotas.TALENTOS +`pessoa/${idPessoa}`)
  }
}
