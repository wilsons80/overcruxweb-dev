import { Component, OnInit, Input } from '@angular/core';
import { Atividade } from 'src/app/core/atividade';




@Component({
  selector: 'dados-atividade',
  templateUrl: './dados-atividade.component.html',
  styleUrls: ['./dados-atividade.component.css']
})
export class DadosAtividadeComponent implements OnInit {

  @Input() atividade: Atividade;

  constructor() { }

  ngOnInit() { }


}
