import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { CursoFormacao } from 'src/app/core/curso-formacao';
import { CursoFormacaoService } from 'src/app/services/curso-formacao/curso-formacao.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { Acesso } from 'src/app/core/acesso';

@Component({
  selector: 'app-curso-formacao',
  templateUrl: './curso-formacao.component.html',
  styleUrls: ['./curso-formacao.component.css']
})
export class CursoFormacaoComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  cursosFormacao: CursoFormacao[];
  mostrarTabela: boolean = false;
  cursoFormacao: CursoFormacao = new CursoFormacao();
  msg: string;


  displayedColumns: string[] = ['nome', 'dataInicio', 'dataFim', 'acoes'];


 perfilAcesso: Acesso;

 
 dataSource: MatTableDataSource<CursoFormacao> = new MatTableDataSource();
 
 constructor(
   private cursoFormacaoService: CursoFormacaoService,
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
    this.cursoFormacao = new CursoFormacao()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.cursoFormacao.id) {
      this.cursoFormacaoService.getById(this.cursoFormacao.id).subscribe((cursoFormacao: CursoFormacao) => {
        if (!cursoFormacao) {
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        } else {
          this.dataSource.data = [cursoFormacao];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }
  }


  atualizar(cursoFormacao: CursoFormacao) {
    this.router.navigate(['/cursoformacao/cadastrar'], { queryParams: { idCursoFormacao: cursoFormacao.id } });
  }

  deletar(cursoFormacao: CursoFormacao) {
    this.chamaCaixaDialogo(cursoFormacao);
  }

  chamaCaixaDialogo(cursoFormacao: CursoFormacao) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir a curso de formação?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.cursoFormacaoService.excluir(cursoFormacao.id).subscribe(() => {
          this.cursoFormacao.id = null;
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.cursoFormacaoService.getAll().subscribe((cursoFormacaos: CursoFormacao[]) => {
      this.cursosFormacao = cursoFormacaos;
      this.dataSource.data = cursoFormacaos ? cursoFormacaos : [];
      this.verificaMostrarTabela(cursoFormacaos);
    })
  }

  verificaMostrarTabela(cursoFormacaos: CursoFormacao[]) {
    if (!cursoFormacaos || cursoFormacaos.length == 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhuma curso de formação cadastrado."
    } else {
      this.mostrarTabela = true;
    }
  }


}
