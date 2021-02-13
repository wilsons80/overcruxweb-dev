import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { ActivatedRoute, Router } from '@angular/router';
import { Perspectiva } from 'src/app/core/perspectiva';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { PerspectivaService } from './../../services/perspectiva/perspectiva.service';
import { Acesso } from 'src/app/core/acesso';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';

@Component({
  selector: 'app-perspectiva',
  templateUrl: './perspectiva.component.html',
  styleUrls: ['./perspectiva.component.css']
})
export class PerspectivaComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  perspectivas: Perspectiva[];
  mostrarTabela: boolean = false;
  perspectiva: Perspectiva = new Perspectiva();
  idUnidadeLogada: number;
  msg: string;

  displayedColumns: string[] = ['nome', 'dtImplantacao', 'dtTermino', 'unidade', 'acoes'];
  dataSource: MatTableDataSource<Perspectiva> = new MatTableDataSource();


  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();

  
  constructor(
    private perspectivaService: PerspectivaService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute:ActivatedRoute

  ) { }

  ngOnInit() {
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    this.dataSource.paginator = this.paginator;
    this.getAll();
  }

  limpar() {
    this.mostrarTabela = false;
    this.perspectiva = new Perspectiva();
    this.dataSource.data = [];
  }

  consultar() {
    if (this.perspectiva.idPerspectiva) {
      this.perspectivaService.getById(this.perspectiva.idPerspectiva).subscribe((perspectiva: Perspectiva) => {
        if (!perspectiva) {
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        } else {
          this.dataSource.data = [perspectiva];
          this.mostrarTabela = true;
        }
      })
    }else {
      this.getAll();
    }
  }


  atualizar(perspectiva: Perspectiva) {
    this.router.navigate(['/perspectiva/cadastrar'], { queryParams: { idPerspectiva: perspectiva.idPerspectiva } });
  }

  deletar(perspectiva: Perspectiva) {
    this.chamaCaixaDialogo(perspectiva);
  }

  chamaCaixaDialogo(perspectiva: Perspectiva) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir a perspectiva ${perspectiva.nmPerspectiva}?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {

        this.perspectivaService.excluir(perspectiva.idPerspectiva).subscribe(() => {
          this.perspectiva.idPerspectiva = null;
          this.consultar();
        })

      } else {
        dialogRef.close();
      }
    }
    );
  }
  getAll() {
    this.perspectivaService.getAll().subscribe((perspectivas: Perspectiva[]) => {
      this.perspectivas = perspectivas
      this.dataSource.data = perspectivas ? perspectivas : [];
      this.verificaMostrarTabela(perspectivas);
    })

  }

  verificaMostrarTabela(perspectivas: Perspectiva[]) {
    if (!perspectivas || perspectivas.length == 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhuma perspectiva cadastrada."
    } else {
      this.mostrarTabela = true;
    }
  }



}

