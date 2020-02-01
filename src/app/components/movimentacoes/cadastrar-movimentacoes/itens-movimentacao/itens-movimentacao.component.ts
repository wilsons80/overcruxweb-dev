import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Acesso } from 'src/app/core/acesso';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ItemMovimentacao } from 'src/app/core/item-movimentacao';

@Component({
  selector: 'itens-movimentacao',
  templateUrl: './itens-movimentacao.component.html',
  styleUrls: ['./itens-movimentacao.component.css']
})
export class ItensMovimentacaoComponent implements OnInit {

  @Input() listaItemMovimentacao: ItemMovimentacao[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  mostrarTabela = true;
  msg: string;

  materiais = [{ nome: "Material 1" }, { nome: "Material 2" }];
  categorias = [{ nome: "Categoria 1" }, { nome: "Categoria 2" }];
  pedidosMaterial = [{ nome: "Pedido 1" }, { nome: "Pedido 2" }];

  
  displayedColumns: string[] = ['categoria','material', 'qtdMaterial', 'valorUnitarioItem', 'valorTotalItem','acoes'];
  dataSource: MatTableDataSource<ItemMovimentacao> = new MatTableDataSource();

 

  itemMovimentacao: ItemMovimentacao;

  perfilAcesso: Acesso;

  openFormCadastro = false;
  isAtualizar = false;

  valorUnitario: number = 0;
  valorTotal: number = 0;
  quantidade: number = 0;

  constructor(
  ) { }

  ngOnInit() {

    this.inicializaLista();
  }

  initObjeto() {}

  limpar() { }

  adicionar() {}

  getObjetosCompletosParaLista(itemMovimentacao: ItemMovimentacao) {}

  atualizar() { }


  inicializaLista(){
    const item = new ItemMovimentacao();
    item.categoria = "Categoria 1";
    item.material = "Material 1"
    item.qtdMaterial = 3;
    item.valorUnitarioItem = 5;
    item.valorTotalItem = 15;

    const item1 = new ItemMovimentacao();
    item1.categoria = "Categoria 2";
    item1.material = "Material 2"
    item1.qtdMaterial = 10;
    item1.valorUnitarioItem = 5;
    item1.valorTotalItem = 50;

    this.listaItemMovimentacao.push(item);
    this.listaItemMovimentacao.push(item1);

    this.dataSource.data = this.listaItemMovimentacao;
  }

  carregarLista(){}


}
