import { Component, OnInit, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { Projeto } from 'src/app/core/projeto';


@Component({
  selector: 'dados-projeto',
  templateUrl: './dados-projeto.component.html',
  styleUrls: ['./dados-projeto.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class DadosProjetoComponent implements OnInit {

  @Input() projeto:Projeto;

  constructor() { }

  ngOnInit() {
  }

}
