import { FaturaService } from './../../../../services/fatura/fatura.service';
import { ContasBancariaService } from './../../../../services/contas-bancaria/contas-bancaria.service';
import { Component, OnInit, ViewChild, Input, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Acesso } from 'src/app/core/acesso';
import { PagamentosFatura } from 'src/app/core/pagamentos-fatura';
import * as _ from 'lodash';
import { ContasBancaria } from 'src/app/core/contas-bancaria';
import { Fatura } from 'src/app/core/fatura';
import { SaldosContasBancaria } from 'src/app/core/saldos-contas-bancaria';

@Component({
  selector: 'pagamentos-movimentacao',
  templateUrl: './pagamentos-movimentacao.component.html',
  styleUrls: ['./pagamentos-movimentacao.component.css']
})
export class PagamentosMovimentacaoComponent implements OnInit {

  @Input() listaPagamentosFatura: PagamentosFatura[];
  @Input() idMovimentacao: number;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  mostrarTabela = false;
  msg: string = "Nenhum item movimentação adicionado";

  maxDataPagamento = new Date();

  formasPagamento = [
    {id: "A", descricao: "CARTÃO DE CRÉDITO" },
    {id: "B", descricao: "DÉBITO EM CARTÃO" },
    {id: "C", descricao: "CHEQUE" },
    {id: "D", descricao: "EM DINHEIRO" }
  ]


  displayedColumns: string[] = ['fatura', 'formaPagamento', 'dataPagamento', 'valorPagamento', 'acoes'];
  dataSource: MatTableDataSource<PagamentosFatura> = new MatTableDataSource();

  pagamentosFatura: PagamentosFatura;

  perfilAcesso: Acesso;

  openFormCadastro = false;
  isAtualizar = false;
  contasBancarias: ContasBancaria[];
  listaFaturas: Fatura[];


  constructor(
    private contasBancariaService: ContasBancariaService,
    private faturaService: FaturaService
  ) { 
    this.maxDataPagamento = new Date();
  }

  ngOnInit() {
    this.initObjetos();

    this.contasBancariaService.getAllComboByInstituicaoLogada().subscribe((contasBancarias: ContasBancaria[]) => {
      this.contasBancarias = contasBancarias;
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["listaPagamentosFatura"] && changes["listaPagamentosFatura"].currentValue) {
      this.carregarLista();
    }
    
    if (changes["idMovimentacao"] && changes["idMovimentacao"].currentValue) {
      this.faturaService.getAllPorMovimentacoes(this.idMovimentacao).subscribe((listaFaturas: Fatura[]) => {
        this.listaFaturas = listaFaturas;
      })
    }
  }

  adicionar() {
    const contasCentrosCustoSelecionada = new PagamentosFatura();
    Object.assign(contasCentrosCustoSelecionada, this.pagamentosFatura);

    this.getObjetosCompletosParaLista(contasCentrosCustoSelecionada);

    this.listaPagamentosFatura.push(contasCentrosCustoSelecionada);
    this.limpar();
    this.openFormCadastro = !this.openFormCadastro;
  }


  getObjetosCompletosParaLista(pagamentosFatura: PagamentosFatura) {
    pagamentosFatura.contaBancaria = _.find(this.contasBancarias, (m: ContasBancaria) => m.id == pagamentosFatura.contaBancaria.id);
    pagamentosFatura.fatura = _.find(this.listaFaturas, (m: Fatura) => m.id == pagamentosFatura.fatura.id);
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



  atualizarFuncao(pagamentosFatura: PagamentosFatura) {
    this.pagamentosFatura = pagamentosFatura;
    this.openFormCadastro = true;
    this.isAtualizar = true;

  }

  limpar() {
    this.initObjetos();
  }

  carregarLista() {
    if (this.listaPagamentosFatura.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhum nenhum pagamento adicionado.';
    } else {
      this.dataSource.data = this.listaPagamentosFatura ? this.listaPagamentosFatura : [];
      this.mostrarTabela = true;
    }
  }


  initObjetos() {
    this.pagamentosFatura = new PagamentosFatura();
    this.pagamentosFatura.contaBancaria = new ContasBancaria();
    this.pagamentosFatura.saldoContaBancaria = new SaldosContasBancaria();
    this.pagamentosFatura.fatura = new Fatura();
  }

  deletar(pagamentosFatura: PagamentosFatura): void {
    const index = this.listaPagamentosFatura.indexOf(this.listaPagamentosFatura.find(fi => fi === pagamentosFatura));
    if (index >= 0) {
      this.listaPagamentosFatura.splice(index, 1);
      this.carregarLista();
    }
  }


  atualizarRegistro(pagamentosFatura: PagamentosFatura) {
    this.preencherObjetosVazios(pagamentosFatura);
    this.pagamentosFatura = pagamentosFatura;
    this.openFormCadastro = true;
    this.isAtualizar = true;
  }

  preencherObjetosVazios(pagamentosFatura: PagamentosFatura){
    if(!pagamentosFatura.contaBancaria){
      pagamentosFatura.contaBancaria = new ContasBancaria();
    }

    if(!pagamentosFatura.fatura){
      pagamentosFatura.fatura = new Fatura();
    }
   
    if(!pagamentosFatura.saldoContaBancaria){
      pagamentosFatura.saldoContaBancaria = new SaldosContasBancaria();
    }

  }

}
