import { Component, Input, OnInit } from '@angular/core';
import { Unidade } from 'src/app/core/unidade';





@Component({
  selector: 'dados-unidade',
  templateUrl: './dados-unidade.component.html',
  styleUrls: ['./dados-unidade.component.css']
})
export class DadosUnidadeComponent implements OnInit {

  @Input() unidade: Unidade;

  constructor() { }

  ngOnInit() { }


}
