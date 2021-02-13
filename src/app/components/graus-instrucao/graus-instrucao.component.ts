import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { ActivatedRoute, Router } from '@angular/router';
import { GrausInstrucao } from 'src/app/core/graus-instrucao';
import { Acesso } from 'src/app/core/acesso';
import { GrausInstrucaoService } from 'src/app/services/graus-instrucao/graus-instrucao.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';

@Component({
  selector: 'app-graus-instrucao',
  templateUrl: './graus-instrucao.component.html',
  styleUrls: ['./graus-instrucao.component.css']
})
export class GrausInstrucaoComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  listaGrausInstrucao: GrausInstrucao[];
  mostrarTabela: boolean = false;
  grausInstrucao: GrausInstrucao = new GrausInstrucao();
  msg: string;

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();


  displayedColumns: string[] = ['descricao', 'acoes'];
  dataSource: MatTableDataSource<GrausInstrucao> = new MatTableDataSource();

  constructor(
    private grausInstrucaoService: GrausInstrucaoService,
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
    this.grausInstrucao = new GrausInstrucao()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.grausInstrucao.id) {
      this.grausInstrucaoService.getById(this.grausInstrucao.id).subscribe((grausInstrucao: GrausInstrucao) => {
        if (!grausInstrucao) {
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        } else {
          this.dataSource.data = [grausInstrucao];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }

  }


  atualizar(grausInstrucao: GrausInstrucao) {
    this.router.navigate(['/grausinstrucao/cadastrar'], { queryParams: { idGrausInstrucao: grausInstrucao.id } });
  }

  deletar(grausInstrucao: GrausInstrucao) {
    this.chamaCaixaDialogo(grausInstrucao);
  }

  chamaCaixaDialogo(grausInstrucao: GrausInstrucao) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir o grausInstrucao?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.grausInstrucaoService.excluir(grausInstrucao.id).subscribe(() => {
          this.grausInstrucao.id = null
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.grausInstrucaoService.getAll().subscribe((listaGrausInstrucao: GrausInstrucao[]) => {
      this.listaGrausInstrucao = listaGrausInstrucao;
      this.dataSource.data = listaGrausInstrucao ? listaGrausInstrucao : [];
      this.verificaMostrarTabela(listaGrausInstrucao);
    })
  }
  verificaMostrarTabela(grausInstrucaos: GrausInstrucao[]) {
    if (!grausInstrucaos || grausInstrucaos.length == 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhum Graus de Instrução cadastrado."
    } else {
      this.mostrarTabela = true;
    }
  }

}
