import { Turmas } from './../../core/turmas';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Acesso } from 'src/app/core/acesso';
import { Router, ActivatedRoute } from '@angular/router';
import { TurmasService } from 'src/app/services/turmas/turmas.service';
import { Programa } from 'src/app/core/programa';
import { Projeto } from 'src/app/core/projeto';
import { Unidade } from 'src/app/core/unidade';
import { NiveisTurmas } from 'src/app/core/niveis-turmas';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'turmas',
  templateUrl: './turmas.component.html',
  styleUrls: ['./turmas.component.css']
})
export class TurmasComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  turmas: Turmas[];
  turma: Turmas = new Turmas();
  msg: string;
  perfilAcesso: Acesso;

  mostrarTabela = false;

  displayedColumns: string[] = ['descricao', 'dataPrevisaoInicio', 'dataPrevisaoTermino', 'cargaHoraria', 'programa', 'projeto', 'acoes'];
  dataSource: MatTableDataSource<Turmas> = new MatTableDataSource();

  constructor(
    private turmasService: TurmasService,
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
    this.turma = new Turmas();
    this.turma.programa = new Programa();
    this.turma.projeto = new Projeto();
    this.turma.unidade = new Unidade();
    this.turma.niveisTurma = new NiveisTurmas();
    this.dataSource.data = [];
  }

  consultar() {
    if (this.turma.id) {
      this.turmasService.getById(this.turma.id).subscribe((turma: Turmas) => {
        if (!turma){
          this.mostrarTabela = false;
          this.msg = 'Nenhum registro para a pesquisa selecionada';
        } else {
          this.dataSource.data = [turma];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }
  }


  atualizar(turma: Turmas) {
    this.router.navigate(['/turmas/cadastrar'], { queryParams: { id: turma.id } });
  }

  deletar(turma: Turmas) {
    this.chamaCaixaDialogo(turma);
  }

  chamaCaixaDialogo(turma: Turmas) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir a turma ?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.turmasService.excluir(turma.id).subscribe(() => {
          this.turma.id = null;
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

   getAll() {
    this.turmasService.getAll().subscribe((turmas: Turmas[]) => {
      this.turmas = turmas;
      this.dataSource.data = turmas ? turmas : [];
      this.verificaMostrarTabela(turmas);
    })
  }

  verificaMostrarTabela(turmas: Turmas[]) {
    if (!turmas || turmas.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhuma turma cadastrada.';
    } else {
      this.mostrarTabela = true;
    }
  }


}
