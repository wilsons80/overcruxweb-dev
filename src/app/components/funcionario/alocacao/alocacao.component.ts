import { Component, OnInit, Input, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { Funcionario } from 'src/app/core/funcionario';

@Component({
  selector: 'alocacao',
  templateUrl: './alocacao.component.html',
  styleUrls: ['./alocacao.component.css']
})
export class AlocacaoComponent implements OnInit, AfterContentChecked {

  @Input() funcionario: Funcionario;

  openFormCadastro = false;

  constructor(protected drc: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterContentChecked(): void {
    this.drc.detectChanges();
  }

  onGetAdicionar(evento) {
    this.openFormCadastro = evento;
  }

  dateToString(data) {
    if (data) {
      const dataFormate = new Date(data);
      return dataFormate.toLocaleDateString();
    }
    return '';
  }


}
