import { MovimentacoesService } from './../../services/movimentacoes/movimentacoes.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { Acesso } from 'src/app/core/acesso';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { Movimentacoes } from 'src/app/core/movimentacoes';
import { FuncoesService } from 'src/app/services/funcoes/funcoes.service';

@Component({
  selector: 'movimentacoes',
  templateUrl: './movimentacoes.component.html',
  styleUrls: ['./movimentacoes.component.css']
})
export class MovimentacoesComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  listaMovimentacoes: Movimentacoes[];
  mostrarTabela: boolean = false;
  movimentacoes: Movimentacoes = new Movimentacoes();
  msg: string;

  displayedColumns: string[] = ['id','descricao', 'dataMovimentacao', 'stTipoMovimentacao', 'valorMovimentacao', 'qtdParcelas', 'acoes'];
  dataSource: MatTableDataSource<Movimentacoes> = new MatTableDataSource();
  
   perfilAcesso: Acesso;


  constructor(
    private movimentacoesService: MovimentacoesService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.perfilAcesso =  this.activatedRoute.snapshot.data.perfilAcesso[0];

    this.dataSource.paginator = this.paginator;
    this.getAll();
  }


  limpar() {
    this.mostrarTabela = false;
    this.movimentacoes = new Movimentacoes()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.movimentacoes.id) {
      this.movimentacoesService.getById(this.movimentacoes.id).subscribe((movimentacoes: Movimentacoes) => {
        if (!movimentacoes) {
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        } else {
          this.dataSource.data = [movimentacoes];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }

  }

  atualizar(movimentacoes: Movimentacoes) {
    this.router.navigate(['/movimentacoes/cadastrar'], { queryParams: { id: movimentacoes.id } });
  }

  deletar(movimentacoes: Movimentacoes) {
    this.chamaCaixaDialogo(movimentacoes);
  }

  chamaCaixaDialogo(movimentacoes: Movimentacoes) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir ?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.movimentacoesService.excluir(movimentacoes.id).subscribe(() => {
          this.movimentacoes.id = null;
          this.consultar();
        })

      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.movimentacoesService.getAll().subscribe((listaMovimentacoes: Movimentacoes[]) => {
      this.listaMovimentacoes = listaMovimentacoes;
      this.dataSource.data = listaMovimentacoes ? listaMovimentacoes : [];
      this.verificaMostrarTabela(listaMovimentacoes);
    })
  }

  verificaMostrarTabela(listaMovimentacoes: Movimentacoes[]) {
    if (!listaMovimentacoes || listaMovimentacoes.length == 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhuma movimentação cadastrada."
    } else {
      this.mostrarTabela = true;
    }
  }

}
