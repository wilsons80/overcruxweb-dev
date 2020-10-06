import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'qtd-servicos-pendentes-cell',
  templateUrl: './qtd-servicos-pendentes-cell.component.html',
  styleUrls: ['./qtd-servicos-pendentes-cell.component.css']
})
export class QtdServicosPendentesComponent implements OnInit {

  @Input() qtdServicosPendentes: any = {};
  @Input() expandido: boolean;

  toolTip: string;

  constructor() { }

  ngOnInit() {
    this.toolTip = 'Clique para ver todos os rateios.';
  }

}
