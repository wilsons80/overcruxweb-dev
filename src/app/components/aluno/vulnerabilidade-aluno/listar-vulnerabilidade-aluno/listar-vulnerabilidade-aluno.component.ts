import { VulnerabilidadesAluno } from './../../../../core/vulnerabilidades-aluno';
import { Aluno } from './../../../../core/aluno';
import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Acesso } from 'src/app/core/acesso';
import { ActivatedRoute } from '@angular/router';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';

@Component({
  selector: 'listar-vulnerabilidade-aluno',
  templateUrl: './listar-vulnerabilidade-aluno.component.html',
  styleUrls: ['./listar-vulnerabilidade-aluno.component.css']
})
export class ListarVulnerabilidadeAlunoComponent implements OnInit {

  @Output() onVulnerabilidade = new EventEmitter();
  @Output() onAdicionar = new EventEmitter();
  @Input() aluno: Aluno;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['nome', 'dataIdentificacao', 'dataSolucao', 'vulnerabilidade', 'solucao', 'acoes'];
  dataSource: MatTableDataSource<VulnerabilidadesAluno> = new MatTableDataSource();

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    this.dataSource.paginator = this.paginator;
    this.carregarLista();
  }

  carregarLista() {
    if (!this.aluno.vulnerabilidades || this.aluno.vulnerabilidades.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhuma vulnerabilidade cadastrada.';
    } else {
      this.dataSource.data = this.aluno.vulnerabilidades ? this.aluno.vulnerabilidades : [];
      this.mostrarTabela = true;
    }
  }

  atualizar(vulnerabilidade) {
    this.onVulnerabilidade.emit(vulnerabilidade);
  }

  deletar(vulnerabilidade: any): void {
    const index = this.aluno.vulnerabilidades.indexOf( this.aluno.vulnerabilidades.find(vul => vul === vulnerabilidade));
    if (index >= 0) {
      this.aluno.vulnerabilidades.splice(index, 1);
      this.carregarLista();
    }
  }

  novo() {
    this.onAdicionar.emit(true);
  }
}
