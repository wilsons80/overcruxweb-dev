import { SituacaoParentesco } from './../../core/situacao-parentesco';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Familiares } from 'src/app/core/familiares';
import { FamiliarAlunoService } from 'src/app/services/familiar-aluno/familiar-aluno.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { Acesso } from 'src/app/core/acesso';
import * as _ from 'lodash';


@Component({
  selector: 'app-familiar-aluno',
  templateUrl: './familiar-aluno.component.html',
  styleUrls: ['./familiar-aluno.component.css']
})
export class FamiliarAlunoComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  familiares: Familiares[];
  familiar: Familiares = new Familiares();
  perfilAcesso: Acesso;

  situacaoParentesco: SituacaoParentesco = new SituacaoParentesco();

  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['familiar', 'aluno', 'situacao', 'tutela', 'transportaaluno', 'respfinanceiro', 'dataCadastro', 'acoes'];
  dataSource: MatTableDataSource<Familiares> = new MatTableDataSource();

  constructor(
    private familiarService: FamiliarAlunoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.perfilAcesso =  this.activatedRoute.snapshot.data.perfilAcesso[0];

    this.dataSource.paginator = this.paginator;
    this.getAll();
  }


  limpar() {
    this.mostrarTabela = false;
    this.familiar = new Familiares();
    this.dataSource.data = [];
  }

  consultar() {
    if (this.familiar.id) {
      this.familiarService.getById(this.familiar.id).subscribe((familiar: any) => {
        if (!familiar || familiar.length === 0) {
          this.mostrarTabela = false;
          this.msg = 'Nenhum registro para a pesquisa selecionada';
        } else {
          this.dataSource.data = [familiar];
          this.mostrarTabela = true;
        }
      });
    } else {
      this.getAll();
    }
  }

  atualizar(familiar: Familiares) {
    this.router.navigate(['/familiaraluno/cadastrar'], { queryParams: { id: familiar.id } });
  }

  deletar(familiar: Familiares) {
    this.chamaCaixaDialogo(familiar);
  }

  chamaCaixaDialogo(familiar: Familiares) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir o familiar ?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.familiarService.excluir(familiar.id).subscribe(() => {
          this.familiar.id = null;
          this.consultar();
        });
      } else {
        dialogRef.close();
      }
    });
  }

  getAll() {
    this.familiarService.getAll().subscribe((familiares: Familiares[]) => {
      this.familiares = familiares;
      this.dataSource.data = familiares ? familiares : [];
      this.verificaMostrarTabela(familiares);
    });
  }

  verificaMostrarTabela(familiares: Familiares[]) {
    if (!familiares || familiares.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhum familiar cadastrado.';
    } else {
      this.mostrarTabela = true;
    }
  }


  isTutela(familiar: Familiares) {
    const hoje = new Date().getTime();

    const responsavel = _.find(familiar.responsaveis, (r) =>
                        r.dataDesvinculacao === undefined
                        ||
                        (hoje >= new Date(r.dataVinculacao).getTime()
                         &&
                         hoje <= new Date(r.dataDesvinculacao).getTime()
                        ) );

    return (responsavel && responsavel.tutelaAluno) ? 'Sim' : 'Não';
  }

  isResponsavelFinanceiro(familiar: Familiares) {
    const hoje = new Date().getTime();

    const responsavel = _.find(familiar.responsaveis, (r) =>
                        r.dataDesvinculacao === undefined
                        ||
                        (hoje >= new Date(r.dataVinculacao).getTime()
                         &&
                         hoje <= new Date(r.dataDesvinculacao).getTime()
                        ) );

    return (responsavel && responsavel.responsavelFinanceiroPeloAluno) ? 'Sim' : 'Não';
  }

  isTransportaAluno(familiar: Familiares) {
    const hoje = new Date().getTime();

    const responsavel = _.find(familiar.responsaveis, (r) =>
                        r.dataDesvinculacao === undefined
                        ||
                        (hoje >= new Date(r.dataVinculacao).getTime()
                         &&
                         hoje <= new Date(r.dataDesvinculacao).getTime()
                        ) );

    return (responsavel && responsavel.transportaAluno) ? 'Sim' : 'Não';
  }

}