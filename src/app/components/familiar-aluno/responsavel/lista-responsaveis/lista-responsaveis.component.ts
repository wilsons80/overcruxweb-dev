import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


import { Component, OnInit, Input, ViewChild, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Familiares } from 'src/app/core/familiares';
import { ResponsaveisAluno } from 'src/app/core/responsaveis-aluno';
import { TipoResponsaveis } from 'src/app/core/tipo-responsaveis';
import { Acesso } from 'src/app/core/acesso';
import { ActivatedRoute } from '@angular/router';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';


@Component({
  selector: 'lista-responsaveis',
  templateUrl: './lista-responsaveis.component.html',
  styleUrls: ['./lista-responsaveis.component.css']
})
export class ListaResponsaveisComponent implements OnInit {


  @Output() onResponsavel = new EventEmitter();
  @Output() onAdicionar = new EventEmitter();
  @Input() familiar: Familiares;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['nome', 'dataVinculacao', 'dataDesvinculacao', 'aluno', 'acoes'];
  dataSource: MatTableDataSource<ResponsaveisAluno> = new MatTableDataSource();

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    this.dataSource.paginator = this.paginator;
    this.carregarListaResponsaveis();
  }

  carregarListaResponsaveis() {
    if (this.familiar && this.familiar.responsaveis) {
      if (!this.familiar.responsaveis || this.familiar.responsaveis.length === 0) {
        this.mostrarTabela = false;
        this.msg = 'Nenhum responsável cadastrado.';
      } else {
        this.dataSource.data = this.familiar.responsaveis ? this.familiar.responsaveis : [];
        this.mostrarTabela = true;
      }
    }
  }

  atualizar(responsavel) {
    this.onResponsavel.emit(responsavel);
  }

  deletar(responsavel: any): void {
    const index = this.familiar.responsaveis.indexOf( this.familiar.responsaveis.find(resp => resp === responsavel));
    if (index >= 0) {
      this.familiar.responsaveis.splice(index, 1);
      this.carregarListaResponsaveis();
    }
  }

  novo() {
    this.onAdicionar.emit(true);
  }
}
