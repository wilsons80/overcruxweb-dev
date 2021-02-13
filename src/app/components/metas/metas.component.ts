import { Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { ActivatedRoute, Router } from '@angular/router';
import { Metas } from 'src/app/core/metas';
import { Acesso } from 'src/app/core/acesso';
import { MetasService } from 'src/app/services/metas/metas.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';

@Component({
  selector: 'app-metas',
  templateUrl: './metas.component.html',
  styleUrls: ['./metas.component.css']
})
export class MetasComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  listaMetas: Metas[];
  mostrarTabela: boolean = false;
  metas: Metas = new Metas();
  msg: string;

  displayedColumns: string[] = ['nome', 'indicadores', 'dataInicio', 'dataFim', 'acoes'];
  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();


  dataSource: MatTableDataSource<Metas> = new MatTableDataSource();

  constructor(
    private metasService: MetasService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute

  ) { }

  ngOnInit() {
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    this.dataSource.paginator = this.paginator;
    this.getAll();
  }


  limpar() {
    this.mostrarTabela = false;
    this.metas = new Metas()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.metas.id) {
      this.metasService.getById(this.metas.id).subscribe((metas: Metas) => {
        if (!metas) {
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        } else {
          this.dataSource.data = [metas];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }
  }


  atualizar(metas: Metas) {
    this.router.navigate(['/metas/cadastrar'], { queryParams: { idMetas: metas.id } });
  }

  deletar(metas: Metas) {
    this.chamaCaixaDialogo(metas);
  }

  chamaCaixaDialogo(metas: Metas) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir a meta ${metas.nome}?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.metasService.excluir(metas.id).subscribe(() => {
          this.metas.id = null;
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.metasService.getAll().subscribe((metas: Metas[]) => {
      this.listaMetas = metas
      this.dataSource.data = metas ? metas : [];
      this.verificaMostrarTabela(metas);
    })
  }

  verificaMostrarTabela(metas: Metas[]) {
    if (!metas || metas.length == 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhuma meta cadastrada."
    } else {
      this.mostrarTabela = true;
    }
  }
}
