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
import { CarregarPerfil } from 'src/app/core/carregar-perfil';
import { ComboFamiliar } from 'src/app/core/combo-familiar';
import { ToastService } from 'src/app/services/toast/toast.service';
import { LoadingPopupService } from 'src/app/services/loadingPopup/loading-popup.service';


@Component({
  selector: 'app-familiar-aluno',
  templateUrl: './familiar-aluno.component.html',
  styleUrls: ['./familiar-aluno.component.css']
})
export class FamiliarAlunoComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  comboFamiliares: ComboFamiliar[];
  familiar: ComboFamiliar = new ComboFamiliar();

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();

  situacaoParentesco: SituacaoParentesco = new SituacaoParentesco();

  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['familiar', 'aluno', 'situacao', 'tutela', 'transportaaluno', 'respfinanceiro', 'dataCadastro', 'acoes'];
  dataSource: MatTableDataSource<Familiares> = new MatTableDataSource();

  constructor(
    private familiarService: FamiliarAlunoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loadingPopupService: LoadingPopupService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    this.dataSource.paginator = this.paginator;
    this.getAll();
  }


  limpar() {
    this.mostrarTabela = false;
    this.familiar = new ComboFamiliar();
    this.dataSource.data = [];
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
    this.familiarService.getAllCombo().subscribe((comboFamiliares: ComboFamiliar[]) => {
      this.comboFamiliares = comboFamiliares;
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


  consultar() {
    if(this.familiar?.id) {
      this.loadingPopupService.mostrarMensagemDialog('Buscando, aguarde...');
      this.familiarService.getById(this.familiar.id).subscribe( 
        (familiar: Familiares) => {
          this.loadingPopupService.closeDialog();
          this.dataSource.data = familiar ? [familiar] : [];
          this.verificaMostrarTabela([familiar]);
        },
        (error) => {
          this.loadingPopupService.closeDialog();
        }); 
    } else {
      this.verificaMostrarTabela(null);
    }
  }


}