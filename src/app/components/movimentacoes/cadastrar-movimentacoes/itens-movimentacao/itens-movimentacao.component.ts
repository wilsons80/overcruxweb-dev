import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import * as _ from 'lodash';
import { Acesso } from 'src/app/core/acesso';
import { CategoriasContabeis } from 'src/app/core/categorias-contabeis';
import { ItensMovimentacoes } from 'src/app/core/itens-movimentacoes';
import { Material } from 'src/app/core/material';
import { PedidosMateriais } from './../../../../core/pedidos-materiais';
import { CategoriasContabeisService } from './../../../../services/categorias-contabeis/categorias-contabeis.service';
import { MaterialService } from './../../../../services/material/material.service';
import { PedidosMateriaisService } from './../../../../services/pedidosMateriais/pedidos-materiais.service';

@Component({
  selector: 'itens-movimentacao',
  templateUrl: './itens-movimentacao.component.html',
  styleUrls: ['./itens-movimentacao.component.css']
})
export class ItensMovimentacaoComponent implements OnInit {

  @Input() listaItensMovimentacoes: ItensMovimentacoes[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  mostrarTabela = false;
  msg: string = "Nenhum item movimentação adicionado";



  displayedColumns: string[] = ['descricaoItemMovimentacao', 'quantidadeMaterial', 'valorUnitarioItem', 'valorTotalItem', 'acoes'];
  dataSource: MatTableDataSource<ItensMovimentacoes> = new MatTableDataSource();

  itensMovimentacoes: ItensMovimentacoes;

  perfilAcesso: Acesso;

  openFormCadastro = false;
  isAtualizar = false;
  materiais: Material[];
  categorias: CategoriasContabeis[];
  pedidosMateriais: PedidosMateriais[];


  constructor(

    private materialService: MaterialService,
    private categoriasContabeisService: CategoriasContabeisService,
    private pedidosMateriaisService: PedidosMateriaisService

  ) { }

  ngOnInit() {
    this.initObjetos();

    this.materialService.getAllCombo().subscribe((materiais: Material[]) => {
      this.materiais = materiais;
    })

    this.categoriasContabeisService.getAllCombo().subscribe((categorias: CategoriasContabeis[]) => {
      this.categorias = categorias;
    })

    this.pedidosMateriaisService.getAllCombo().subscribe((pedidosMateriais: PedidosMateriais[]) => {
      this.pedidosMateriais = pedidosMateriais;
    })

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["listaItensMovimentacoes"] && changes["listaItensMovimentacoes"].currentValue) {
      this.carregarLista();
    }
  }

  adicionar() {
    const contasCentrosCustoSelecionada = new ItensMovimentacoes();
    Object.assign(contasCentrosCustoSelecionada, this.itensMovimentacoes);

    this.getObjetosCompletosParaLista(contasCentrosCustoSelecionada);

    this.listaItensMovimentacoes.push(contasCentrosCustoSelecionada);
    this.limpar();
    this.openFormCadastro = !this.openFormCadastro;
  }


  getObjetosCompletosParaLista(itensMovimentacoes: ItensMovimentacoes) {
    itensMovimentacoes.material = _.find(this.materiais, (m: Material) => m.id == itensMovimentacoes.material.id);
    itensMovimentacoes.pedidosMateriais = _.find(this.pedidosMateriais, (m: PedidosMateriais) => m.id == itensMovimentacoes.pedidosMateriais.id);
    itensMovimentacoes.categoria = _.find(this.categorias, (m: CategoriasContabeis) => m.id == itensMovimentacoes.categoria.id);
  }

  novo() {
    this.isAtualizar = false;
    this.openFormCadastro = !this.openFormCadastro;
    this.limpar();
  }

  atualizar() {
    this.limpar();
    this.openFormCadastro = false;
    this.isAtualizar = false;
  }



  atualizarFuncao(itensMovimentacoes: ItensMovimentacoes) {
    this.itensMovimentacoes = itensMovimentacoes;
    this.openFormCadastro = true;
    this.isAtualizar = true;

  }

  limpar() {
    this.initObjetos();
  }

  carregarLista() {
    if (this.listaItensMovimentacoes.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhum item movimentação adicionado.';
    } else {
      this.dataSource.data = this.listaItensMovimentacoes ? this.listaItensMovimentacoes : [];
      this.mostrarTabela = true;
    }
  }


  initObjetos() {
    this.itensMovimentacoes = new ItensMovimentacoes();
    this.itensMovimentacoes.categoria = new CategoriasContabeis();
    this.itensMovimentacoes.material = new Material();
    this.itensMovimentacoes.pedidosMateriais = new PedidosMateriais();
    this.itensMovimentacoes.quantidadeMaterial = 0;
    this.itensMovimentacoes.valorTotalItem = 0;
    this.itensMovimentacoes.valorUnitarioItem = 0;
  }

  deletar(itensMovimentacoes: ItensMovimentacoes): void {
    const index = this.listaItensMovimentacoes.indexOf(this.listaItensMovimentacoes.find(fi => fi === itensMovimentacoes));
    if (index >= 0) {
      this.listaItensMovimentacoes.splice(index, 1);
      this.carregarLista();
    }
  }

  multiplicar(event) {
    this.itensMovimentacoes.valorUnitarioItem = event;

    this.itensMovimentacoes.valorTotalItem = this.itensMovimentacoes.valorUnitarioItem  * 
      this.itensMovimentacoes.quantidadeMaterial
  }

 multiplicarComQuantidade() {
    this.itensMovimentacoes.valorTotalItem = this.itensMovimentacoes.valorUnitarioItem  * 
      this.itensMovimentacoes.quantidadeMaterial
  }

  atualizarRegistro(itensMovimentacoes: ItensMovimentacoes) {
    this.preencherObjetosVazios(itensMovimentacoes);
    this.itensMovimentacoes = itensMovimentacoes;
    this.openFormCadastro = true;
    this.isAtualizar = true;
  }

  preencherObjetosVazios(itensMovimentacoes: ItensMovimentacoes){
    if(!itensMovimentacoes.material){
      itensMovimentacoes.material = new Material();
    }

    if(!itensMovimentacoes.categoria){
      itensMovimentacoes.categoria = new CategoriasContabeis();
    }

    if(!itensMovimentacoes.pedidosMateriais){
      itensMovimentacoes.pedidosMateriais = new PedidosMateriais();
    }
  }
  
}
