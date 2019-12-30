import { Component, OnInit, Input, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { Atividade } from 'src/app/core/atividade';

@Component({
  selector: 'colaboradores-atividade',
  templateUrl: './colaboradores-atividade.component.html',
  styleUrls: ['./colaboradores-atividade.component.css']
})
export class ColaboradoresAtividadeComponent implements OnInit, AfterContentChecked {

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
