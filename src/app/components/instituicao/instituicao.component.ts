import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Instituicao } from 'src/app/core/instituicao';
import { Acesso } from 'src/app/core/acesso';
import { Router, ActivatedRoute } from '@angular/router';
import { InstituicaoService } from 'src/app/services/instituicao/instituicao.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'instituicao',
  templateUrl: './instituicao.component.html',
  styleUrls: ['./instituicao.component.css']
})
export class InstituicaoComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  instituicoes: Instituicao[];
  instituicao: Instituicao = new Instituicao();
  msg: string;
  perfilAcesso: Acesso;

  mostrarTabela = false;

  displayedColumns: string[] = ['nome', 'acoes'];
  dataSource: MatTableDataSource<Instituicao> = new MatTableDataSource();

  constructor(
    private instituicaoService: InstituicaoService,
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
    this.instituicao = new Instituicao();
    this.dataSource.data = [];
  }

  consultar() {
    if (this.instituicao.id) {
      this.instituicaoService.getById(this.instituicao.id).subscribe((instituicao: Instituicao) => {
        if(!instituicao){
          this.mostrarTabela = false
          this.msg = 'Nenhum registro para a pesquisa selecionada';
        } else {
          this.dataSource.data = [instituicao];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }
  }


  atualizar(instituicao: Instituicao) {
    this.router.navigate(['/instituicao/cadastrar'], { queryParams: { id: instituicao.id } });
  }

  deletar(instituicao: Instituicao) {
    this.chamaCaixaDialogo(instituicao);
  }

  chamaCaixaDialogo(instituicao: Instituicao) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir a instituição ?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.instituicaoService.excluir(instituicao.id).subscribe(() => {
          this.instituicao.id = null;
          this.consultar();
        });
      } else {
        dialogRef.close();
      }
    }
    );
  }

   getAll() {
    this.instituicaoService.getAll().subscribe((instituicoes: Instituicao[]) => {
      this.instituicoes = instituicoes;
      this.dataSource.data = instituicoes ? instituicoes : [];
      this.verificaMostrarTabela(instituicoes);
    })
  }

  verificaMostrarTabela(instituicoes: Instituicao[]) {
    if (!instituicoes || instituicoes.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhuma instituição cadastrada.';
    } else {
      this.mostrarTabela = true;
    }
  }

}
