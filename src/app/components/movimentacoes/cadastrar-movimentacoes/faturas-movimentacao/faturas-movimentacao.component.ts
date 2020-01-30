import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Acesso } from 'src/app/core/acesso';
import { FaturaMovimentacao } from 'src/app/core/fatura-movimentacao';

@Component({
  selector: 'faturas-movimentacao',
  templateUrl: './faturas-movimentacao.component.html',
  styleUrls: ['./faturas-movimentacao.component.css']
})
export class FaturasMovimentacaoComponent implements OnInit {

  @Input() listaFaturas: FaturaMovimentacao[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  mostrarTabela = true;
  msg: string;

  displayedColumns: string[] = ['dataVencimento', 'valorFatura', 'numeroParcelas', 'acoes'];
  dataSource: MatTableDataSource<FaturaMovimentacao> = new MatTableDataSource();

  openFormCadastro = false;

  perfilAcesso: Acesso;

  isAtualizar = false;

  constructor() { }

  ngOnInit() {

    this.initLista();
  }

  adicionar(){}
  limpar(){}
  atualizar(){}
  carregarLista(){}

  initLista(){
    const fatura1 = new FaturaMovimentacao;
    fatura1.dataVencimento = new Date();
    fatura1.valorFatura = 200;
    fatura1.numeroParcela = 2;
    
    const fatura = new FaturaMovimentacao;
    fatura.dataVencimento = new Date();
    fatura.valorFatura = 100;
    fatura.numeroParcela = 12;

    this.listaFaturas.push(fatura);
    this.listaFaturas.push(fatura1);

    this.dataSource.data = this.listaFaturas;

  }

}
