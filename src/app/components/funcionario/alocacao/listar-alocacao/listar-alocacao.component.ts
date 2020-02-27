import { AlocacaoFuncionario } from './../../../../core/alocacao-funcionario';
import { Funcionario } from 'src/app/core/funcionario';
import { Component, OnInit, Output, Input, EventEmitter, ViewChild, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Acesso } from 'src/app/core/acesso';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'listar-alocacao',
  templateUrl: './listar-alocacao.component.html',
  styleUrls: ['./listar-alocacao.component.css']
})
export class ListarAlocacaoComponent implements OnInit {


  @Output() onAlocacao = new EventEmitter();
  @Output() onAdicionar = new EventEmitter();
  @Input() alocacoesFuncionario: AlocacaoFuncionario[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['programa_projeto', 'dataInicio', 'dataFim', 'acoes'];
  dataSource: MatTableDataSource<AlocacaoFuncionario> = new MatTableDataSource();

  perfilAcesso: Acesso;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.perfilAcesso =  this.activatedRoute.snapshot.data.perfilAcesso[0];

    this.dataSource.paginator = this.paginator;
    this.carregarListaAlocacao();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["alocacoesFuncionario"] && !_.isEmpty(changes["alocacoesFuncionario"].currentValue)) {
      this.carregarListaAlocacao();
    }
  }

  carregarListaAlocacao() {
    if (this.alocacoesFuncionario) {
      if (!this.alocacoesFuncionario || this.alocacoesFuncionario.length === 0) {
        this.mostrarTabela = false;
        this.msg = 'Nenhum alocação cadastrada.';
      } else {
        this.dataSource.data = this.alocacoesFuncionario ? this.alocacoesFuncionario : [];
        this.mostrarTabela = true;
      }
    }
  }

  atualizar(alocacao) {
    this.onAlocacao.emit(alocacao);
  }

  deletar(alocacao: any): void {
    const index = this.alocacoesFuncionario.indexOf( this.alocacoesFuncionario.find(aloc => aloc === alocacao));
    if (index >= 0) {
      this.alocacoesFuncionario.splice(index, 1);
      this.carregarListaAlocacao();
    }
  }

  novo() {
    this.onAdicionar.emit(true);
  }

}
