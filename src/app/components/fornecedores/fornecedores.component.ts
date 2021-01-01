import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Acesso } from 'src/app/core/acesso';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';
import { Combo } from 'src/app/core/combo';
import { Fornecedor } from 'src/app/core/fornecedor';
import { FornecedoresService } from 'src/app/services/Fornecedores/Fornecedores.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';


export class Filter {
  elm: Combo;
}
@Component({
  selector: 'fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.css']
})
export class FornecedoresComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;



  listaFornecedores: Fornecedor[];
  fornecedor: Fornecedor = new Fornecedor();
  msg: string;

  filtro: Filter = new Filter();
  listaCombo: Combo[];

  carregarPerfil: CarregarPerfil;
  mostrarTabela = false;

  displayedColumns: string[] = ['tipo', 'nomepf', 'nomepj', 'dataInicioVinculo', 'acoes'];
  dataSource: MatTableDataSource<Fornecedor> = new MatTableDataSource();

  perfilAcesso: Acesso;

  constructor(
    private fornecedoresService: FornecedoresService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute

  ) {
    this.carregarPerfil = new CarregarPerfil();
  }

  ngOnInit() {
    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];
    this.dataSource.paginator = this.paginator;

    this.filtro = new Filter();
    this.filtro.elm = new Combo();

    this.carregarCombos();
    this.getAll();
  }
  limpar() {
    this.mostrarTabela = false;
    this.fornecedor = new Fornecedor()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.filtro.elm && this.filtro.elm.id) {
      this.fornecedoresService.getById(this.filtro.elm.id).subscribe((doadores: Fornecedor) => {
        if (!doadores) {
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        } else {
          this.dataSource.data = [doadores];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }
  }


  atualizar(doadores: Fornecedor) {
    this.router.navigate(['/fornecedores/cadastrar'], { queryParams: { id: doadores.id } });
  }

  deletar(doadores: Fornecedor) {
    this.chamaCaixaDialogo(doadores);
  }

  chamaCaixaDialogo(doadores: Fornecedor) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.fornecedoresService.excluir(doadores.id).subscribe(() => {
          this.fornecedor.id = null;
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.fornecedoresService.getAll().subscribe((listaDoadores: Fornecedor[]) => {
      this.listaFornecedores = listaDoadores;
      this.dataSource.data = listaDoadores ? listaDoadores : [];
      this.verificaMostrarTabela(listaDoadores);
    })
  }
  verificaMostrarTabela(listaDoadores: Fornecedor[]) {
    if (!listaDoadores || listaDoadores.length == 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhum cadastro."
    } else {
      this.mostrarTabela = true;
    }
  }

  private carregarCombos() {
    this.fornecedoresService.getAllByCombo().subscribe((listaCombo: Combo[]) => {
      this.listaCombo = listaCombo;

      this.listaCombo.sort((a, b) => {
        if (a.nome > b.nome) { return 1; }
        if (a.nome < b.nome) { return -1; }
        return 0;
      });
    })
  }
}
