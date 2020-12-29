import { Component, OnInit, Input, ViewChild, SimpleChanges } from '@angular/core';
import { ColaboradoresProjeto } from 'src/app/core/colaboradores-projeto';
import { Unidade } from 'src/app/core/unidade';
import { ComposicaoRhProjeto } from 'src/app/core/composicao-rh-projeto';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Acesso } from 'src/app/core/acesso';
import { Funcionario } from 'src/app/core/funcionario';
import { Cargo } from 'src/app/core/cargo';
import { Projeto } from 'src/app/core/projeto';
import { TiposContratacoes } from 'src/app/core/tipos-contratacoes';
import { ToastService } from 'src/app/services/toast/toast.service';
import { FuncionarioService } from 'src/app/services/funcionario/funcionario.service';
import { CargosService } from 'src/app/services/cargos/cargos.service';
import { ActivatedRoute } from '@angular/router';
import { TiposContratacoesService } from 'src/app/services/tipos-contratacoes/tipos-contratacoes.service';
import { UnidadeSelecionadaService } from 'src/app/services/unidadeSelecionada/unidade-selecionada.service';
import { ComposicaoRhProjetoService } from 'src/app/services/composicao-rh-projeto/composicao-rh-projeto.service';
import * as _ from 'lodash';


@Component({
  selector: 'colaboradores-projeto',
  templateUrl: './colaboradores-projeto.component.html',
  styleUrls: ['./colaboradores-projeto.component.css']
})
export class ColaboradoresProjetoComponent implements OnInit {
  
  @Input() listaColaboradoresProjeto: ColaboradoresProjeto[];
  @Input() unidades: Unidade[];
  
  listaComposicaoRhProjeto: ComposicaoRhProjeto[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['nome', 'cpf', 'cargo', 'acoes'];
  dataSource: MatTableDataSource<ColaboradoresProjeto> = new MatTableDataSource();

  openFormCadastro = false;

  perfilAcesso: Acesso;

  isAtualizar = false;

  unidadesComboCadastro: any[];
  colaboradoresProjeto: ColaboradoresProjeto;
  funcionarios: Funcionario[] = [];
  cargos: Cargo[] =[];
  projetos: Projeto[] = [];
  listaTiposContratacoes: TiposContratacoes[] = [];
  composicaoSelecionada:ComposicaoRhProjeto;

  constructor(
    private toastService: ToastService,
    private funcionarioService: FuncionarioService,
    private cargosService: CargosService,
    private activatedRoute:ActivatedRoute,
    private tiposContratacoesService:TiposContratacoesService,
    private unidadeSelecionadaService:UnidadeSelecionadaService,
    private composicaoRhProjetoService:ComposicaoRhProjetoService
  ) { 

    this.unidadeSelecionadaService.unidadesSelecionadas.subscribe((unidades: Unidade[]) => {
      this.unidades = unidades
      this.getfuncionarios();
    })

  }

  ngOnInit() {

    this.initObjetos();

    this.composicaoRhProjetoService.composicaoRhProjetoChange.subscribe((listaComposicaoRhProjeto: ComposicaoRhProjeto[])=>{
      this.listaComposicaoRhProjeto = listaComposicaoRhProjeto;
      this.excluirFuncionarioDeComposicaoDeletada();
    })

    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];
    this.cargosService.getAll().subscribe((cargos: Cargo[]) => this.cargos = cargos);
    this.tiposContratacoesService.getAll().subscribe((tiposContratacoes: TiposContratacoes[]) => this.listaTiposContratacoes = tiposContratacoes);

  }
  
  initObjetos() {
    this.colaboradoresProjeto = new ColaboradoresProjeto();
    this.colaboradoresProjeto.cargo = new Cargo() ;
    this.colaboradoresProjeto.dataFim = null; 
    this.colaboradoresProjeto.dataInicio = null; 
    this.colaboradoresProjeto.funcionario = new Funcionario();
    this.colaboradoresProjeto.tiposContratacoes = new TiposContratacoes();
  }
  
  excluirFuncionarioDeComposicaoDeletada() {
    _.forEach(this.listaColaboradoresProjeto, (colaboradores:ColaboradoresProjeto) => {
      const composicaoAindaExiste = _.filter(this.listaComposicaoRhProjeto, (composicao:ComposicaoRhProjeto) => colaboradores.cargo.id == composicao.cargo.id);
      if(!composicaoAindaExiste){
        this.deletar(colaboradores);
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["listaColaboradoresProjeto"] && !_.isEmpty (changes["listaColaboradoresProjeto"].currentValue)){
      this.carregarLista();
    }
  }
  
  limpar() {
    this.initObjetos();
  }
  
  isJaAdicionada(): boolean {
    const unidadeAdicionada = this.listaColaboradoresProjeto.find((cp: ColaboradoresProjeto) => cp.funcionario.id === this.colaboradoresProjeto.funcionario.id);
    
    return !!unidadeAdicionada;
    
  }

  isNumeroMaximoDeColaboradoresExcedido() {
    const listaJaPreenchidaColaboradoresCargo = _.filter(this.listaColaboradoresProjeto, (colaborador:ColaboradoresProjeto) => colaborador.cargo.id == this.colaboradoresProjeto.cargo.id);
    if(listaJaPreenchidaColaboradoresCargo.length === this.composicaoSelecionada.qtd){
      return true;
    }
  
    return false;
  }
  
  adicionar() {
    if (this.isJaAdicionada()) {
      this.toastService.showAlerta('Colaborador já adicionado');
      return;
    }

    if (this.isNumeroMaximoDeColaboradoresExcedido()) {
      this.toastService.showAlerta(`Número máximo(${this.composicaoSelecionada.qtd}) de funcionários excedido para o cargo ${this.colaboradoresProjeto.cargo.nome}`);
      return;
    }
    
    const colaboradorSelecionado = new ColaboradoresProjeto();
    Object.assign(colaboradorSelecionado, this.colaboradoresProjeto);
    
    this.getObjetosCompletosParaLista(colaboradorSelecionado);

    this.listaColaboradoresProjeto.push(colaboradorSelecionado);
    this.limpar();
  }

  getObjetosCompletosParaLista(colaboradoresProjeto:ColaboradoresProjeto) {
    colaboradoresProjeto.cargo = _.find(this.cargos, (cargo:Cargo) => cargo.id == colaboradoresProjeto.cargo.id);
    colaboradoresProjeto.funcionario = _.find(this.funcionarios, (funcionario:Funcionario) => funcionario.id == colaboradoresProjeto.funcionario.id);
  }

  
  deletar(colaboradoresProjeto: ColaboradoresProjeto): void {
    const index = this.listaColaboradoresProjeto.indexOf(this.listaColaboradoresProjeto.find(cp => cp.funcionario.id === colaboradoresProjeto.funcionario.id));
    if (index >= 0) {
      this.listaColaboradoresProjeto.splice(index, 1);
      this.carregarLista();
    }
  }
  
  novo() {
    this.isAtualizar = false;
    this.openFormCadastro = !this.openFormCadastro;
    this.limpar();
  }
  
  carregarLista() {
    if (this.listaColaboradoresProjeto.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhuma colaborador adicionado.';
    } else {
      this.dataSource.data = this.listaColaboradoresProjeto ? this.listaColaboradoresProjeto : [];
      this.mostrarTabela = true;
    }
  }
  
  isDesabilitado(){
    return !this.colaboradoresProjeto.funcionario || !this.colaboradoresProjeto.cargo
    || !this.colaboradoresProjeto.dataInicio || !this.colaboradoresProjeto.projeto
  }
  
  getfuncionarios() {
    const idsUnidades:number[] = this.unidades.map((u:Unidade) => u.idUnidade);
    this.funcionarioService.getAllByCombo().subscribe((funcionarios:Funcionario[]) => {
      this.funcionarios = funcionarios;
      
    })
  }

  verificaComposicaoCargo(){
    if(this.colaboradoresProjeto.cargo ){
      this.composicaoSelecionada = _.find(this.listaComposicaoRhProjeto , c => c.cargo.id === this.colaboradoresProjeto.cargo.id);
      if(!this.composicaoSelecionada){
        this.toastService.showAlerta(`Não existe nenhuma composição definida para o cargo escolhido`);
        const novoCargo = new Cargo();
        novoCargo.id = null;
        this.colaboradoresProjeto.cargo = novoCargo;
      }
    }

  }

  atualizarColaborador(colaboradoresProjeto: ColaboradoresProjeto) {
    this.preencherObjetosVazios(colaboradoresProjeto);
    this.colaboradoresProjeto = colaboradoresProjeto;
    this.openFormCadastro = true;
    this.isAtualizar = true;

  }

  preencherObjetosVazios(colaboradoresProjeto: ColaboradoresProjeto) {
    if(!colaboradoresProjeto.tiposContratacoes){
      colaboradoresProjeto.tiposContratacoes = new TiposContratacoes();
    }
  }

  atualizar() {
    this.limpar();
    this.openFormCadastro = false;
    this.isAtualizar = false;
}

}
