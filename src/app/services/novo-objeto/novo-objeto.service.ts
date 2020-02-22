import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NovoObjetoService {

  initObjeto = new EventEmitter();

  constructor() { }



}
