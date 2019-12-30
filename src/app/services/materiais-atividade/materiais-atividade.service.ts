import { MateriaisAtividade } from '../../core/materiais-atividade';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Rotas } from "src/app/core/rotas";
import { BaseService } from "../base/base.service";

@Injectable({
  providedIn: "root"
})
export class MateriaisAtividadeService extends BaseService<MateriaisAtividade> {

  constructor(http: HttpClient) {
    super(http, Rotas.MATERIAIS_ATIVIDADE);
  }

  getPorAtividade(idAtividade: number) {
    return this.http.get(Rotas.MATERIAIS_ATIVIDADE + `atividade/${idAtividade}`)
  }
}
