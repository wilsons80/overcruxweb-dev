import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rotas } from 'src/app/core/rotas';

@Injectable({
  providedIn: 'root'
})
export class ExtratoContaBancariaService {

  constructor(public http: HttpClient) { }

  gerarExtrato(idContaBancaria: number, dataInicio: Date, dataFim: Date) {
    return this.http.get(Rotas.EXTRATO + `conta-bancaria/${idContaBancaria}/${dataInicio.toJSON().substring(0,10)}/${dataFim.toJSON().substring(0,10)}`);
  }
  
}
