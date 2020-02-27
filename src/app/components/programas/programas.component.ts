import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { ActivatedRoute, Router } from '@angular/router';
import { Acesso } from 'src/app/core/acesso';
import { ProgramaService } from 'src/app/services/programa/programa.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { Programa } from './../../core/programa';

@Component({
  selector: 'app-programas',
  templateUrl: './programas.component.html',
  styleUrls: ['./programas.component.css']
})
export class ProgramasComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  listaProgramas: Programa[];
  programa: Programa = new Programa();
  msg: string;

  mostrarTabela = false;

  displayedColumns: string[] = ['nome', 'objetivo', 'dataInicio', 'dataFim', 'acoes'];
  dataSource: MatTableDataSource<Programa> = new MatTableDataSource();

  perfilAcesso: Acesso;


  constructor(
    private programaService: ProgramaService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute

  ) { }

  ngOnInit() {
    this.perfilAcesso =  this.activatedRoute.snapshot.data.perfilAcesso[0];

    console.log("acesso", this.perfilAcesso);
    

    this.dataSource.paginator = this.paginator;
    this.getAll();
  }

  limpar() {
    this.mostrarTabela = false;
    this.programa = new Programa()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.programa.id) {
      this.programaService.getById(this.programa.id).subscribe((programa: Programa) => {
        if (!programa) {
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        } else {
          this.dataSource.data = [programa];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }
  }


  atualizar(programa: Programa) {
    this.router.navigate(['/programas/cadastrar'], { queryParams: { idPrograma: programa.id } });
  }

  deletar(programa: Programa) {
    this.chamaCaixaDialogo(programa);
  }

  chamaCaixaDialogo(programa: Programa) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir o programa ${programa.nome}?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.programaService.excluir(programa.id).subscribe(() => {
          this.programa.id = null;
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.programaService.getAll().subscribe((listaProgramas: Programa[]) => {
      this.listaProgramas = listaProgramas;
      this.dataSource.data = listaProgramas ? listaProgramas : [];
      this.verificaMostrarTabela(listaProgramas);
    })
  }

  verificaMostrarTabela(listaProgramas: Programa[]) {
    if (!listaProgramas || listaProgramas.length == 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhum programa cadastrado."
    } else {
      this.mostrarTabela = true;
    }
  }
}
