import { PessoaFisica } from 'src/app/core/pessoa-fisica';
import { Component, OnInit, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'outras-informacoes',
  templateUrl: './outras-informacoes.component.html',
  styleUrls: ['./outras-informacoes.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class OutrasInformacoesComponent implements OnInit {

  @Input() pessoaFisica: PessoaFisica;

  constructor() { }

  ngOnInit() {
  }

}
