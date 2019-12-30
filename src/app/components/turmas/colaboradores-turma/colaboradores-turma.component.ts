import { Component, OnInit, Input, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { Turmas } from 'src/app/core/turmas';

@Component({
  selector: 'colaboradores-turma',
  templateUrl: './colaboradores-turma.component.html',
  styleUrls: ['./colaboradores-turma.component.css']
})
export class ColaboradoresTurmaComponent implements OnInit, AfterContentChecked {

  @Input() turma: Turmas;

  openFormCadastro = true;

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
