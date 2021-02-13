import { Acesso } from '../../core/acesso';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Unidade } from 'src/app/core/unidade';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ControleMenuService } from 'src/app/services/controle-menu/controle-menu.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { UploadFotoComponent } from '../upload-foto/upload-foto.component';
import { TipoUnidade } from 'src/app/core/tipo-unidade';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';



@Component({
  selector: 'app-unidade',
  templateUrl: './unidade.component.html',
  styleUrls: ['./unidade.component.css']
})
export class UnidadeComponent implements OnInit {


 @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  unidades: Unidade[];
  unidade: Unidade = new Unidade();
  mostrarTabela = false;
  msg: string;

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();

  tipoUnidade: TipoUnidade = new TipoUnidade();

  displayedColumns: string[] = ['sigla', 'nome', 'tipo', 'acoes'];
  dataSource: MatTableDataSource<Unidade> = new MatTableDataSource();

  constructor(
    private unidadeService: UnidadeService,
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
    this.unidade = new Unidade()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.unidade.idUnidade) {
      this.unidadeService.getUnidadeSetandoLogada(this.unidade.idUnidade).subscribe((unidade: Unidade) => {
        if(!unidade){
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        }else {
          this.dataSource.data = [unidade];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }
  }


  atualizar(unidade: Unidade) {
    this.router.navigate(['/unidade/cadastrar'], { queryParams: { idUnidade: unidade.idUnidade } });
  }

  deletar(unidade: Unidade) {
    this.chamaCaixaDialogo(unidade);
  }

  chamaCaixaDialogo(unidade: Unidade) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir a unidade?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.unidadeService.excluir(unidade.idUnidade).subscribe(() => {
          this.unidade.idUnidade = null;
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.unidadeService.getAllByInstituicaoDaUnidadeLogada().subscribe((unidades: Unidade[]) => {
      this.unidades = unidades;
      this.dataSource.data = unidades ? unidades : [];
      this.verificaMostrarTabela(unidades);
    })
  }

  verificaMostrarTabela(unidades: Unidade[]) {
    if(!unidades ||unidades.length == 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhum indicador cadastrado."
    }else{
      this.mostrarTabela = true;
    }
  }



}

