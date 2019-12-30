import { DocumentoAtividade } from "./../../core/documento-atividade";
import { Injectable } from "@angular/core";
import { BaseService } from "../base/base.service";
import { HttpClient } from "@angular/common/http";
import { Rotas } from "src/app/core/rotas";

@Injectable({
  providedIn: "root"
})
export class DocumentoAtividadeService extends BaseService<DocumentoAtividade> {

  constructor(http: HttpClient) {
    super(http, Rotas.DOCUMENTO_ATIVIDADE);
  }

  getPorAtividade(idAtividade: number) {
    return this.http.get(Rotas.DOCUMENTO_ATIVIDADE +`atividade/${idAtividade}`)
  }
}
