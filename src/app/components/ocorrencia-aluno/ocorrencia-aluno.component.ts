import { Aluno } from 'src/app/core/aluno';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { TipoOcorrenciaAluno } from 'src/app/core/tipo-ocorrencia-aluno';
import { OcorrenciaAluno } from 'src/app/core/ocorrencia-aluno';
import { Acesso } from 'src/app/core/acesso';
import { TipoOcorrenciaAlunoService } from 'src/app/services/tipo-ocorrencia-aluno/tipo-ocorrencia-aluno.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { OcorrenciaAlunoService } from 'src/app/services/ocorrencia-aluno/ocorrencia-aluno.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'ocorrencia-aluno',
  templateUrl: './ocorrencia-aluno.component.html',
  styleUrls: ['./ocorrencia-aluno.component.css']
})
export class OcorrenciaAlunoComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  tiposOcorrenciasAluno: TipoOcorrenciaAluno[];
  tipoOcorrenciaAluno: TipoOcorrenciaAluno = new TipoOcorrenciaAluno();

  alunos: Aluno[];
  aluno: Aluno = new Aluno();

  mostrarTabela = false;
  msg: string;


  displayedColumns: string[] = ['nomeAluno', 'tipoOcorrencia', 'dataOcorrencia', 'dataCiencia', 'acoes'];
  dataSource: MatTableDataSource<OcorrenciaAluno> = new MatTableDataSource();

  perfilAcesso: Acesso;


  constructor(
    private ocorrenciaAlunoService: OcorrenciaAlunoService,
    private tipoOcorrenciaAlunoService: TipoOcorrenciaAlunoService,
    private alunoService: AlunoService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute

  ) { }

  ngOnInit() {
    this.perfilAcesso =  this.activatedRoute.snapshot.data.perfilAcesso[0];
    this.dataSource.paginator = this.paginator;


    this.alunoService.getAll().subscribe((alunos: Aluno[]) => {
      this.alunos = alunos;
    });

    this.tipoOcorrenciaAlunoService.getAll().subscribe( (tipos: TipoOcorrenciaAluno[]) => {
      this.tiposOcorrenciasAluno = tipos;
    });


    this.consultar();
  }


  limpar() {
    this.mostrarTabela = false;
    this.dataSource.data = [];
    this.msg = '';

    this.tipoOcorrenciaAluno = new TipoOcorrenciaAluno();
    this.aluno = new Aluno();
  }

  consultar() {
    if (this.tipoOcorrenciaAluno.id || this.aluno.id) {
      this.ocorrenciaAlunoService.getFilter(this.tipoOcorrenciaAluno.id, this.aluno.id)
      .subscribe((ocorrenciasAluno: OcorrenciaAluno[]) => {

        if (!ocorrenciasAluno) {
          this.mostrarTabela = false;
          this.msg = 'Nenhum registro para a pesquisa selecionada';
        } else {
          this.dataSource.data = ocorrenciasAluno ? ocorrenciasAluno : [];
          this.mostrarTabela = true;
          this.verificaMostrarTabela(ocorrenciasAluno);
        }
      });
    } else {
      this.ocorrenciaAlunoService.getAll().subscribe((ocorrenciasAluno: OcorrenciaAluno[]) => {
        this.dataSource.data = ocorrenciasAluno ? ocorrenciasAluno : [];
        this.mostrarTabela = true;
        this.verificaMostrarTabela(ocorrenciasAluno);
      });
    }
  }


  verificaMostrarTabela(ocorrenciasAluno: OcorrenciaAluno[]) {
    if (!ocorrenciasAluno || ocorrenciasAluno.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhuma ocorrência cadastrada.';
    } else {
      this.mostrarTabela = true;
    }
  }


  atualizar(ocorrenciaAluno: OcorrenciaAluno) {
    this.router.navigate(['/ocorrenciaaluno/cadastrar'], { queryParams: { id: ocorrenciaAluno.id } });
  }

  deletar(ocorrenciaAluno: OcorrenciaAluno) {
    this.chamaCaixaDialogo(ocorrenciaAluno);
  }

  chamaCaixaDialogo(ocorrenciaAluno: OcorrenciaAluno) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir o tipo de ocorrência ?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.ocorrenciaAlunoService.excluir(ocorrenciaAluno.id).subscribe(() => {
          this.consultar();
        });
      } else {
        dialogRef.close();
      }
    }
    );
  }


}
