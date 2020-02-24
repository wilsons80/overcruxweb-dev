import { EstoquesService } from 'src/app/services/estoques/estoques.service';
import { ItensMovimentacoesService } from './../../../../services/itens-movimentacoes/itens-movimentacoes.service';
import { ItensMovimentacoes } from 'src/app/core/itens-movimentacoes';
import { ItensPedidosMateriaisService } from './../../../../services/itens-pedidos-materiais/itens-pedidos-materiais.service';
import { FuncionarioService } from 'src/app/services/funcionario/funcionario.service';
import { ItensMovimentacoesMateriais } from './../../../../core/itens-movimentacoes-materiais';
import { Component, OnInit, Input, ViewChild, SimpleChanges } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Acesso } from 'src/app/core/acesso';
import { Material } from 'src/app/core/material';
import { CategoriasContabeis } from 'src/app/core/categorias-contabeis';
import { PedidosMateriais } from 'src/app/core/pedidos-materiais';
import { MaterialService } from 'src/app/services/material/material.service';
import { CategoriasContabeisService } from 'src/app/services/categorias-contabeis/categorias-contabeis.service';
import { PedidosMateriaisService } from 'src/app/services/pedidosMateriais/pedidos-materiais.service';
import * as _ from 'lodash';
import { Funcionario } from 'src/app/core/funcionario';
import { ItensPedidosMateriais } from 'src/app/core/itens-pedidos-materiais';
import { Estoques } from 'src/app/core/estoques';

@Component({
  selector: 'itens-movimentacoes-materiais',
  templateUrl: './itens-movimentacoes-materiais.component.html',
  styleUrls: ['./itens-movimentacoes-materiais.component.css']
})
export class ItensMovimentacoesMateriaisComponent implements OnInit {

  @Input() listaItensMovimentacoesMateriais: ItensMovimentacoesMateriais[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  mostrarTabela = false;
  msg = "Nenhum item movimentação material adicionado";



  displayedColumns: string[] = ['material','quantidade','data', 'acoes'];
  dataSource: MatTableDataSource<ItensMovimentacoesMateriais> = new MatTableDataSource();

  itensMovimentacoesMateriais: ItensMovimentacoesMateriais;

  perfilAcesso: Acesso;

  openFormCadastro = false;
  isAtualizar = false;
  materiais: Material[];
  categorias: CategoriasContabeis[];
  pedidosMateriais: PedidosMateriais[];
  funcionarios: Funcionario[];
  itensPedidosMateriais: ItensPedidosMateriais[];
  itensMovimentacoes: ItensMovimentacoes[];
  estoques: Estoques[];


  constructor(

    private materialService: MaterialService,
    private funcionarioService:FuncionarioService,
    private itensPedidosMateriaisService:ItensPedidosMateriaisService,
    private itensMovimentacoesService:ItensMovimentacoesService,
    private estoquesService:EstoquesService
  ) { }

  ngOnInit() {
    this.initObjetos();

    this.materialService.getAllCombo().subscribe((materiais: Material[]) => {
      this.materiais = materiais;
    })

    this.funcionarioService.getAllCombo().subscribe((funcionarios:Funcionario[]) => {
      this.funcionarios = funcionarios;
    });
    
    this.itensPedidosMateriaisService.getAllCombo().subscribe((itensPedidosMateriais:ItensPedidosMateriais[]) => {
      this.itensPedidosMateriais = itensPedidosMateriais;
    });
   
    this.itensMovimentacoesService.getAllCombo().subscribe((itensMovimentacoes:ItensMovimentacoes[]) => {
      this.itensMovimentacoes = itensMovimentacoes;
    });
   
    this.estoquesService.getAllCombo().subscribe((estoques:Estoques[]) => {
      this.estoques = estoques;
    });

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["listaItensMovimentacoesMateriais"] && changes["listaItensMovimentacoesMateriais"].currentValue) {
      this.carregarLista();
    }
  }

  adicionar() {
    const contasCentrosCustoSelecionada = new ItensMovimentacoesMateriais();
    Object.assign(contasCentrosCustoSelecionada, this.itensMovimentacoesMateriais);

    this.getObjetosCompletosParaLista(contasCentrosCustoSelecionada);

    this.listaItensMovimentacoesMateriais.push(contasCentrosCustoSelecionada);
    this.limpar();
    this.openFormCadastro = !this.openFormCadastro;
  }


  getObjetosCompletosParaLista(itensMovimentacoesMateriais: ItensMovimentacoesMateriais) {
    itensMovimentacoesMateriais.material = _.find(this.materiais, (m: Material) => m.id == itensMovimentacoesMateriais.material.id);
    itensMovimentacoesMateriais.funcionarioEnvio = _.find(this.funcionarios, (m: Funcionario) => m.id == itensMovimentacoesMateriais.funcionarioEnvio.id);
    itensMovimentacoesMateriais.funcionarioRecebe = _.find(this.funcionarios, (m: Funcionario) => m.id == itensMovimentacoesMateriais.funcionarioRecebe.id);
    itensMovimentacoesMateriais.itensMovimentacoes = _.find(this.itensMovimentacoes, (m: ItensMovimentacoes) => m.id == itensMovimentacoesMateriais.itensMovimentacoes.id);
    itensMovimentacoesMateriais.itensPedidosMateriais = _.find(this.itensPedidosMateriais, (m: ItensPedidosMateriais) => m.id == itensMovimentacoesMateriais.itensPedidosMateriais.id);
    itensMovimentacoesMateriais.estoque = _.find(this.estoques, (m: Estoques) => m.id == itensMovimentacoesMateriais.estoque.id);
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



  atualizarFuncao(itensMovimentacoesMateriais: ItensMovimentacoesMateriais) {
    this.itensMovimentacoesMateriais = itensMovimentacoesMateriais;
    this.openFormCadastro = true;
    this.isAtualizar = true;

  }

  limpar() {
    this.initObjetos();
  }

  carregarLista() {
    if (this.listaItensMovimentacoesMateriais.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhum item movimentação material adicionado.';
    } else {
      this.dataSource.data = this.listaItensMovimentacoesMateriais ? this.listaItensMovimentacoesMateriais : [];
      this.mostrarTabela = true;
    }
  }


  initObjetos() {
    this.itensMovimentacoesMateriais = new ItensMovimentacoesMateriais();
    this.itensMovimentacoesMateriais.material = new Material();
    this.itensMovimentacoesMateriais.estoque = new Estoques();
    this.itensMovimentacoesMateriais.funcionarioEnvio = new Funcionario();
    this.itensMovimentacoesMateriais.funcionarioRecebe = new Funcionario();
    this.itensMovimentacoesMateriais.itensMovimentacoes = new ItensMovimentacoes();
    this.itensMovimentacoesMateriais.itensPedidosMateriais = new ItensPedidosMateriais();
    this.itensMovimentacoesMateriais.quantidadeMaterial = 0;
  }

  deletar(itensMovimentacoesMateriais: ItensMovimentacoesMateriais): void {
    const index = this.listaItensMovimentacoesMateriais.indexOf(this.listaItensMovimentacoesMateriais.find(fi => fi === itensMovimentacoesMateriais));
    if (index >= 0) {
      this.listaItensMovimentacoesMateriais.splice(index, 1);
      this.carregarLista();
    }
  }


  atualizarRegistro(itensMovimentacoesMateriais: ItensMovimentacoesMateriais) {
    this.preencherObjetosVazios(itensMovimentacoesMateriais);
    this.itensMovimentacoesMateriais = itensMovimentacoesMateriais;
    this.openFormCadastro = true;
    this.isAtualizar = true;
  }

  preencherObjetosVazios(itensMovimentacoesMateriais: ItensMovimentacoesMateriais){
    if(!itensMovimentacoesMateriais.material){
      itensMovimentacoesMateriais.material = new Material();
    }

    if(!itensMovimentacoesMateriais.estoque){
      itensMovimentacoesMateriais.estoque = new Estoques();
    }
   
    if(!itensMovimentacoesMateriais.funcionarioEnvio){
      itensMovimentacoesMateriais.funcionarioEnvio = new Funcionario();
    }
    
    if(!itensMovimentacoesMateriais.funcionarioRecebe){
      itensMovimentacoesMateriais.funcionarioRecebe = new Funcionario();
    }
   
    if(!itensMovimentacoesMateriais.itensMovimentacoes){
      itensMovimentacoesMateriais.itensMovimentacoes = new ItensMovimentacoes();
    }
   
    if(!itensMovimentacoesMateriais.itensPedidosMateriais){
      itensMovimentacoesMateriais.itensPedidosMateriais = new ItensPedidosMateriais();
    }

  }
}
