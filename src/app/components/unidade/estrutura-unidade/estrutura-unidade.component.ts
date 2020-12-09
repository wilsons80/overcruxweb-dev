import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { Acesso } from 'src/app/core/acesso';
import { ContasBancaria } from 'src/app/core/contas-bancaria';
import { EstruturaUnidade } from 'src/app/core/estrutura-unidade';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'estrutura-unidade',
  templateUrl: './estrutura-unidade.component.html',
  styleUrls: ['./estrutura-unidade.component.css']
})
export class EstruturaUnidadeComponent implements OnInit {

  @Input() listaEstruturaUnidade: EstruturaUnidade[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  mostrarTabela = false;
  msg: string = "Nenhuma estrutura adicionada";

  displayedColumns: string[] = ['descricao', 'quantidade', 'acoes'];
  dataSource: MatTableDataSource<EstruturaUnidade> = new MatTableDataSource();

  estruturaUnidade: EstruturaUnidade;

  perfilAcesso: Acesso;

  openFormCadastro = false;
  isAtualizar = false;


  constructor(


  ) { }

  ngOnInit() {
    this.initObjetos();

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["listaEstruturaUnidade"] && changes["listaEstruturaUnidade"].currentValue) {
      this.carregarLista();
    }
  }

  adicionar() {
    const estruturaSelecionada = new EstruturaUnidade();
    Object.assign(estruturaSelecionada, this.estruturaUnidade);


    this.listaEstruturaUnidade.push(estruturaSelecionada);
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



  atualizarFuncao(estruturaUnidade: EstruturaUnidade) {
    this.estruturaUnidade = estruturaUnidade;
    this.openFormCadastro = true;
    this.isAtualizar = true;

  }

  limpar() {
    this.initObjetos();
  }

  carregarLista() {
    if (this.listaEstruturaUnidade.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhuma estrutura adicionada.';
    } else {
      this.dataSource.data = this.listaEstruturaUnidade ? this.listaEstruturaUnidade : [];
      this.mostrarTabela = true;
    }
  }


  initObjetos() {
    this.estruturaUnidade = new EstruturaUnidade();
  }

  deletar(estruturaUnidade: EstruturaUnidade): void {
    const index = this.listaEstruturaUnidade.indexOf(this.listaEstruturaUnidade.find(fi => fi === estruturaUnidade));
    if (index >= 0) {
      this.listaEstruturaUnidade.splice(index, 1);
      this.carregarLista();
    }
  }

  atualizarCentrosDeCusto(estruturaUnidade: EstruturaUnidade) {
    this.estruturaUnidade = estruturaUnidade;
    this.openFormCadastro = true;
    this.isAtualizar = true;

  }

}
