import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Acesso } from 'src/app/core/acesso';
import { PagamentoMovimentacao } from 'src/app/core/pagamento-movimentacao';

@Component({
  selector: 'pagamentos-movimentacao',
  templateUrl: './pagamentos-movimentacao.component.html',
  styleUrls: ['./pagamentos-movimentacao.component.css']
})
export class PagamentosMovimentacaoComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  listaPagamentos= [];
  mostrarTabela = true;
  msg: string;
  perfilAcesso: Acesso;

  openFormCadastro = false;
  isAtualizar = false;

  formaPagamento:any;

  displayedColumns: string[] = ['valorPagamento','dataPagamento', 'formaPagamento','acoes'];
  dataSource: MatTableDataSource<PagamentoMovimentacao> = new MatTableDataSource();


  faturas = [
    {data:"01/02/2020", valor:"100"},
    {data:"01/02/2020", valor:"200"},
  ]

  contasBancarias =[
    {nome:"CONTA BANCÁRIA 1"},
    {nome:"CONTA BANCÁRIA 2"}
  ]
  
  saldos =[
    {nome:"SALDO BANCÁRIO 1"},
    {nome:"SALDO BANCÁRIO 2"}
  ]

  formasPagamento=[
    {id: "A", descricao: "CHEQUE"},
    {id: "B", descricao: "CARTÃO DE CRÉDITO"},
    {id: "C", descricao: "DÉBITO EM CARTÃO"},
    {id: "D", descricao: "EM DINHEIRO"},
    
  ]

  valorPagamento = 0;

  constructor() { }

  ngOnInit() {
    this.initLista();
  }
  
  limpar(){}
  adicionar(){}
  atualizar(){}
  
  carregarLista(){}
 
  initLista() {

    const pagamento1 = new PagamentoMovimentacao();
    pagamento1.valorPagamento = 100.00;
    pagamento1.dataPagamento = new Date();
    pagamento1.formaPagamento = "CHEQUE"
    
    const pagamento2 = new PagamentoMovimentacao();
    pagamento2.valorPagamento = 500.00;
    pagamento2.dataPagamento = new Date();
    pagamento2.formaPagamento = "EM DINHEIRO"

    this.listaPagamentos.push(pagamento1);
    this.listaPagamentos.push(pagamento2);
    this.dataSource.data = this.listaPagamentos;

  }

}
