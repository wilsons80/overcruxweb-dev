import { Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog} from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Aluno } from 'src/app/core/aluno';
import { Router, ActivatedRoute } from '@angular/router';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { Acesso } from 'src/app/core/acesso';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css']
})
export class AlunoComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
 
  alunos: Aluno[];
  aluno: Aluno = new Aluno();

  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['matricula', 'nome', 'turno', 'serie', 'dataEntrada', 'dataDesligamento', 'acoes'];
  dataSource: MatTableDataSource<Aluno> = new MatTableDataSource();

  perfilAcesso: Acesso;

  constructor(
    private alunoService: AlunoService,
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
    this.aluno = new Aluno()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.aluno.id) {
      this.alunoService.getById(this.aluno.id).subscribe((aluno: Aluno) => {
        if(!aluno){
          this.mostrarTabela = false
          this.msg = 'Nenhum registro para a pesquisa selecionada';
        } else {
          this.dataSource.data = [aluno];
          this.mostrarTabela = true;
        }
      });
    } else {
      this.getAll();
    }
  }

  atualizar(aluno: Aluno) {
    this.router.navigate(['/aluno/cadastrar'], { queryParams: { id: aluno.id } });
  }

  deletar(aluno: Aluno) {
    this.chamaCaixaDialogo(aluno);
  }

  chamaCaixaDialogo(aluno: Aluno) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir o Aluno ?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.alunoService.excluir(aluno.id).subscribe(() => {
          this.aluno.id = null;
          this.consultar();
        });
      } else {
        dialogRef.close();
      }
    });
  }

  getAll() {
    this.alunoService.getAll().subscribe((alunos: Aluno[]) => {
      this.alunos = alunos;
      this.dataSource.data = alunos ? alunos : [];
      this.verificaMostrarTabela(alunos);
    });
  }

  verificaMostrarTabela(alunos: Aluno[]) {
    if (!alunos ||alunos.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhum Aluno cadastrado.';
    } else {
      this.mostrarTabela = true;
    }
  }


}
