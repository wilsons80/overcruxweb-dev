import { Turmas } from './../../core/turmas';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { AlunosTurma } from 'src/app/core/alunos-turma';
import { Aluno } from 'src/app/core/aluno';
import { Atividade } from 'src/app/core/atividade';
import { Acesso } from 'src/app/core/acesso';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { AtividadeService } from 'src/app/services/atividade/atividade.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatriculaService } from 'src/app/services/matricula/matricula.service';
import * as _ from 'lodash';
import { TurmasService } from 'src/app/services/turmas/turmas.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.css']
})
export class MatriculaComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  matriculas: AlunosTurma[];
  matricula: AlunosTurma = new AlunosTurma();

  alunos: Aluno[];
  aluno: Aluno;

  atividades: Atividade[];
  atividade: Atividade;

  turmas: Turmas[];
  turma: Turmas;


  msg: string;
  perfilAcesso: Acesso;

  mostrarTabela = false;

  displayedColumns: string[] = ['turma', 'aluno', 'dataInicio', 'acoes'];
  dataSource: MatTableDataSource<AlunosTurma> = new MatTableDataSource();

  constructor(
    private matriculasService: MatriculaService,
    private turmasService: TurmasService,
    private atividadeService: AtividadeService,
    private alunoService: AlunoService,
    private toastService: ToastService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.limpar();

    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];
    this.dataSource.paginator = this.paginator;

    this.alunoService.getAll().subscribe((alunos: Aluno[]) => {
      this.alunos = alunos;
    });

    this.atividadeService.getAll().subscribe((atividades: Atividade[]) => {
      this.atividades = atividades.filter(atividade => atividade.idTurma);
    });

    this.turmasService.getAll().subscribe((turmas: Turmas[]) => {
      this.turmas = turmas;
    });

    this.consultar();
  }


  limpar() {
    this.mostrarTabela = false;

    this.turma = new Turmas();
    this.aluno = new Aluno();
    this.atividade = new Atividade();
    this.dataSource.data = [];
  }

  consultar() {
    if (this.turma.id || this.atividade.id || this.aluno.id) {
      this.matriculasService.getFilter(this.turma.id, this.aluno.id, this.atividade.id)
      .subscribe((matriculas: AlunosTurma[]) => {
        this.carregar(matriculas);
      });
    } else {
      this.matriculasService.getAll()
      .subscribe((matriculas: AlunosTurma[]) => {
        this.carregar(matriculas);
      });
    }
  }

  private carregar(matriculas: AlunosTurma[]) {
    if (_.isEmpty(matriculas)) {
      this.mostrarTabela = false;
      this.msg = 'Nenhum registro para a pesquisa selecionada';
    } else {
      this.dataSource.data = matriculas;
      this.mostrarTabela = true;
    }
  }

  atualizar(matricula: AlunosTurma) {
    this.router.navigate(['/matriculas/cadastrar'], { queryParams: { id: matricula.id } });
  }

  deletar(matricula: AlunosTurma) {
    this.chamaCaixaDialogo(matricula);
  }

  chamaCaixaDialogo(matricula: AlunosTurma) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir a matricula ?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.matriculasService.excluir(matricula.id).subscribe(() => {
          this.matricula.id = null;
          this.consultar();
          this.toastService.showSucesso('Matrícula excluída com sucesso.')
        });
      } else {
        dialogRef.close();
      }
    }
    );
  }


  verificaMostrarTabela(matriculas: AlunosTurma[]) {
    if (!matriculas || matriculas.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhuma matricula cadastrada.';
    } else {
      this.mostrarTabela = true;
    }
  }


}
