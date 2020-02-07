import { Component, OnInit } from '@angular/core';
import { ContaBancaria } from 'src/app/core/conta-bancaria';
import { Unidade } from 'src/app/core/unidade';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'dados-contas-bancarias',
  templateUrl: './dados-contas-bancarias.component.html',
  styleUrls: ['./dados-contas-bancarias.component.css']
})
export class DadosContasBancariasComponent implements OnInit {

  openFormCadastro = false;

  mostrarTabela= false;

  contasSelecionadas:ContaBancaria[] = [];

  displayedColumns: string[] = ['nome', 'cpf', 'cargo', 'acoes'];
  dataSource: MatTableDataSource<ContaBancaria> = new MatTableDataSource();

  msg = "Nenhuma conta adicionada"

  listaContas:ContaBancaria[] = [
    {
      id: 1,
      informacoesBanco:{ nome: "Banco do Brasil", numero: "001"},
      numeroAgencia:"00001",
      numeroContaBancaria: 12345,
      tipoContaBancaria:"C",
      unidade: new Unidade()
    },
    
    {
      id: 2,
      informacoesBanco:{ nome: "Banco de Brasília", numero: "002"},
      numeroAgencia:"00002",
      numeroContaBancaria: 54321,
      tipoContaBancaria:"C",
      unidade: new Unidade()
    }

  ]

  constructor() { }

  ngOnInit() {}

  carregarLista(){}

  deletar(element){}
  atualizar(element){}
  novo(){}
}
