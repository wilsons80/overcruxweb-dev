import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Aluno } from 'src/app/core/aluno';
import { Acesso } from 'src/app/core/acesso';
import { ReprovacaoAluno } from 'src/app/core/reprovacao-aluno';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ReprovacaoAlunoService } from 'src/app/services/reprovacao-aluno/reprovacao-aluno.service';
import { PessoaFisica } from 'src/app/core/pessoa-fisica';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'reprovacao-aluno',
  templateUrl: './reprovacao-aluno.component.html',
  styleUrls: ['./reprovacao-aluno.component.css']
})
export class ReprovacaoAlunoComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  alunos: Aluno[];
  aluno: Aluno = new Aluno();

  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['aluno', 'datareprovacao', 'serie', 'qtd', 'acoes'];
  perfilAcesso: Acesso;

  dataSource: MatTableDataSource<ReprovacaoAluno> = new MatTableDataSource();

  constructor(
    private reprovacaoAlunoService: ReprovacaoAlunoService,
    private alunoService: AlunoService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.perfilAcesso =  this.activatedRoute.snapshot.data.perfilAcesso[0];
    this.dataSource.paginator = this.paginator;
    this.getAll();

    this.alunoService.getAll().subscribe((alunos: Aluno[]) => {
      this.alunos = alunos;
    });
  }

  limpar() {
    this.aluno = new Aluno();
    this.aluno.pessoaFisica = new PessoaFisica();

    this.mostrarTabela = false;
    this.dataSource.data = [];
  }

  consultar() {
    this.reprovacaoAlunoService.getAll().subscribe((reprovacoesAluno: ReprovacaoAluno[]) => {
      if (!reprovacoesAluno) {
        this.mostrarTabela = false;
        this.msg = 'Nenhum registro para a pesquisa selecionada';
      } else {
        this.dataSource.data = reprovacoesAluno ? reprovacoesAluno : [];
        this.mostrarTabela = true;
      }
    });
  }


  atualizar(reprovacaoAluno: ReprovacaoAluno) {
    this.router.navigate(['/reprovacaoaluno/cadastrar'], { queryParams: { id: reprovacaoAluno.id } });
  }

  deletar(reprovacaoAluno: ReprovacaoAluno) {
    this.chamaCaixaDialogo(reprovacaoAluno);
  }

  chamaCaixaDialogo(reprovacaoAluno: ReprovacaoAluno) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir a reprovação do aluno ?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.reprovacaoAlunoService.excluir(reprovacaoAluno.id).subscribe(() => {
          this.consultar();
        });
      } else {
        dialogRef.close();
      }
    });
  }

  getAll() {
    this.reprovacaoAlunoService.getAll().subscribe((reprovacoesAluno: ReprovacaoAluno[]) => {
      this.dataSource.data = reprovacoesAluno ? reprovacoesAluno : [];
      this.verificaMostrarTabela(reprovacoesAluno);
    });
  }

  verificaMostrarTabela(reprovacoesAluno: ReprovacaoAluno[]) {
    if (!reprovacoesAluno || reprovacoesAluno.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhuma reprovação de aluno cadastrada.';
    } else {
      this.mostrarTabela = true;
    }
  }
}

