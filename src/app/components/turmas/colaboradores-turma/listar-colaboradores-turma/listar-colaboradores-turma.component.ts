import { TipoCargo } from 'src/app/core/tipo-cargo';
import { Component, OnInit, Output, Input, EventEmitter, ViewChild } from '@angular/core';
import { ColaboradoresTurma } from 'src/app/core/colaboradores-turma';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Acesso } from 'src/app/core/acesso';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'listar-colaboradores-turma',
  templateUrl: './listar-colaboradores-turma.component.html',
  styleUrls: ['./listar-colaboradores-turma.component.css']
})
export class ListarColaboradoresTurmaComponent implements OnInit {

  @Output() onAtualizarColaborador = new EventEmitter();
  @Output() onAdicionar = new EventEmitter();
  @Input() colaboradoresTurma: ColaboradoresTurma[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  mostrarTabela = false;
  msg: string;
  tipoCargo: TipoCargo = new TipoCargo();

  displayedColumns: string[] = ['nome', 'cargo', 'tipoCargo', 'acoes'];
  dataSource: MatTableDataSource<ColaboradoresTurma> = new MatTableDataSource();

  perfilAcesso: Acesso;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.perfilAcesso =  this.activatedRoute.snapshot.data.perfilAcesso[0];

    this.dataSource.paginator = this.paginator;
    this.carregarLista();
  }

  carregarLista() {
      if (_.isEmpty(this.colaboradoresTurma)) {
        this.mostrarTabela = false;
        this.msg = 'Nenhum colaborador cadastrado.';
      } else {
        this.dataSource.data = this.colaboradoresTurma;
        this.mostrarTabela = true;
    }
  }

  deletar(colaborador: any): void {
    const index = this.colaboradoresTurma.indexOf( this.colaboradoresTurma.find(col => col === colaborador));
    if (index >= 0) {
      this.colaboradoresTurma.splice(index, 1);
      this.carregarLista();
    }
  }

  atualizar(colaboradorTurma: ColaboradoresTurma) {
    this.onAtualizarColaborador.emit(colaboradorTurma);
  }

  novo() {
    this.onAdicionar.emit(true);
  }


}
