import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { PedidosMateriais } from 'src/app/core/pedidos-materiais';
import { Acesso } from 'src/app/core/acesso';
import { PedidosMateriaisService } from 'src/app/services/pedidosMateriais/pedidos-materiais.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'pedidos-materiais',
  templateUrl: './pedidos-materiais.component.html',
  styleUrls: ['./pedidos-materiais.component.css']
})
export class PedidosMateriaisComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  listaPedidosMateriais: PedidosMateriais[];
  mostrarTabela: boolean = false;
  pedidosMateriais: PedidosMateriais = new PedidosMateriais();
  msg: string;

  id:number;
	descricaoPedido:string;
	dataFimPeriodo:Date;
	dataInicioPeriodo:Date;
	dataPedido:Date;

  displayedColumns: string[] = ['id','descricaoPedido', 'dataPedido' ,'dataInicioPeriodo', 'dataFimPeriodo', 'acoes'];
  dataSource: MatTableDataSource<PedidosMateriais> = new MatTableDataSource();
  
   perfilAcesso: Acesso;


  constructor(
    private pedidosMateriaisService: PedidosMateriaisService,
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
    this.pedidosMateriais = new PedidosMateriais()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.pedidosMateriais.id) {
      this.pedidosMateriaisService.getById(this.pedidosMateriais.id).subscribe((pedidosMateriais: PedidosMateriais) => {
        if (!pedidosMateriais) {
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        } else {
          this.dataSource.data = [pedidosMateriais];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }

  }

  atualizar(pedidosMateriais: PedidosMateriais) {
    this.router.navigate(['/pedidosmateriais/cadastrar'], { queryParams: { id: pedidosMateriais.id } });
  }

  deletar(pedidosMateriais: PedidosMateriais) {
    this.chamaCaixaDialogo(pedidosMateriais);
  }

  chamaCaixaDialogo(pedidosMateriais: PedidosMateriais) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir ?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.pedidosMateriaisService.excluir(pedidosMateriais.id).subscribe(() => {
          this.pedidosMateriais.id = null;
          this.consultar();
        })

      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.pedidosMateriaisService.getAll().subscribe((listaPedidosMateriais: PedidosMateriais[]) => {
      this.listaPedidosMateriais = listaPedidosMateriais;
      this.dataSource.data = listaPedidosMateriais ? listaPedidosMateriais : [];
      this.verificaMostrarTabela(listaPedidosMateriais);
    })
  }

  verificaMostrarTabela(listaPedidosMateriais: PedidosMateriais[]) {
    if (!listaPedidosMateriais || listaPedidosMateriais.length == 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhum pedido material cadastrado."
    } else {
      this.mostrarTabela = true;
    }
  }

}
