import { Component, OnInit, Input, ViewChild, SimpleChanges } from '@angular/core';
import { ItensPedidosMateriais } from 'src/app/core/itens-pedidos-materiais';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Acesso } from 'src/app/core/acesso';
import { Material } from 'src/app/core/material';
import { CategoriasContabeis } from 'src/app/core/categorias-contabeis';
import { PedidosMateriais } from 'src/app/core/pedidos-materiais';
import { Funcionario } from 'src/app/core/funcionario';
import { ItensMovimentacoes } from 'src/app/core/itens-movimentacoes';
import { Estoques } from 'src/app/core/estoques';
import { MaterialService } from 'src/app/services/material/material.service';
import { FuncionarioService } from 'src/app/services/funcionario/funcionario.service';
import { ItensPedidosMateriaisService } from 'src/app/services/itens-pedidos-materiais/itens-pedidos-materiais.service';
import { ItensMovimentacoesService } from 'src/app/services/itens-movimentacoes/itens-movimentacoes.service';
import { EstoquesService } from 'src/app/services/estoques/estoques.service';
import * as _ from 'lodash';

@Component({
  selector: 'itens-pedidos-materiais',
  templateUrl: './itens-pedidos-materiais.component.html',
  styleUrls: ['./itens-pedidos-materiais.component.css']
})
export class ItensPedidosMateriaisComponent implements OnInit {

  @Input() listaItensPedidosMateriais: ItensPedidosMateriais[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  mostrarTabela = false;
  msg: string = "Nenhum item adicionado";



  displayedColumns: string[] = ['material','quantidade', 'acoes'];
  dataSource: MatTableDataSource<ItensPedidosMateriais> = new MatTableDataSource();

  itensPedidosMateriais: ItensPedidosMateriais;

  perfilAcesso: Acesso;

  openFormCadastro = false;
  isAtualizar = false;
  materiais: Material[];


  constructor(

    private materialService: MaterialService,
  ) { }

  ngOnInit() {
    this.initObjetos();

    this.materialService.getAllCombo().subscribe((materiais: Material[]) => {
      this.materiais = materiais;
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["listaItensPedidosMateriais"] && changes["listaItensPedidosMateriais"].currentValue) {
      this.carregarLista();
    }
  }

  adicionar() {
    const contasCentrosCustoSelecionada = new ItensPedidosMateriais();
    Object.assign(contasCentrosCustoSelecionada, this.itensPedidosMateriais);

    this.getObjetosCompletosParaLista(contasCentrosCustoSelecionada);

    this.listaItensPedidosMateriais.push(contasCentrosCustoSelecionada);
    this.limpar();
    this.openFormCadastro = !this.openFormCadastro;
  }


  getObjetosCompletosParaLista(itensPedidosMateriais: ItensPedidosMateriais) {
    itensPedidosMateriais.material = _.find(this.materiais, (m: Material) => m.id == itensPedidosMateriais.material.id);
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



  atualizarFuncao(itensPedidosMateriais: ItensPedidosMateriais) {
    this.itensPedidosMateriais = itensPedidosMateriais;
    this.openFormCadastro = true;
    this.isAtualizar = true;

  }

  limpar() {
    this.initObjetos();
  }

  carregarLista() {
    if (this.listaItensPedidosMateriais.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhum item adicionado.';
    } else {
      this.dataSource.data = this.listaItensPedidosMateriais ? this.listaItensPedidosMateriais : [];
      this.mostrarTabela = true;
    }
  }


  initObjetos() {
    this.itensPedidosMateriais = new ItensPedidosMateriais();
    this.itensPedidosMateriais.material = new Material();
  }

  deletar(itensPedidosMateriais: ItensPedidosMateriais): void {
    const index = this.listaItensPedidosMateriais.indexOf(this.listaItensPedidosMateriais.find(fi => fi === itensPedidosMateriais));
    if (index >= 0) {
      this.listaItensPedidosMateriais.splice(index, 1);
      this.carregarLista();
    }
  }


  atualizarRegistro(itensPedidosMateriais: ItensPedidosMateriais) {
    this.preencherObjetosVazios(itensPedidosMateriais);
    this.itensPedidosMateriais = itensPedidosMateriais;
    this.openFormCadastro = true;
    this.isAtualizar = true;
  }

  preencherObjetosVazios(itensPedidosMateriais: ItensPedidosMateriais){
    if(!itensPedidosMateriais.material){
      itensPedidosMateriais.material = new Material();
    }
  }
}
