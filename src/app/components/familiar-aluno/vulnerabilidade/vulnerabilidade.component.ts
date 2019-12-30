import { Component, OnInit, Input, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { Familiares } from 'src/app/core/familiares';

@Component({
  selector: 'vulnerabilidade',
  templateUrl: './vulnerabilidade.component.html',
  styleUrls: ['./vulnerabilidade.component.css']
})
export class VulnerabilidadeComponent implements OnInit, AfterContentChecked {

  @Input() familiar: Familiares;

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
