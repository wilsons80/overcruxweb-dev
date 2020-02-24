import { Acoes } from './../../../core/acoes';
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'materiais-acoes',
  templateUrl: './materiais-acoes.component.html',
  styleUrls: ['./materiais-acoes.component.css']
})
export class MateriaisAcoesComponent implements OnInit {

  @Input() acao: Acoes;
  openFormCadastro = false;
  
  constructor(protected drc: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  ngAfterContentChecked(): void {
    this.drc.detectChanges();
  }

  onGetAdicionar(evento) {
    this.openFormCadastro = evento;
  }

}
