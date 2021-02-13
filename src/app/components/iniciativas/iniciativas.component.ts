import { Component, OnInit, ViewChild } from '@angular/core';


import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


import { ActivatedRoute, Router } from '@angular/router';
import { Iniciativa } from 'src/app/core/iniciativa';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { IniciativaService } from './../../services/iniciativa/iniciativa.service';
import { Acesso } from 'src/app/core/acesso';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';

@Component({
  selector: 'app-iniciativa',
  templateUrl: './iniciativas.component.html',
  styleUrls: ['./iniciativas.component.css']
})
export class IniciativasComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  iniciativas: Iniciativa[];
  mostrarTabela: boolean = false;
  iniciativa: Iniciativa = new Iniciativa();
  msg: string;

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();

  displayedColumns: string[] = ['nome', 'metas', 'dataInicio', 'dataFim', 'acoes'];


  dataSource: MatTableDataSource<Iniciativa> = new MatTableDataSource();

  constructor(
    private iniciativaService: IniciativaService,
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
    this.iniciativa = new Iniciativa()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.iniciativa.id) {
      this.iniciativaService.getById(this.iniciativa.id).subscribe((iniciativa: Iniciativa) => {
        if (!iniciativa) {
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        } else {
          this.dataSource.data = [iniciativa];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }
  }


  atualizar(iniciativa: Iniciativa) {
    this.router.navigate(['/iniciativas/cadastrar'], { queryParams: { idIniciativa: iniciativa.id } });
  }

  deletar(iniciativa: Iniciativa) {
    this.chamaCaixaDialogo(iniciativa);
  }

  chamaCaixaDialogo(iniciativa: Iniciativa) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir a iniciativa ${iniciativa.nome}?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.iniciativaService.excluir(iniciativa.id).subscribe(() => {
          this.iniciativa.id = null;
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.iniciativaService.getAll().subscribe((iniciativas: Iniciativa[]) => {
      this.iniciativas = iniciativas;
      this.dataSource.data = iniciativas ? iniciativas : [];
      this.verificaMostrarTabela(iniciativas);
    })
  }

  verificaMostrarTabela(iniciativas: Iniciativa[]) {
    if (!iniciativas || iniciativas.length == 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhuma iniciativa cadastrada."
    } else {
      this.mostrarTabela = true;
    }
  }
}
