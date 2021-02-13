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
import { CategoriasContabeis } from './../../core/categorias-contabeis';
import { TipoDespesa } from './../../core/tipo-despesa';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';


@Component({
  selector: 'categorias-contabeis',
  templateUrl: './categorias-contabeis.component.html',
  styleUrls: ['./categorias-contabeis.component.css']
})
export class CategoriasContabeisComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  listaCategoriasContabeis: CategoriasContabeis[];
  mostrarTabela: boolean = false;
  categoriasContabeis: CategoriasContabeis = new CategoriasContabeis();
  msg: string;

  displayedColumns: string[] = ['tipo', 'nome', 'categoria', 'acoes'];
  dataSource: MatTableDataSource<CategoriasContabeis> = new MatTableDataSource();

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();

  tiposDespesas: TipoDespesa = new TipoDespesa();
  listaPlanosContas: any[];
  selecionado:PlanosContas = new PlanosContas();

  constructor(
    private categoriasContabeisService: CategoriasContabeisService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    this.dataSource.paginator = this.paginator;
    this.getAll();
    this.getAllCombo();
  }


  limpar() {
    this.mostrarTabela = false;
    this.categoriasContabeis = new CategoriasContabeis()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.selecionado.id) {
      this.categoriasContabeisService.getById(this.selecionado.id).subscribe((categoriasContabeis: CategoriasContabeis) => {
        if (!categoriasContabeis) {
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        } else {
          this.dataSource.data = [categoriasContabeis];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }

  }


  atualizar(categoriasContabeis: CategoriasContabeis) {
    this.router.navigate(['/planoscontascontabeis/cadastrar'], { queryParams: { id: categoriasContabeis.id } });
  }

  deletar(categoriasContabeis: CategoriasContabeis) {
    this.chamaCaixaDialogo(categoriasContabeis);
  }

  chamaCaixaDialogo(categoriasContabeis: CategoriasContabeis) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir ?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.categoriasContabeisService.excluir(categoriasContabeis.id).subscribe(() => {
          this.categoriasContabeis.id = null;
          this.consultar();
        })

      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.categoriasContabeisService.getAll().subscribe((listaCategoriasContabeis: CategoriasContabeis[]) => {
      this.listaCategoriasContabeis = listaCategoriasContabeis;
      this.dataSource.data = listaCategoriasContabeis ? listaCategoriasContabeis : [];
      this.verificaMostrarTabela(listaCategoriasContabeis);
    })
    
  }
 
  getAllCombo() {
    this.categoriasContabeisService.getAllView(true).subscribe((retorno: PlanosContas[]) => {
      this.listaPlanosContas = retorno;
    })
  }

  verificaMostrarTabela(listaCategoriasContabeis: CategoriasContabeis[]) {
    if (!listaCategoriasContabeis || listaCategoriasContabeis.length == 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhuma Rubrica cadastrada."
    } else {
      this.mostrarTabela = true;
    }
  }


  getHierarquiaPlanoContabil(id) {
    if(id) {
      const plano:any = this.listaPlanosContas.find(l => l.id === id);
      return plano ? plano.planoConta : '';
    }
  }

}
