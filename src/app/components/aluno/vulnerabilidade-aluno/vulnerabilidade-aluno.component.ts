import { Aluno } from './../../../core/aluno';
import { Component, OnInit, Input, AfterContentChecked, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'vulnerabilidade-aluno',
  templateUrl: './vulnerabilidade-aluno.component.html',
  styleUrls: ['./vulnerabilidade-aluno.component.css']
})
export class VulnerabilidadeAlunoComponent implements OnInit, AfterContentChecked {

  @Input() aluno: Aluno;

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
