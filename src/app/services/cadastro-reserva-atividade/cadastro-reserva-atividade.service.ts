import { CadastroReservaAtividade } from './../../core/cadastro-reserva-atividade';
import { DocumentoAtividade } from "../../core/documento-atividade";
import { Injectable } from "@angular/core";
import { BaseService } from "../base/base.service";
import { HttpClient } from "@angular/common/http";
import { Rotas } from "src/app/core/rotas";

@Injectable({
  providedIn: "root"
})
export class CadastroReservaAtividadeService extends BaseService<CadastroReservaAtividade> {

  constructor(http: HttpClient) {
    super(http, Rotas.CADASTRO_RESERVA_ATIVIDADE);
  }

  getPorAtividade(idAtividade: number) {
    return this.http.get(Rotas.CADASTRO_RESERVA_ATIVIDADE +`atividade/${idAtividade}`)
  }
}
