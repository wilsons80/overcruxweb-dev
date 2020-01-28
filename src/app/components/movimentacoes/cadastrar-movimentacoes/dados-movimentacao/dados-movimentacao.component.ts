import { Empresa } from './../../../../core/empresa';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dados-movimentacao',
  templateUrl: './dados-movimentacao.component.html',
  styleUrls: ['./dados-movimentacao.component.css']
})
export class DadosMovimentacaoComponent implements OnInit {

  empresas = [{nome:'Empresa 1'}, {nome: 'Empresa 2'}];
  tiposMovimentacao = [{id: 'E', descricao: 'ENTRADA'},{id: 'S', descricao: 'SAÍDA'}]

  constructor() { }

  ngOnInit() {
  }

}
