import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import * as _ from 'lodash';
import { Acesso } from 'src/app/core/acesso';
import { CategoriasContabeis } from 'src/app/core/categorias-contabeis';
import { ItensMovimentacoes } from 'src/app/core/itens-movimentacoes';
import { Material } from 'src/app/core/material';
import { Movimentacoes } from 'src/app/core/movimentacoes';
import { PlanosContas } from 'src/app/core/planos-contas';
import { TributoItemMovimentacao } from 'src/app/core/tributo-item-movimentacao';
import { Tributos } from 'src/app/core/tributos';
import { BroadcastEventService } from 'src/app/services/broadcast-event/broadcast-event.service';
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

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @Input() movimentacoes:Movimentacoes;
  @Input() perfilAcesso: Acesso;
  @Input() tributos: Tributos[];
  @Output() onItensInvalidos = new EventEmitter();


  mostrarTabela = false;
  msg: string = "Nenhum item movimentação adicionado";

  displayedColumns: string[] = ['categoriaContabil', 'quantidadeMaterial', 'valorUnitarioItem', 'valorTotalItem', 'acoes'];
  dataSource: MatTableDataSource<ItensMovimentacoes> = new MatTableDataSource();

  itensMovimentacoes: ItensMovimentacoes;

  openFormCadastro = false;
  isAtualizar = false;
  materiais: Material[];
  categorias: CategoriasContabeis[];
  planosContas: PlanosContas[];
  pedidosMateriais: PedidosMateriais[];

  valorItensSuperiorValorMovimento = false;

  constructor(
    private materialService: MaterialService,
    private categoriasContabeisService: CategoriasContabeisService,
    private pedidosMateriaisService: PedidosMateriaisService,
    private drc: ChangeDetectorRef,  
  ) { }

  ngOnInit() {
    this.initObjetos();

    this.materialService.getAllCombo().subscribe((materiais: Material[]) => {
      this.materiais = materiais;
    })

    this.categoriasContabeisService.getAllView(false).subscribe((planosContas: PlanosContas[]) => {
      this.planosContas = planosContas;
    })

    this.pedidosMateriaisService.getAllCombo().subscribe((pedidosMateriais: PedidosMateriais[]) => {
      this.pedidosMateriais = pedidosMateriais;
    })

    BroadcastEventService.get('ON_CARREGAR_MOVIMENTACOES').subscribe((movimentacao: Movimentacoes) => {
      this.carregarLista();
    })

  }

  ngAfterContentChecked(): void {
    this.drc.detectChanges();

    if(this.itensMovimentacoes.pedidosMateriais && this.itensMovimentacoes.pedidosMateriais.id) {
      this.selecionaPedidoMaterial(this.itensMovimentacoes.pedidosMateriais.id);
    }

    if(this.itensMovimentacoes.categoria && this.itensMovimentacoes.categoria.id) {
      this.selecionaRubrica(this.itensMovimentacoes.categoria.id);
    }

    if(this.itensMovimentacoes.categoriaAdicional && this.itensMovimentacoes.categoriaAdicional.id) {
      this.selecionaRubricaAdicional(this.itensMovimentacoes.categoriaAdicional.id);
    }

  }

  selecionaRubrica(id: number) {
    if(this.planosContas) {
      const registro = this.planosContas.find((reg: any) => reg.id === id);
      if (!!registro) {
        this.onValorRubricaChange(registro);
      }
    }
  }
  selecionaRubricaAdicional(id: number) {
    if(this.planosContas) {
      const registro = this.planosContas.find((reg: any) => reg.id === id);
      if (!!registro) {
        this.onValorRubricaAdicionalChange(registro);
      }
    }
  }

  selecionaPedidoMaterial(id: number) {
    if(this.pedidosMateriais) {
      const registro = this.pedidosMateriais.find((reg: any) => reg.id === id);
      if (!!registro) {
        this.onValorChange(registro);
      }
    }
  }

  onValorChange(registro) {
    this.itensMovimentacoes.pedidosMateriais = registro;
  }

  onValorRubricaChange(registro){
    this.itensMovimentacoes.categoria = registro;
  }
  onValorRubricaAdicionalChange(registro){
    this.itensMovimentacoes.categoriaAdicional = registro;
  }

  ngOnChanges(changes: SimpleChanges): void {
    //if (changes["movimentacoes.itensMovimentacoes"] && changes["movimentacoes.itensMovimentacoes"].currentValue) {
      this.carregarLista();
    //}
  }

  adicionar() {
    const contasCentrosCustoSelecionada = new ItensMovimentacoes();
    Object.assign(contasCentrosCustoSelecionada, this.itensMovimentacoes);

    this.getObjetosCompletosParaLista(contasCentrosCustoSelecionada);

    this.movimentacoes.itensMovimentacoes.push(contasCentrosCustoSelecionada);
    this.limpar();
    this.openFormCadastro = !this.openFormCadastro;
  }


  getObjetosCompletosParaLista(itensMovimentacoes: ItensMovimentacoes) {

    if(itensMovimentacoes.material && itensMovimentacoes.material.id) {
      itensMovimentacoes.material         = _.find(this.materiais, (m: Material) => m.id == itensMovimentacoes.material.id);
    }

    if(itensMovimentacoes.pedidosMateriais && itensMovimentacoes.pedidosMateriais.id) {
      itensMovimentacoes.pedidosMateriais = _.find(this.pedidosMateriais, (m: PedidosMateriais) => m.id == itensMovimentacoes.pedidosMateriais.id);
    }
    //itensMovimentacoes.categoria        = _.find(this.categorias, (m: CategoriasContabeis) => m.id == itensMovimentacoes.categoria.id);
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
    if (this.movimentacoes.itensMovimentacoes.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhum item movimentação adicionado.';
    } else {
      this.dataSource.data = this.movimentacoes.itensMovimentacoes ? this.movimentacoes.itensMovimentacoes : [];
      this.mostrarTabela = true;
    }
  }


  initObjetos() {
    this.itensMovimentacoes = new ItensMovimentacoes();
    this.itensMovimentacoes.categoria = new CategoriasContabeis();
    this.itensMovimentacoes.categoriaAdicional = new CategoriasContabeis();
    this.itensMovimentacoes.material = new Material();
    this.itensMovimentacoes.pedidosMateriais = new PedidosMateriais();
    this.itensMovimentacoes.quantidadeMaterial = 0;
    this.itensMovimentacoes.valorTotalItem = 0;
    this.itensMovimentacoes.valorUnitarioItem = 0;
  }

  deletar(itensMovimentacoes: ItensMovimentacoes): void {
    const index = this.movimentacoes.itensMovimentacoes.indexOf(this.movimentacoes.itensMovimentacoes.find(fi => fi === itensMovimentacoes));
    if (index >= 0) {
      this.movimentacoes.itensMovimentacoes.splice(index, 1);
      this.carregarLista();
    }
  }

  multiplicar(event) {
    this.itensMovimentacoes.valorUnitarioItem = event;

    this.itensMovimentacoes.valorTotalItem = this.itensMovimentacoes.valorUnitarioItem  * 
      this.itensMovimentacoes.quantidadeMaterial
  }

 multiplicarComQuantidade() {
    this.itensMovimentacoes.valorTotalItem = this.itensMovimentacoes.valorUnitarioItem  * this.itensMovimentacoes.quantidadeMaterial;
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
  
  getValorTotalItens() {
    this.valorItensSuperiorValorMovimento = false;

    if(this.movimentacoes.itensMovimentacoes && this.movimentacoes.itensMovimentacoes.length > 0) {
      const valorTotal = this.movimentacoes.itensMovimentacoes.map(v => v.valorTotalItem).reduce( (valor, total) => total += valor) 
      if(Number(valorTotal.toFixed(2)) != Number(this.movimentacoes.valorMovimentacao.toFixed(2))) {
        this.valorItensSuperiorValorMovimento = true;
      }
      this.onItensInvalidos.emit(this.valorItensSuperiorValorMovimento);
      return Number(valorTotal.toFixed(2));
    }

    this.onItensInvalidos.emit(this.valorItensSuperiorValorMovimento);
    return 0;
  }

  carregarContaContabil(event){
    if (event) {
      this.itensMovimentacoes.categoria = _.cloneDeep(_.find(this.planosContas,  (c) => c.id === event.id));
    } else {
      this.itensMovimentacoes.categoria = new CategoriasContabeis();
    }
  }
  carregarContaContabilAdicional(event){
    if (event) {
      this.itensMovimentacoes.categoriaAdicional = _.cloneDeep(_.find(this.planosContas,  (c) => c.id === event.id));
    } else {
      this.itensMovimentacoes.categoriaAdicional = new CategoriasContabeis();
    }
  }

  getRubricaPlanoConta(id): string {
    const registro = _.find(this.planosContas,  (c) => c.id === id);
    return registro ? registro.planoConta : "";
  }

  addTributo() {
    if (!this.itensMovimentacoes.tributos) {
      this.itensMovimentacoes.tributos = [];
    }

    const tributoMovimentacao:any      = new TributoItemMovimentacao();
    tributoMovimentacao.tributo        = new Tributos();
    tributoMovimentacao.idMovimentacao = this.movimentacoes.id;    
    tributoMovimentacao.id             = undefined;

    this.itensMovimentacoes.tributos.push(tributoMovimentacao);
  }

}
