import { Component, OnInit, Input, EventEmitter, Output, ViewChild, SimpleChanges } from '@angular/core';
import { Atividade } from 'src/app/core/atividade';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Acesso } from 'src/app/core/acesso';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';


@Component({
  selector: 'listar-oficinas',
  templateUrl: './listar-oficinas.component.html',
  styleUrls: ['./listar-oficinas.component.css']
})
export class ListarOficinasComponent implements OnInit {

  @Input() oficinas: Atividade[];
  @Output() onAtualizarOficina = new EventEmitter();
  @Output() onAdicionar = new EventEmitter();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['descricao', 'datainicio', 'datafim', 'maxparticipantes', 'projeto', 'acoes'];
  dataSource: MatTableDataSource<Atividade> = new MatTableDataSource();

  perfilAcesso: Acesso;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.perfilAcesso =  this.activatedRoute.snapshot.data.perfilAcesso[0];

    this.dataSource.paginator = this.paginator;
    this.carregarLista();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["oficinas"] && !_.isEmpty(changes["oficinas"].currentValue)) {
      this.carregarLista();
    }
  }


  carregarLista() {
      if (_.isEmpty(this.oficinas)) {
        this.mostrarTabela = false;
        this.msg = 'Nenhuma oficina cadastrada.';
      } else {
        this.dataSource.data = this.oficinas;
        this.mostrarTabela = true;
    }
  }

  deletar(oficina: any): void {
    const index = this.oficinas.indexOf( this.oficinas.find(col => col === oficina));
    if (index >= 0) {
      this.oficinas.splice(index, 1);
      this.carregarLista();
    }
  }

  atualizar(oficina: Atividade) {
    this.onAtualizarOficina.emit(oficina);
  }

  novo() {
    this.onAdicionar.emit(true);
  }

}
