import { Component, OnInit, Input, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { Atividade } from 'src/app/core/atividade';

@Component({
  selector: 'materiais-oficina',
  templateUrl: './materiais-oficina.component.html',
  styleUrls: ['./materiais-oficina.component.css']
})
export class MateriaisOficinaComponent implements OnInit, AfterContentChecked {

  @Input() oficina: Atividade;

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
