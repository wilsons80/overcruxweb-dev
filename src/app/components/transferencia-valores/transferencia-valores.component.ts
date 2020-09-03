import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Acesso } from 'src/app/core/acesso';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';
import { Movimentacoes } from 'src/app/core/movimentacoes';
import { MovimentacoesService } from 'src/app/services/movimentacoes/movimentacoes.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'transferencia-valores',
  templateUrl: './transferencia-valores.component.html',
  styleUrls: ['./transferencia-valores.component.css']
})
export class TransferenciaValoresComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  listaMovimentacoes: Movimentacoes[];
  mostrarTabela: boolean = false;
  movimentacoes: Movimentacoes = new Movimentacoes();
  msg: string;

  displayedColumns: string[] = ['origem', 'destino', 'dataMovimentacao', 'valorMovimentacao', 'acoes'];
  dataSource: MatTableDataSource<Movimentacoes> = new MatTableDataSource();
  
  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil;

  constructor(
    private movimentacoesService: MovimentacoesService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService
  ) { 
    this.carregarPerfil = new CarregarPerfil();
  }

  ngOnInit() {
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    this.dataSource.paginator = this.paginator;
    this.getAllDestino();
  }


  limpar() {
    this.mostrarTabela = false;
    this.movimentacoes = new Movimentacoes()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.movimentacoes.id) {
      this.movimentacoesService.getById(this.movimentacoes.id)
      .subscribe((movimentacoes: Movimentacoes) => {
        if (!movimentacoes) {
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        } else {
          this.dataSource.data = [movimentacoes];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAllDestino();
    }

  }

  atualizar(movimentacoes: Movimentacoes) {
    this.router.navigate(['/transferenciavalores/cadastrar'], { queryParams: { id: movimentacoes.id } });
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

  getAllDestino() {
    this.movimentacoesService.getAllDestino().subscribe((listaMovimentacoes: Movimentacoes[]) => {
      this.listaMovimentacoes = listaMovimentacoes;
      this.dataSource.data = listaMovimentacoes ? listaMovimentacoes : [];
      this.verificaMostrarTabela(listaMovimentacoes);
    })
  }

  verificaMostrarTabela(listaMovimentacoes: Movimentacoes[]) {
    if (!listaMovimentacoes || listaMovimentacoes.length == 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhuma transferência cadastrada."
    } else {
      this.mostrarTabela = true;
    }
  }


}
