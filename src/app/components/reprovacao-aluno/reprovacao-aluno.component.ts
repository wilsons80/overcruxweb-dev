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
  }
  
}

