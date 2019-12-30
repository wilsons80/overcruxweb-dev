import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TempoSessaoService {

  tempoSessao:any;
  tempoAcabou = new EventEmitter();
  constructor() { }

}
