import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnidadeSelecionadaService {

  unidadesSelecionadas = new EventEmitter();

  constructor() { }
}
