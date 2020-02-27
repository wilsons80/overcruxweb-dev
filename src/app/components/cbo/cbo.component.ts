import { Cbo } from './../../core/cbo';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';

import { MatDialog} from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Acesso } from 'src/app/core/acesso';
import { Router, ActivatedRoute } from '@angular/router';
import { CboService } from 'src/app/services/cbo/cbo.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'cbo',
  templateUrl: './cbo.component.html',
  styleUrls: ['./cbo.component.css']
})
export class CboComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  cbos: Cbo[];
  cbo: Cbo = new Cbo();
  msg: string;

  mostrarTabela = false;

  perfilAcesso: Acesso;

  displayedColumns: string[] = ['numero', 'nome', 'descricao', 'acoes'];
  dataSource: MatTableDataSource<Cbo> = new MatTableDataSource();

  constructor(
    private cboService: CboService,
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
    this.cbo = new Cbo();
    this.dataSource.data = [];
  }

  consultar() {
    if (this.cbo.id) {
      this.cboService.getById(this.cbo.id).subscribe((cbo: Cbo) => {
        if (!cbo) {
          this.mostrarTabela = false;
          this.msg = "Nenhum registro para a pesquisa selecionada";
        } else {
          this.dataSource.data = [cbo];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }
  }


  atualizar(cbo: Cbo) {
    this.router.navigate(['/cbo/cadastrar'], { queryParams: { id: cbo.id } });
  }

  deletar(cbo: Cbo) {
    this.chamaCaixaDialogo(cbo);
  }

  chamaCaixaDialogo(cbo: Cbo) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir o cbo ${cbo.nomeTitulo}?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.cboService.excluir(cbo.id).subscribe(() => {
          this.cbo.id = null;
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.cboService.getAll().subscribe((cbos: Cbo[]) => {
      this.cbos = cbos;
      this.dataSource.data = cbos ? cbos : [];
      this.verificaMostrarTabela(cbos);
    })
  }

  verificaMostrarTabela(cbos: Cbo[]) {
    if (!cbos || cbos.length == 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhum cbo cadastrado."
    } else {
      this.mostrarTabela = true;
    }
  }


  getNumeroFormater(valor: string) {
    return valor.substr(0,5) + '-' + valor.substr(5,1);
  }
}
