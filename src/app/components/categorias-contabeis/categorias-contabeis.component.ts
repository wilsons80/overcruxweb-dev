import { PlanosContas } from '../../core/planos-contas';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog} from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


import { ActivatedRoute, Router } from '@angular/router';
import { Acesso } from 'src/app/core/acesso';
import { CategoriasContabeisService } from 'src/app/services/categorias-contabeis/categorias-contabeis.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { TipoDespesa } from './../../core/tipo-despesa';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';


@Component({
  selector: 'categorias-contabeis',
  templateUrl: './categorias-contabeis.component.html',
  styleUrls: ['./categorias-contabeis.component.css']
})
export class CategoriasContabeisComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  mostrarTabela: boolean = false;
  msg: string;

  displayedColumns: string[] = ['id', 'planoconta', 'sintetico', 'acoes'];
  dataSource: MatTableDataSource<PlanosContas> = new MatTableDataSource();

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();

  tiposDespesas: TipoDespesa = new TipoDespesa();
  selecionado:PlanosContas = new PlanosContas();

  listaPlanosContas: PlanosContas[];
  comboPlanosContas: any[] = [];

  constructor(
    private categoriasContabeisService: CategoriasContabeisService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    this.comboPlanosContas = [];
    this.dataSource.paginator = this.paginator;
    this.getAll();
  }


  limpar() {
    this.mostrarTabela = false;
    this.dataSource.data = [];
    this.selecionado = null;
  }

  consultar() {
    if (this.selecionado && this.selecionado.id) {
      this.categoriasContabeisService.getViewById(this.selecionado.id).subscribe((planoConta: PlanosContas) => {
        if (!planoConta) {
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        } else {
          this.dataSource.data = [planoConta];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }
  }


  atualizar(planoConta: PlanosContas) {
    this.router.navigate(['/planoscontascontabeis/cadastrar'], { queryParams: { id: planoConta.id } });
  }

  deletar(planoConta: PlanosContas) {
    this.chamaCaixaDialogo(planoConta);
  }

  chamaCaixaDialogo(planoConta: PlanosContas) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir ?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.categoriasContabeisService.excluir(planoConta.id).subscribe(() => {
          this.limpar();
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.categoriasContabeisService.getAllViewPlanosContas().subscribe((planos: PlanosContas[]) => {
      this.comboPlanosContas = planos;

      this.dataSource.data = planos ? planos : [];
      this.verificaMostrarTabela(planos);
    })
  }
 
  verificaMostrarTabela(planos: PlanosContas[]) {
    if (!planos || planos.length == 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhuma Rubrica cadastrada."
    } else {
      this.mostrarTabela = true;
    }
  }


}
