import { SituacoesExAlunosService } from 'src/app/services/situacoes-ex-alunos/situacoes-ex-alunos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Acesso } from 'src/app/core/acesso';
import { SituacaoExAluno } from 'src/app/core/situacoes-ex-alunos';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'situacao-ex-aluno',
  templateUrl: './situacao-ex-aluno.component.html',
  styleUrls: ['./situacao-ex-aluno.component.css']
})
export class SituacaoExAlunoComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  listaSituacoesExAlunos: SituacaoExAluno[];
  situacaoExAluno: SituacaoExAluno = new SituacaoExAluno();
  msg:string;

  mostrarTabela = false;

  displayedColumns: string[] = ['nome', 'dataAvaliacao', 'condicaoAtual', 'acoes'];
  dataSource: MatTableDataSource<SituacaoExAluno> = new MatTableDataSource();

  perfilAcesso: Acesso;

  constructor(
    private situacaoExAlunoService: SituacoesExAlunosService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute:ActivatedRoute

  ) { }

  ngOnInit() {
    this.perfilAcesso =  this.activatedRoute.snapshot.data.perfilAcesso[0];
    this.dataSource.paginator = this.paginator;
    this.getAll();
  }
  limpar() {
    this.mostrarTabela = false;
    this.situacaoExAluno = new SituacaoExAluno()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.situacaoExAluno && this.situacaoExAluno.id) {
      this.situacaoExAlunoService.getById(this.situacaoExAluno.id).subscribe((situacaoExAluno: SituacaoExAluno) => {
        if(!situacaoExAluno){
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        }else {
          this.dataSource.data = [situacaoExAluno];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }
  }


  atualizar(situacaoExAluno: SituacaoExAluno) {
    this.router.navigate(['/situacoesexalunos/cadastrar'], { queryParams: { id: situacaoExAluno.id } });
  }

  deletar(situacaoExAluno: SituacaoExAluno) {
    this.chamaCaixaDialogo(situacaoExAluno);
  }

  chamaCaixaDialogo(situacaoExAluno: SituacaoExAluno) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.situacaoExAlunoService.excluir(situacaoExAluno.id).subscribe(() => {
          this.situacaoExAluno.id = null;
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.situacaoExAlunoService.getAll().subscribe((listaSituacoesExAlunos: SituacaoExAluno[]) => {
      this.listaSituacoesExAlunos = listaSituacoesExAlunos;
      this.dataSource.data = listaSituacoesExAlunos ? listaSituacoesExAlunos : [];
      this.verificaMostrarTabela(listaSituacoesExAlunos);
    })
  }
  verificaMostrarTabela(listaSituacoesExAlunos: SituacaoExAluno[]) {
    if(!listaSituacoesExAlunos ||listaSituacoesExAlunos.length == 0) {
      this.mostrarTabela = false; 
      this.msg = "Nenhum cadastro."
    }else{
      this.mostrarTabela = true; 
    }
  }
}
