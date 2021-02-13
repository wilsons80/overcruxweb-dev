import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { Familiares } from 'src/app/core/familiares';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


import { VulnerabilidadesFamiliar } from 'src/app/core/vulnerabilidades-familiar';
import { Acesso } from 'src/app/core/acesso';
import { ActivatedRoute } from '@angular/router';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';

@Component({
  selector: 'listar-vulnerabilidade',
  templateUrl: './listar-vulnerabilidade.component.html',
  styleUrls: ['./listar-vulnerabilidade.component.css']
})
export class ListarVulnerabilidadeComponent implements OnInit {

  @Output() onVulnerabilidade = new EventEmitter();
  @Output() onAdicionar = new EventEmitter();
  @Input() familiar: Familiares;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['nome', 'dataIdentificacao', 'dataSolucao', 'vulnerabilidade', 'solucao', 'acoes'];
  dataSource: MatTableDataSource<VulnerabilidadesFamiliar> = new MatTableDataSource();

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    this.dataSource.paginator = this.paginator;
    this.carregarLista();
  }

  carregarLista() {
    if (this.familiar && this.familiar.vulnerabilidades) {
      if (!this.familiar.vulnerabilidades || this.familiar.vulnerabilidades.length === 0) {
        this.mostrarTabela = false;
        this.msg = 'Nenhuma vulnerabilidade cadastrada.';
      } else {
        this.dataSource.data = this.familiar.vulnerabilidades ? this.familiar.vulnerabilidades : [];
        this.mostrarTabela = true;
      }
    }
  }

  atualizar(vulnerabilidade) {
    this.onVulnerabilidade.emit(vulnerabilidade);
  }

  deletar(vulnerabilidade: any): void {
    const index = this.familiar.vulnerabilidades.indexOf( this.familiar.vulnerabilidades.find(vul => vul === vulnerabilidade));
    if (index >= 0) {
      this.familiar.vulnerabilidades.splice(index, 1);
      this.carregarLista();
    }
  }

  novo() {
    this.onAdicionar.emit(true);
  }
}
