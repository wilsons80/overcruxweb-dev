import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Acesso } from 'src/app/core/acesso';
import { Questionario } from 'src/app/core/questionario';
import { QuestionarioService } from 'src/app/services/questionario/questionario.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { TipoQuestionario } from 'src/app/core/tipo-questionario';

@Component({
  selector: 'app-questionario',
  templateUrl: './questionario.component.html',
  styleUrls: ['./questionario.component.css']
})
export class QuestionarioComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  listaQuestionario: Questionario[];
  mostrarTabela: boolean = false;
  questionario: Questionario = new Questionario();
  msg: string;

  displayedColumns: string[] = ['descricao', 'tipoQuestionario', 'dataInicio', 'dataFim', 'acoes'];
  dataSource: MatTableDataSource<Questionario> = new MatTableDataSource();

  perfilAcesso: Acesso;
  tiposQuestionario: TipoQuestionario = new TipoQuestionario();

  constructor(
    private questionarioService: QuestionarioService,
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
    this.questionario = new Questionario()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.questionario.id) {
      this.questionarioService.getById(this.questionario.id).subscribe((questionario: Questionario) => {
        if (!questionario) {
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        } else {
          this.dataSource.data = [questionario];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }

  }


  atualizar(questionario: Questionario) {
    this.router.navigate(['/questionario/cadastrar'], { queryParams: { idQuestionario: questionario.id } });
  }

  deletar(questionario: Questionario) {
    this.chamaCaixaDialogo(questionario);
  }

  chamaCaixaDialogo(questionario: Questionario) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir o questionario?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.questionarioService.excluir(questionario.id).subscribe(() => {
          this.questionario.id = null
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.questionarioService.getAll().subscribe((listaQuestionario: Questionario[]) => {
      this.listaQuestionario = listaQuestionario;
      this.dataSource.data = listaQuestionario ? listaQuestionario : [];
      this.verificaMostrarTabela(listaQuestionario);
    })
  }
  verificaMostrarTabela(questionarios: Questionario[]) {
    if (!questionarios || questionarios.length == 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhum Questionário cadastrado."
    } else {
      this.mostrarTabela = true;
    }
  }

}
