import { FuncoesService } from './../../services/funcoes/funcoes.service';
import { Funcoes } from './../../core/funcoes';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Acesso } from 'src/app/core/acesso';
import { DepartamentoService } from 'src/app/services/departamento/departamento.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'funcoes',
  templateUrl: './funcoes.component.html',
  styleUrls: ['./funcoes.component.css']
})
export class FuncoesComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  listaFuncoes: Funcoes[];
  mostrarTabela: boolean = false;
  funcoes: Funcoes = new Funcoes();
  msg: string;

  displayedColumns: string[] = ['id', 'nome','valor', 'acoes'];
  dataSource: MatTableDataSource<Funcoes> = new MatTableDataSource();
  
   perfilAcesso: Acesso;
   
  constructor(
    private funcoesService: FuncoesService,
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
    this.funcoes = new Funcoes()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.funcoes.id) {
      this.funcoesService.getById(this.funcoes.id).subscribe((funcoes: Funcoes) => {
        if (!funcoes) {
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        } else {
          this.dataSource.data = [funcoes];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }

  }


  atualizar(funcoes: Funcoes) {
    this.router.navigate(['/funcoes/cadastrar'], { queryParams: { id: funcoes.id } });
  }

  deletar(funcoes: Funcoes) {
    this.chamaCaixaDialogo(funcoes);
  }

  chamaCaixaDialogo(funcoes: Funcoes) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir ?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.funcoesService.excluir(funcoes.id).subscribe(() => {
          this.funcoes.id = null;
          this.consultar();
        })

      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.funcoesService.getAll().subscribe((listaFuncoes: Funcoes[]) => {
      this.listaFuncoes = listaFuncoes;
      this.dataSource.data = listaFuncoes ? listaFuncoes : [];
      this.verificaMostrarTabela(listaFuncoes);
    })
  }

  verificaMostrarTabela(listaFuncoes: Funcoes[]) {
    if (!listaFuncoes || listaFuncoes.length == 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhuma função cadastrada."
    } else {
      this.mostrarTabela = true;
    }
  }




}
