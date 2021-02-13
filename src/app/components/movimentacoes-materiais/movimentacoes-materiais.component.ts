import { Component, OnInit, ViewChild } from '@angular/core';
import { Material } from 'src/app/core/material';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Acesso } from 'src/app/core/acesso';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { MovimentacoesMateriais } from 'src/app/core/movimentacoes-materiais';
import { MovimentacoesMateriaisService } from 'src/app/services/movimentacoes-materiais/movimentacoes-materiais.service';
import { TipoMovimentacao } from 'src/app/core/tipo-movimentacao';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';

@Component({
  selector: 'movimentacoes-materiais',
  templateUrl: './movimentacoes-materiais.component.html',
  styleUrls: ['./movimentacoes-materiais.component.css']
})
export class MovimentacoesMateriaisComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  listaMovimentacoesMateriais: MovimentacoesMateriais[];
  mostrarTabela: boolean = false;
  movimentacoesMateriais: MovimentacoesMateriais = new MovimentacoesMateriais();
  msg: string;

  displayedColumns: string[] = ['id', 'descricaoMovimentacaoMaterial', 'tipoMovimentacao', 'acoes'];
  dataSource: MatTableDataSource<MovimentacoesMateriais> = new MatTableDataSource();
  
  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();


  tiposMovimentacao: TipoMovimentacao = new TipoMovimentacao();

  constructor(
    private movimentacoesMateriaisService: MovimentacoesMateriaisService,
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
    this.movimentacoesMateriais = new MovimentacoesMateriais()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.movimentacoesMateriais.id) {
      this.movimentacoesMateriaisService.getById(this.movimentacoesMateriais.id).subscribe((movimentacoesMateriais: MovimentacoesMateriais) => {
        if (!movimentacoesMateriais) {
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        } else {
          this.dataSource.data = [movimentacoesMateriais];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }

  }


  atualizar(movimentacoesMateriais: MovimentacoesMateriais) {
    this.router.navigate(['/movimentacoesmateriais/cadastrar'], { queryParams: { id: movimentacoesMateriais.id } });
  }

  deletar(movimentacoesMateriais: MovimentacoesMateriais) {
    this.chamaCaixaDialogo(movimentacoesMateriais);
  }

  chamaCaixaDialogo(movimentacoesMateriais: MovimentacoesMateriais) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir ?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.movimentacoesMateriaisService.excluir(movimentacoesMateriais.id).subscribe(() => {
          this.movimentacoesMateriais.id = null;
          this.consultar();
        })

      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.movimentacoesMateriaisService.getAll().subscribe((listaMovimentacoesMateriais: MovimentacoesMateriais[]) => {
      this.listaMovimentacoesMateriais = listaMovimentacoesMateriais;
      this.dataSource.data = listaMovimentacoesMateriais ? listaMovimentacoesMateriais : [];
      this.verificaMostrarTabela(listaMovimentacoesMateriais);
    })
  }

  verificaMostrarTabela(listaMovimentacoesMateriais: MovimentacoesMateriais[]) {
    if (!listaMovimentacoesMateriais || listaMovimentacoesMateriais.length == 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhuma movimentação material cadastrada."
    } else {
      this.mostrarTabela = true;
    }
  }

}
