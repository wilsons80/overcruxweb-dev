import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComposicaoRhProgramaService {

  composicaoRhProgramaChange = new EventEmitter();

  constructor() { }
}
