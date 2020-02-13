import { Component, OnInit } from '@angular/core';
import { ContasBancaria } from 'src/app/core/contas-bancaria';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'dados-contas-bancarias',
  templateUrl: './dados-contas-bancarias.component.html',
  styleUrls: ['./dados-contas-bancarias.component.css']
})
export class DadosContasBancariasComponent implements OnInit {

  openFormCadastro = false;

  mostrarTabela= false;

  contasSelecionadas:ContasBancaria[] = [];

  displayedColumns: string[] = ['nome', 'cpf', 'cargo', 'acoes'];
  dataSource: MatTableDataSource<ContasBancaria> = new MatTableDataSource();

  msg = "Nenhuma conta adicionada"

  listaContas:ContasBancaria[];
  

  constructor() { }

  ngOnInit() {}

  carregarLista(){}

  deletar(element){}
  atualizar(element){}
  novo(){}
}
