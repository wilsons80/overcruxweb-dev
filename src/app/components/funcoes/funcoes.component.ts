import { Funcoes } from './../../core/funcoes';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'funcoes',
  templateUrl: './funcoes.component.html',
  styleUrls: ['./funcoes.component.css']
})
export class FuncoesComponent implements OnInit {

  listaFuncoes = [];
  mostrarTabela= false;
  displayedColumns: string[] = ['DataAtendimento', 'Aluno', 'Diagnostico', 'acoes'];
  dataSource: MatTableDataSource<Funcoes> = new MatTableDataSource();

  msg = "Nenhuma função cadastrada."

  constructor() { }

  ngOnInit() {
  }


  consultar(){}
  limpar(){}
  deletar(){}
  atualizar(){}



}
