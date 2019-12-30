import { Atividade } from './../../../../core/atividade';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'materiais-oficina',
  templateUrl: './materiais-oficina.component.html',
  styleUrls: ['./materiais-oficina.component.css']
})
export class MateriaisOficinaComponent implements OnInit {

  @Input() oficina: Atividade;

  openFormCadastro = false;

  constructor() {
  }

  ngOnInit() {
  }

  onGetAdicionar(evento) {
    this.openFormCadastro = evento;
  }

}
