import { Acoes } from 'src/app/core/acoes';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SimpleChanges } from '@angular/core';
import { MateriaisAcao } from 'src/app/core/materiais-acao';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Acesso } from 'src/app/core/acesso';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';

@Component({
  selector: 'listar-materiais-acao',
  templateUrl: './listar-materiais-acao.component.html',
  styleUrls: ['./listar-materiais-acao.component.css']
})
export class ListarMateriaisAcaoComponent implements OnInit {

  @Input() materiaisAcao: MateriaisAcao[];
  @Output() onAtualizar = new EventEmitter();
  @Output() onAdicionar = new EventEmitter();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['quantidadematerial', 'nomematerial', 'acoes'];
  dataSource: MatTableDataSource<MateriaisAcao> = new MatTableDataSource();

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil;

  constructor(private activatedRoute: ActivatedRoute) {
    this.carregarPerfil = new CarregarPerfil();
  }

  ngOnInit() {
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    this.dataSource.paginator = this.paginator;
    this.carregarLista();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['materiaisAcao'] && !_.isEmpty(changes['materiaisAcao'].currentValue)) {
      this.carregarLista();
    }
  }


  carregarLista() {
      if (_.isEmpty(this.materiaisAcao)) {
        this.mostrarTabela = false;
        this.msg = 'Nenhum material cadastrado.';
      } else {
        this.dataSource.data = this.materiaisAcao;
        this.mostrarTabela = true;
    }
  }

  deletar(material: any): void {
    const index = this.materiaisAcao.indexOf( this.materiaisAcao.find(col => col === material));
    if (index >= 0) {
      this.materiaisAcao.splice(index, 1);
      this.carregarLista();
    }
  }

  atualizar(material: MateriaisAcao) {
    this.onAtualizar.emit(material);
  }

  novo() {
    this.onAdicionar.emit(true);
  }


}
