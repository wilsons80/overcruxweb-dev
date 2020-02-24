import { Acoes } from './../../../core/acoes';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'materiais-acoes',
  templateUrl: './materiais-acoes.component.html',
  styleUrls: ['./materiais-acoes.component.css']
})
export class MateriaisAcoesComponent implements OnInit {

  @Input() acao: Acoes;

  constructor() { }

  ngOnInit() {
  }

}
