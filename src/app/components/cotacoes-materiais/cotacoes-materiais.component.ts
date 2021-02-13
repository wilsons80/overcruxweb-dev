import { Material } from './../../core/material';
import { CotacoesMateriaisService } from './../../services/cotacoes-materiais/cotacoes-materiais.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { ActivatedRoute, Router } from '@angular/router';
import { Acesso } from 'src/app/core/acesso';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { CotacoesMateriais } from './../../core/cotacoes-materiais';
import { MaterialService } from 'src/app/services/material/material.service';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';

@Component({
  selector: 'cotacoes-materiais',
  templateUrl: './cotacoes-materiais.component.html',
  styleUrls: ['./cotacoes-materiais.component.css']
})
export class CotacoesMateriaisComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  listaCotacoesMateriais: CotacoesMateriais[];
  listaMateriais: Material[];
  mostrarTabela: boolean = false;
  cotacoesMateriais: CotacoesMateriais = new CotacoesMateriais();
  idMaterial: number;
  msg: string;

  displayedColumns: string[] = ['id', 'material', 'dataCotacao', 'dataValidadeCotacao', 'valorTotalCotacao', 'acoes'];
  dataSource: MatTableDataSource<CotacoesMateriais> = new MatTableDataSource();

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();


  constructor(
    private cotacoesMateriaisService: CotacoesMateriaisService,
    private materialService: MaterialService,
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
    this.cotacoesMateriais = new CotacoesMateriais()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.idMaterial) {
      this.cotacoesMateriaisService.getPorMaterial(this.idMaterial).subscribe((cotacoesMateriais: CotacoesMateriais) => {
        if (!cotacoesMateriais) {
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        } else {
          this.dataSource.data = [cotacoesMateriais];
          this.mostrarTabela = true;
        }
      },
        (retorno) => {
          this.mostrarTabela = false
          this.msg = retorno.error.mensagem
        }
      )
    } else {
      this.getAll();
    }
  }


  atualizar(cotacoesMateriais: CotacoesMateriais) {
    this.router.navigate(['/cotacoesmateriais/cadastrar'], { queryParams: { id: cotacoesMateriais.id } });
  }

  deletar(cotacoesMateriais: CotacoesMateriais) {
    this.chamaCaixaDialogo(cotacoesMateriais);
  }

  chamaCaixaDialogo(cotacoesMateriais: CotacoesMateriais) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir ?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.cotacoesMateriaisService.excluir(cotacoesMateriais.id).subscribe(() => {
          this.cotacoesMateriais.id = null;
          this.consultar();
        })

      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.cotacoesMateriaisService.getAll().subscribe((listaCotacoesMateriais: CotacoesMateriais[]) => {
      this.listaCotacoesMateriais = listaCotacoesMateriais;
      this.dataSource.data = listaCotacoesMateriais ? listaCotacoesMateriais : [];
      this.verificaMostrarTabela(listaCotacoesMateriais);
    })
   
    this.materialService.getAll().subscribe((listaMateriais:Material[]) => this.listaMateriais = listaMateriais);
  }

  verificaMostrarTabela(listaCotacoesMateriais: CotacoesMateriais[]) {
    if (!listaCotacoesMateriais || listaCotacoesMateriais.length == 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhuma cotação cadastrada."
    } else {
      this.mostrarTabela = true;
    }
  }

}
