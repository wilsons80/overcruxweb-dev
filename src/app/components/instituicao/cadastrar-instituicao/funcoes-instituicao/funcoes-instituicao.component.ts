import { Funcoes } from './../../../../core/funcoes';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Acesso } from 'src/app/core/acesso';

@Component({
  selector: 'funcoes-instituicao',
  templateUrl: './funcoes-instituicao.component.html',
  styleUrls: ['./funcoes-instituicao.component.css']
})
export class FuncoesInstituicaoComponent implements OnInit {

  @Input() listaFuncoesInstituicao: Funcoes[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  mostrarTabela = false;
  msg: string = "Nenhuma função adicionada";

  listaFuncoes = [{ nome: "FUNÇÃO 1" }, { nome: "FUNÇÃO 2" }];
  funcionarios = [{ nome: "FUNCIONÁRIO 1" }, { nome: "FUNCIONÁRIO 2" }];
  pedidosMaterial = [{ nome: "Pedido 1" }, { nome: "Pedido 2" }];

  
  displayedColumns: string[] = ['categoria','material', 'qtdMaterial', 'valorUnitarioItem', 'valorTotalItem','acoes'];
  dataSource: MatTableDataSource<Funcoes> = new MatTableDataSource();

  funcoes: Funcoes;

  perfilAcesso: Acesso;

  openFormCadastro = false;
  isAtualizar = false;

  valorUnitario: number = 0;
  valorTotal: number = 0;
  quantidade: number = 0;

  constructor(
  ) { }

  ngOnInit() {

    this.inicializaLista();
  }

  initObjeto() {}

  limpar() { }

  adicionar() {}

  getObjetosCompletosParaLista(funcoes: Funcoes) {}

  atualizar() { }


  inicializaLista(){

    this.dataSource.data = this.listaFuncoesInstituicao;
  }

  carregarLista(){}

}
