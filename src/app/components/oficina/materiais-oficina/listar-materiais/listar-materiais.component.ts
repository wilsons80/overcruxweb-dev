import { Component, OnInit, Output, EventEmitter, Input, ViewChild, SimpleChanges } from '@angular/core';
import { MateriaisAtividade } from 'src/app/core/materiais-atividade';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Acesso } from 'src/app/core/acesso';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';

@Component({
  selector: 'listar-materiais',
  templateUrl: './listar-materiais.component.html',
  styleUrls: ['./listar-materiais.component.css']
})
export class ListarMateriaisComponent implements OnInit {

  @Output() onAtualizarMaterial = new EventEmitter();
  @Output() onAdicionar = new EventEmitter();

  @Input() materiaisAtividade: MateriaisAtividade[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['material', 'datainicio', 'quantidade', 'acoes'];
  dataSource: MatTableDataSource<MateriaisAtividade> = new MatTableDataSource();

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    this.dataSource.paginator = this.paginator;
    this.carregarLista();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["materiaisAtividade"] && !_.isEmpty(changes["materiaisAtividade"].currentValue)) {
      this.carregarLista();
    }
  }

  carregarLista() {
      if (_.isEmpty(this.materiaisAtividade)) {
        this.mostrarTabela = false;
        this.msg = 'Nenhum material cadastrado.';
      } else {
        this.dataSource.data = this.materiaisAtividade;
        this.mostrarTabela = true;
    }
  }

  deletar(materialAtividade: any): void {
    const index = this.materiaisAtividade.indexOf( this.materiaisAtividade.find(col => col === materialAtividade));
    if (index >= 0) {
      this.materiaisAtividade.splice(index, 1);
      this.carregarLista();
    }
  }

  atualizar(materialAtividade: MateriaisAtividade) {
    this.onAtualizarMaterial.emit(materialAtividade);
  }

  novo() {
    this.onAdicionar.emit(true);
  }

}
