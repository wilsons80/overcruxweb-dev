import { ContasBancariaService } from './../../../services/contas-bancaria/contas-bancaria.service';
import { Component, OnInit, Input, ViewChild, SimpleChanges } from '@angular/core';
import { ContasCentrosCusto } from 'src/app/core/contas-centros-custo';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Funcoes } from 'src/app/core/funcoes';
import { Funcionario } from 'src/app/core/funcionario';
import { FuncoesInstituicao } from 'src/app/core/funcoes-instituicao';
import { Acesso } from 'src/app/core/acesso';
import { FuncionarioService } from 'src/app/services/funcionario/funcionario.service';
import { FuncoesService } from 'src/app/services/funcoes/funcoes.service';
import * as _ from 'lodash';
import { ContasBancaria } from 'src/app/core/contas-bancaria';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'contas-centros-custo',
  templateUrl: './contas-centros-custo.component.html',
  styleUrls: ['./contas-centros-custo.component.css']
})
export class ContasCentrosCustoComponent implements OnInit {

  @Input() listaContasCentrosCusto: ContasCentrosCusto[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  mostrarTabela = false;
  msg: string = "Nenhuma conta centro de custo adicionada";

  listaContasBancarias: ContasBancaria[]


  displayedColumns: string[] = ['banco','agencia','conta', 'acoes'];
  dataSource: MatTableDataSource<ContasCentrosCusto> = new MatTableDataSource();

  contasCentrosCusto: ContasCentrosCusto;

  perfilAcesso: Acesso;

  openFormCadastro = false;
  isAtualizar = false;


  constructor(

    private contasBancariaService: ContasBancariaService,
    private toastService:ToastService

  ) { }

  ngOnInit() {
    this.initObjetos();

    this.contasBancariaService.getAll().subscribe((listaContas: ContasBancaria[]) => {
      this.listaContasBancarias = listaContas;
    })

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["listaContasCentrosCusto"] && changes["listaContasCentrosCusto"].currentValue){
      this.carregarLista();
    }
  }

  adicionar() {
    if (this.isJaAdicionada()) {
      this.toastService.showAlerta('Conta já adicionada');
      return;
    }
    const contasCentrosCustoSelecionada = new ContasCentrosCusto();
    Object.assign(contasCentrosCustoSelecionada, this.contasCentrosCusto);
    
    this.getObjetosCompletosParaLista(contasCentrosCustoSelecionada);

    this.listaContasCentrosCusto.push(contasCentrosCustoSelecionada);
    this.limpar();
    this.openFormCadastro = !this.openFormCadastro;
  }

  isJaAdicionada(): boolean {
    const unidadeAdicionada = this.listaContasCentrosCusto.find((ccc: ContasCentrosCusto) => ccc.contasBancaria.id === this.contasCentrosCusto.contasBancaria.id);
    return !!unidadeAdicionada;
    
  }

  getObjetosCompletosParaLista(contasCentrosCusto:ContasCentrosCusto) {
    contasCentrosCusto.contasBancaria = _.find(this.listaContasBancarias, (c:ContasBancaria) => c.id == contasCentrosCusto.contasBancaria.id);
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



  atualizarFuncao(contasCentrosCusto: ContasCentrosCusto) {
    this.contasCentrosCusto = contasCentrosCusto;
    this.openFormCadastro = true;
    this.isAtualizar = true;

  }

  limpar() {
    this.initObjetos();
  }

  carregarLista() {
    if (this.listaContasCentrosCusto.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhuma conta adicionada.';
    } else {
      this.dataSource.data = this.listaContasCentrosCusto ? this.listaContasCentrosCusto : [];
      this.mostrarTabela = true;
    }
  }


  initObjetos() {
    this.contasCentrosCusto = new ContasCentrosCusto();
    this.contasCentrosCusto.contasBancaria = new ContasBancaria();
  }

  deletar(contasCentrosCusto: ContasCentrosCusto): void {
    const index = this.listaContasCentrosCusto.indexOf(this.listaContasCentrosCusto.find(fi => fi === contasCentrosCusto));
    if (index >= 0) {
      this.listaContasCentrosCusto.splice(index, 1);
      this.carregarLista();
    }
  }

  atualizarCentrosDeCusto(contasCentrosCusto: ContasCentrosCusto) {
    this.contasCentrosCusto = contasCentrosCusto;
    this.openFormCadastro = true;
    this.isAtualizar = true;

  }

}
