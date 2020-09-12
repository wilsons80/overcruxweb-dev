import { ToastService } from './../../../../services/toast/toast.service';
import { PagamentosFatura } from 'src/app/core/pagamentos-fatura';
import { Component, OnInit, Input, ViewChild, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Acesso } from 'src/app/core/acesso';
import { Fatura } from 'src/app/core/fatura';
import * as _ from 'lodash';
import { Movimentacoes } from 'src/app/core/movimentacoes';
import { Tributos } from 'src/app/core/tributos';
import { TributoMovimentacao } from 'src/app/core/tributo-movimentacao';

@Component({
  selector: 'faturas-movimentacao',
  templateUrl: './faturas-movimentacao.component.html',
  styleUrls: ['./faturas-movimentacao.component.css']
})
export class FaturasMovimentacaoComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() movimentacoes:Movimentacoes;

  mostrarTabela = false;
  msg: string = "Nenhum fatura adicionada";


  displayedColumns: string[] = ['dataVencimento', 'valor', 'numeroParcela','tributo', 'acoes'];
  dataSource: MatTableDataSource<Fatura> = new MatTableDataSource();

  tributos: Tributos[];
  fatura: Fatura;
  perfilAcesso: Acesso;
  openFormCadastro = false;
  isAtualizar = false;

  valoresSuperiorValorMovimento = false;

  constructor(
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    this.initObjetos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    //if (changes["movimentacoes.faturas"] && changes["movimentacoes.faturas"].currentValue) {
      this.carregarLista();
    //}
  }

  ngAfterContentChecked(): void {
    this.carregarTributos();
  }

  carregarTributos() {
    this.tributos = [];
    if(this.movimentacoes.tributos) {
      const distinct = (value, index, self) => self.indexOf(value) === index;
      this.tributos = this.movimentacoes.tributos.map(t => t.tributo).filter(distinct);

      if(this.fatura.tributoMovimentacao && this.fatura.tributoMovimentacao.tributo) {
        this.selecionaTributo(this.fatura.tributoMovimentacao.tributo.id);
      }
    }
  }


  adicionar() {
    const contasCentrosCustoSelecionada = new Fatura();
    Object.assign(contasCentrosCustoSelecionada, this.fatura);
    this.movimentacoes.faturas.push(contasCentrosCustoSelecionada);
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
    if (this.movimentacoes.faturas.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhuma fatura adicionada.';
    } else {
      this.dataSource.data = this.movimentacoes.faturas ? this.movimentacoes.faturas : [];
      this.mostrarTabela = true;
    }
  }


  initObjetos() {
    this.fatura = new Fatura();
    this.fatura.tributoMovimentacao = new TributoMovimentacao();
    this.fatura.tributoMovimentacao.tributo = new Tributos();
  }

  deletar(fatura: Fatura): void {
    if (this.existemPagamentos(fatura)) {
      this.toastService.showAlerta("Não é possui excluir essa fatura pois existem pagamentos vinculados a ela.")
      return;
    }
    const index = this.movimentacoes.faturas.indexOf(this.movimentacoes.faturas.find(fi => fi === fatura));
    if (index >= 0) {
      this.movimentacoes.faturas.splice(index, 1);
      this.carregarLista();
    }
  }


  atualizarRegistro(fatura: Fatura) {
    this.fatura = fatura;
    this.openFormCadastro = true;
    this.isAtualizar = true;

    this.carregarTributos();

  }

  existemPagamentos(fatura: Fatura) {
    return this.movimentacoes.pagamentosFatura && this.movimentacoes.pagamentosFatura.find((l: PagamentosFatura) => l.idFatura == fatura.id)
  }

  getValorTotal() {
    this.valoresSuperiorValorMovimento = false;
    if(this.movimentacoes.faturas && this.movimentacoes.faturas.length > 0) {
      const valorItens = this.movimentacoes.faturas.map(v => v.valor).reduce( (valor, total) => total += valor) 
      if(valorItens !== this.movimentacoes.valorMovimentacao) {
        this.valoresSuperiorValorMovimento = true;
      }
      return valorItens;
    }
    return 0;
  }


  onValorTributoChange(item) {
    this.fatura.tributoMovimentacao.idMovimentacao = this.movimentacoes.id;
    this.fatura.tributoMovimentacao.tributo = item;
  }

  selecionaTributo(idTributo: number) {
    if(this.tributos) {
      const tributo = this.tributos.find((item: any) => item.id === idTributo);
      if (!!tributo) {
        this.onValorTributoChange(tributo);
      }
    }
  }
}
