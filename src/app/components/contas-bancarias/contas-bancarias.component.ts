import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { ContaBancaria } from 'src/app/core/conta-bancaria';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'contas-bancarias',
  templateUrl: './contas-bancarias.component.html',
  styleUrls: ['./contas-bancarias.component.css']
})
export class ContasBancariasComponent implements OnInit {

  listaContasBancarias = [];
  mostrarTabela= false;
  displayedColumns: string[] = ['DataAtendimento', 'Aluno', 'Diagnostico', 'acoes'];
  dataSource: MatTableDataSource<ContaBancaria> = new MatTableDataSource();

  msg = "Nenhuma conta cadastrada."

  constructor() { }

  ngOnInit() {
  }


  consultar(){}
  limpar(){}
  deletar(element){}
  atualizar(element){}
  

}
