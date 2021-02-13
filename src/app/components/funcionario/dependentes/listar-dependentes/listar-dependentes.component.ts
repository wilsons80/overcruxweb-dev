import { Component, OnInit, Output, Input, ViewChild, EventEmitter, SimpleChanges } from '@angular/core';
import { Funcionario } from 'src/app/core/funcionario';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Dependentes } from 'src/app/core/dependentes';
import { Acesso } from 'src/app/core/acesso';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';

@Component({
  selector: 'listar-dependentes',
  templateUrl: './listar-dependentes.component.html',
  styleUrls: ['./listar-dependentes.component.css']
})
export class ListarDependentesComponent implements OnInit {

  @Output() onDependente = new EventEmitter();
  @Output() onAdicionar = new EventEmitter();
  @Input() dependentes: Dependentes[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['nome', 'grauParentesco', 'sexo', 'possuiDeficiencia', 'acoes'];
  dataSource: MatTableDataSource<Dependentes> = new MatTableDataSource();

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    this.dataSource.paginator = this.paginator;
    this.carregarListaDependentes();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["dependentes"] && !_.isEmpty(changes["dependentes"].currentValue)) {
      this.carregarListaDependentes();
    }
  }

  carregarListaDependentes() {
    if (this.dependentes) {
      if (!this.dependentes || this.dependentes.length === 0) {
        this.mostrarTabela = false;
        this.msg = 'Nenhum dependente cadastrado.';
      } else {
        this.dataSource.data = this.dependentes ? this.dependentes : [];
        this.mostrarTabela = true;
      }
    }
  }

  atualizar(dependente) {
    this.onDependente.emit(dependente);
  }

  deletar(dependente: any): void {
    const index = this.dependentes.indexOf( this.dependentes.find(d => d === dependente));
    if (index >= 0) {
      this.dependentes.splice(index, 1);
      this.carregarListaDependentes();
    }
  }

  novo() {
    this.onAdicionar.emit(true);
  }

}
