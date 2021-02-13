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
import { FilterAlunos } from 'src/app/core/filter-alunos';
import { ComboAluno } from 'src/app/core/combo-aluno';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';

@Component({
  selector: 'matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.css']
})
export class MatriculaComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  filtro: FilterAlunos = new FilterAlunos();

  matriculas: AlunosTurma[];
  matricula: AlunosTurma = new AlunosTurma();

  atividades: Atividade[];
  atividade: Atividade;

  turmas: Turmas[];
  turma: Turmas;


  msg: string;
  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();


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

    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    this.dataSource.paginator = this.paginator;

    this.atividadeService.getAll().subscribe((atividades: Atividade[]) => {
      this.atividades = atividades.filter(atividade => atividade.idTurma);
    });

    this.turmasService.getAll().subscribe((turmas: Turmas[]) => {
      this.turmas = turmas;
    });

  }


  limpar() {
    this.mostrarTabela = false;

    this.filtro = new FilterAlunos();
    this.filtro.aluno = new ComboAluno();

    this.turma = new Turmas();
    this.atividade = new Atividade();
    this.dataSource.data = [];
  }

  consultar() {
    if ( this.turma?.id || this.atividade?.id || this.filtro.aluno.id) {
      this.matriculasService.getFilter(this.turma?.id, this.filtro.aluno.id, this.atividade?.id)
      .subscribe((matriculas: AlunosTurma[]) => {
        this.carregar(matriculas);
      });
    } else {
      this.toastService.showAlerta('Selecione pelo menos um critério de pesquisa.');
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


  onValorChange(registro: any) {
    if(registro) {
      this.filtro.aluno = registro;
    } else {
      this.filtro.aluno = new ComboAluno();
    }
  }


}
