import { Component, OnInit, Input, ViewChild, SimpleChanges } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Acesso } from 'src/app/core/acesso';
import { Fatura } from 'src/app/core/fatura';
import * as _ from 'lodash';

@Component({
  selector: 'faturas-movimentacao',
  templateUrl: './faturas-movimentacao.component.html',
  styleUrls: ['./faturas-movimentacao.component.css']
})
export class FaturasMovimentacaoComponent implements OnInit {

  @Input() listaFaturas: Fatura[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  mostrarTabela = false;
  msg: string = "Nenhum fatura adicionada";


  displayedColumns: string[] = ['dataVencimento', 'valor', 'numeroParcela', 'acoes'];
  dataSource: MatTableDataSource<Fatura> = new MatTableDataSource();

  fatura: Fatura;

  perfilAcesso: Acesso;

  openFormCadastro = false;
  isAtualizar = false;


  constructor() { }

  ngOnInit() {
    this.initObjetos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["listaFaturas"] && changes["listaFaturas"].currentValue) {
      this.carregarLista();
    }
  }

  adicionar() {
    const contasCentrosCustoSelecionada = new Fatura();
    Object.assign(contasCentrosCustoSelecionada, this.fatura);
    this.listaFaturas.push(contasCentrosCustoSelecionada);
    this.limpar();
    this.openFormCadastro = !this.openFormCadastro;
  }



  novo() {
    this.isAtualizar = false;
    this.openFormCadastro = !this.openFormCadastro;
    this.limpar();
  }

  atualizar() {
    this.limpar();
    this.openFormCadastro = false;
    this.isAtualizar = false;
  }



  atualizarFuncao(fatura: Fatura) {
    this.fatura = fatura;
    this.openFormCadastro = true;
    this.isAtualizar = true;

  }

  limpar() {
    this.initObjetos();
  }

  carregarLista() {
    if (this.listaFaturas.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhuma fatura adicionada.';
    } else {
      this.dataSource.data = this.listaFaturas ? this.listaFaturas : [];
      this.mostrarTabela = true;
    }
  }


  initObjetos() {
    this.fatura = new Fatura();
  }

  deletar(fatura: Fatura): void {
    const index = this.listaFaturas.indexOf(this.listaFaturas.find(fi => fi === fatura));
    if (index >= 0) {
      this.listaFaturas.splice(index, 1);
      this.carregarLista();
    }
  }


  atualizarRegistro(fatura: Fatura) {
    this.fatura = fatura;
    this.openFormCadastro = true;
    this.isAtualizar = true;
  }

}
