import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { TipoOcorrenciaAluno } from 'src/app/core/tipo-ocorrencia-aluno';
import { Acesso } from 'src/app/core/acesso';
import { TipoOcorrenciaAlunoService } from 'src/app/services/tipo-ocorrencia-aluno/tipo-ocorrencia-aluno.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'tipo-ocorrencia-aluno',
  templateUrl: './tipo-ocorrencia-aluno.component.html',
  styleUrls: ['./tipo-ocorrencia-aluno.component.css']
})
export class TipoOcorrenciaAlunoComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  tiposOcorrenciasAluno: TipoOcorrenciaAluno[];
  tipoOcorrenciaAluno: TipoOcorrenciaAluno = new TipoOcorrenciaAluno();

  mostrarTabela = false;
  msg: string;


  displayedColumns: string[] = ['tipo', 'informaSap', 'acoes'];
  dataSource: MatTableDataSource<TipoOcorrenciaAluno> = new MatTableDataSource();

  perfilAcesso: Acesso;


  constructor(
    private tipoOcorrenciaAlunoService: TipoOcorrenciaAlunoService,
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
    this.dataSource.data = [];
    this.msg = '';
    this.tipoOcorrenciaAluno = new TipoOcorrenciaAluno();
  }

  consultar() {
    if (this.tipoOcorrenciaAluno.id) {
      this.tipoOcorrenciaAlunoService.getById(this.tipoOcorrenciaAluno.id).subscribe((tipoOcorrenciaAluno: TipoOcorrenciaAluno) => {
        if (!tipoOcorrenciaAluno) {
          this.mostrarTabela = false;
          this.msg = 'Nenhum registro para a pesquisa selecionada';
        } else {
          this.dataSource.data = [tipoOcorrenciaAluno];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }
  }

  getAll() {

    this.tipoOcorrenciaAlunoService.getAll().subscribe((tiposOcorrenciasAluno: TipoOcorrenciaAluno[]) => {
      this.tiposOcorrenciasAluno = tiposOcorrenciasAluno;
      this.dataSource.data = tiposOcorrenciasAluno ? tiposOcorrenciasAluno : [];
      this.verificaMostrarTabela(tiposOcorrenciasAluno);
    });
  }

  verificaMostrarTabela(tiposOcorrenciasAluno: TipoOcorrenciaAluno[]) {
    if (!tiposOcorrenciasAluno || tiposOcorrenciasAluno.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhum tipo de ocorrência cadastrado.';
    } else {
      this.mostrarTabela = true;
    }
  }


  atualizar(tipoOcorrenciaAluno: TipoOcorrenciaAluno) {
    this.router.navigate(['/tipoocorrenciaaluno/cadastrar'], { queryParams: { id: tipoOcorrenciaAluno.id } });
  }

  deletar(tipoOcorrenciaAluno: TipoOcorrenciaAluno) {
    this.chamaCaixaDialogo(tipoOcorrenciaAluno);
  }

  chamaCaixaDialogo(tipoOcorrenciaAluno: TipoOcorrenciaAluno) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir o tipo de ocorrência ?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.tipoOcorrenciaAlunoService.excluir(tipoOcorrenciaAluno.id).subscribe(() => {
          this.tipoOcorrenciaAluno.id = null;
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }


}
