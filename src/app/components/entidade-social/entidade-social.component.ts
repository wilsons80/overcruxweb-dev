import { EntidadeSocialService } from './../../services/entidade-social/entidade-social.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { EntidadesSociais } from 'src/app/core/entidades-sociais';
import { Acesso } from 'src/app/core/acesso';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-entidade-social',
  templateUrl: './entidade-social.component.html',
  styleUrls: ['./entidade-social.component.css']
})
export class EntidadeSocialComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  entidadesSociais: EntidadesSociais[];
  entidadeSocial: EntidadesSociais = new EntidadesSociais();

  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['entidadesocial', 'cnpj', 'datainiciovinculo', 'datafimvinculo', 'ativa',  'acoes'];

  perfilAcesso: Acesso;

  dataSource: MatTableDataSource<EntidadesSociais> = new MatTableDataSource();

  constructor(
    private entidadeSocialService: EntidadeSocialService,
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
    this.entidadeSocial = new EntidadesSociais();
    this.dataSource.data = [];
  }

  consultar() {
    if (this.entidadeSocial.id) {
      this.entidadeSocialService.getById(this.entidadeSocial.id).subscribe((entidadeSocial: EntidadesSociais) => {
        if (!entidadeSocial) {
          this.mostrarTabela = false;
          this.msg = 'Nenhum registro para a pesquisa selecionada';
        } else {
          this.dataSource.data = [entidadeSocial];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }
  }


  atualizar(entidadeSocial: EntidadesSociais) {
    this.router.navigate(['/entidadesocial/cadastrar'], { queryParams: { id: entidadeSocial.id } });
  }

  deletar(entidadeSocial: EntidadesSociais) {
    this.chamaCaixaDialogo(entidadeSocial);
  }

  chamaCaixaDialogo(entidadeSocial: EntidadesSociais) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir a entidade social ?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.entidadeSocialService.excluir(entidadeSocial.id).subscribe(() => {
          this.entidadeSocial.id = null;
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.entidadeSocialService.getAll().subscribe((entidadesSociais: EntidadesSociais[]) => {
      this.entidadesSociais = entidadesSociais;
      this.dataSource.data = entidadesSociais ? entidadesSociais : [];
      this.verificaMostrarTabela(entidadesSociais);
    })
  }

  verificaMostrarTabela(entidadesSociais: EntidadesSociais[]) {
    if (!entidadesSociais || entidadesSociais.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhuma entidade social cadastrada.';
    } else {
      this.mostrarTabela = true;
    }
  }
}
