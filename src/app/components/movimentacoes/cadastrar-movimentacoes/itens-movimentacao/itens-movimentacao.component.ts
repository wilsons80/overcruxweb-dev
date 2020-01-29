import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'itens-movimentacao',
  templateUrl: './itens-movimentacao.component.html',
  styleUrls: ['./itens-movimentacao.component.css']
})
export class ItensMovimentacaoComponent implements OnInit {


  materiais = [{nome: "Material 1"}, {nome: "Material 2"}];
  categorias = [{nome: "Categoria 1"}, {nome: "Categoria 2"}];
  pedidosMaterial = [{nome: "Pedido 1"}, {nome: "Pedido 2"}];

  valorUnitario:number;
  valorTotal:number;
  quantidade:number;

  constructor() { }

  ngOnInit() {
  }

}
