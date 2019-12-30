import { Component, OnInit, Input } from '@angular/core';
import { Departamento } from 'src/app/core/departamento';


@Component({
  selector: 'dados-departamento',
  templateUrl: './dados-departamento.component.html',
  styleUrls: ['./dados-departamento.component.css']
})
export class DadosDepartamentoComponent implements OnInit {

  @Input() departamento: Departamento;

  constructor() { }

  ngOnInit() { }


}
