import { Movimentacao } from './../../core/movimentacao';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Acesso } from 'src/app/core/acesso';

@Component({
  selector: 'movimentacoes',
  templateUrl: './movimentacoes.component.html',
  styleUrls: ['./movimentacoes.component.css']
})
export class MovimentacoesComponent implements OnInit {

  listaMovimentacoes =[];

  mostrarTabela = false;

  msg: "Nenhuma movimentação cadastrada."

  dataSource: MatTableDataSource<Movimentacao> = new MatTableDataSource();
  displayedColumns: string[] = ['nome', 'indicadores', 'dataInicio', 'dataFim', 'acoes'];
  perfilAcesso: Acesso;


  constructor() { }

  ngOnInit() {
  }

  consultar(){}
  limpar(){}

}
