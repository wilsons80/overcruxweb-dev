import { Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog} from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { AtividadeAluno } from 'src/app/core/atividade-aluno';
import { Acesso } from 'src/app/core/acesso';
import { AtividadeAlunoService } from 'src/app/services/atividade-aluno/atividade-aluno.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { Aluno } from 'src/app/core/aluno';
import { Atividade } from 'src/app/core/atividade';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { AtividadeService } from 'src/app/services/atividade/atividade.service';
import * as _ from 'lodash';



@Component({
  selector: 'app-atividade-aluno',
  templateUrl: './atividade-aluno.component.html',
  styleUrls: ['./atividade-aluno.component.css']
})
export class AtividadeAlunoComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  atividadesAlunos: AtividadeAluno[];
  atividadeAluno: AtividadeAluno = new AtividadeAluno();

  alunos: Aluno[];
  aluno: Aluno;

  atividades: Atividade[];
  atividade: Atividade;

  msg: string;
  perfilAcesso: Acesso;

  mostrarTabela = false;

  displayedColumns: string[] = ['aluno', 'atividade', 'dataCadastroAtividade','dataInicioAtividade', 'acoes'];
  dataSource: MatTableDataSource<AtividadeAluno> = new MatTableDataSource();

  constructor(
    private atividadeAlunoService: AtividadeAlunoService,
    private atividadeService: AtividadeService,
    private alunoService: AlunoService,

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
      this.atividades = atividades;
    });

    this.consultar();
  }


  limpar() {
    this.mostrarTabela = false;
    this.aluno = new Aluno()  ;
    this.atividade = new Atividade();
    this.dataSource.data = [];
  }

  consultar() {
    if (this.atividade.id || this.aluno.id) {
      this.atividadeAlunoService.getFilter(this.atividade.id, this.aluno.id)
      .subscribe((atividadeAluno: AtividadeAluno[]) => {
        if (_.isEmpty(atividadeAluno)) {
          this.mostrarTabela = false;
          this.msg = 'Nenhum registro para a pesquisa selecionada';
        } else {
          this.dataSource.data = atividadeAluno;
          this.mostrarTabela = true;
        }
      });
    } else {
      this.atividadeAlunoService.getAll()
      .subscribe((atividadeAluno: AtividadeAluno[]) => {
        if (_.isEmpty(atividadeAluno)) {
          this.mostrarTabela = false;
          this.msg = 'Nenhum registro para a pesquisa selecionada';
        } else {
          this.dataSource.data = atividadeAluno;
          this.mostrarTabela = true;
        }
      });
    }
  }

  atualizar(atividadeAluno: AtividadeAluno) {
    this.router.navigate(['/atividadealuno/cadastrar'], { queryParams: { idAtividadeAluno: atividadeAluno.id } });
  }

  deletar(atividadeAluno: AtividadeAluno) {
    this.chamaCaixaDialogo(atividadeAluno);
  }

  chamaCaixaDialogo(atividadeAluno: AtividadeAluno) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir a atividadeAluno?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.atividadeAlunoService.excluir(atividadeAluno.id).subscribe(() => {
          this.atividadeAluno.id = null;
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }


  verificaMostrarTabela(atividadesAlunos: AtividadeAluno[]) {
    if (!atividadesAlunos || atividadesAlunos.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhuma Atividade Aluno cadastrada.';
    } else {
      this.mostrarTabela = true;
    }
  }

}
