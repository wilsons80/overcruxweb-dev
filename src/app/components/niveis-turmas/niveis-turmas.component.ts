import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { NiveisTurmas } from 'src/app/core/niveis-turmas';
import { Acesso } from 'src/app/core/acesso';
import { Router, ActivatedRoute } from '@angular/router';
import { NiveisTurmasService } from 'src/app/services/niveis-turmas/niveis-turmas.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'niveis-turmas',
  templateUrl: './niveis-turmas.component.html',
  styleUrls: ['./niveis-turmas.component.css']
})
export class NiveisTurmasComponent implements OnInit {


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  niveisTurmas: NiveisTurmas[];
  nivelTurma: NiveisTurmas = new NiveisTurmas();

  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['codigo', 'descricao', 'acoes'];
  perfilAcesso: Acesso;


  dataSource: MatTableDataSource<NiveisTurmas> = new MatTableDataSource();

  constructor(
    private niveisTurmasService: NiveisTurmasService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute

  ) { }

  ngOnInit() {
    this.perfilAcesso =  this.activatedRoute.snapshot.data.perfilAcesso[0];
    this.dataSource.paginator = this.paginator;
    this.getAll();
  }


  limpar() {
    this.mostrarTabela = false;
    this.nivelTurma = new NiveisTurmas();
    this.dataSource.data = [];
  }

  consultar() {
    if (this.nivelTurma.id) {
      this.niveisTurmasService.getById(this.nivelTurma.id)
      .subscribe((nivelTurma: NiveisTurmas) => {
        if (!nivelTurma) {
          this.mostrarTabela = false;
          this.msg = 'Nenhum registro para a pesquisa selecionada';
        } else {
          this.dataSource.data = [nivelTurma];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }
  }


  atualizar(nivelTurma: NiveisTurmas) {
    this.router.navigate(['/niveisturmas/cadastrar'], { queryParams: { id: nivelTurma.id } });
  }

  deletar(nivelTurma: NiveisTurmas) {
    this.chamaCaixaDialogo(nivelTurma);
  }

  chamaCaixaDialogo(nivelTurma: NiveisTurmas) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir o nível da turma: ${nivelTurma.descricao} ?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.niveisTurmasService.excluir(nivelTurma.id).subscribe(() => {
          this.nivelTurma.id = null;
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.niveisTurmasService.getAll().subscribe((niveisTurmas: NiveisTurmas[]) => {
      this.niveisTurmas = niveisTurmas;
      this.dataSource.data = niveisTurmas ? niveisTurmas : [];
      this.verificaMostrarTabela(niveisTurmas);
    })
  }

  verificaMostrarTabela(niveisTurmas: NiveisTurmas[]) {
    if (!niveisTurmas || niveisTurmas.length == 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhum nível de turma cadastrado.';
    } else {
      this.mostrarTabela = true;
    }
  }
}
