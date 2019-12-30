import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { EncaminhamentoAluno } from 'src/app/core/encaminhamento-aluno';
import { Rotas } from 'src/app/core/rotas';

@Injectable({
  providedIn: 'root'
})
export class EncaminhamentoAlunoService extends BaseService<EncaminhamentoAluno> {

  constructor(http: HttpClient) {
    super(http, Rotas.ENCAMINHAMENTO_ALUNO);
  }

  getAllFiltro(idAluno: number|string, idEntidadeSocial: number|string) {
    if (!idAluno) { idAluno = ''; }
    if (!idEntidadeSocial) { idEntidadeSocial = ''; }

    return this.http.get(Rotas.ENCAMINHAMENTO_ALUNO , { params: {
       aluno: `${idAluno}`,
       entidadesocial: `${idEntidadeSocial}`
    }});
  }

}
