import { Component, OnInit, Input, ViewChild, SimpleChanges } from '@angular/core';
import { ColaboradoresPrograma } from 'src/app/core/colaboradores-programa';
import { Unidade } from 'src/app/core/unidade';
import { ComposicaoRhPrograma } from 'src/app/core/composicao-rh-programa';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


import { Acesso } from 'src/app/core/acesso';
import { Funcionario } from 'src/app/core/funcionario';
import { Cargo } from 'src/app/core/cargo';
import { Programa } from 'src/app/core/programa';
import { TiposContratacoes } from 'src/app/core/tipos-contratacoes';
import { ToastService } from 'src/app/services/toast/toast.service';
import { FuncionarioService } from 'src/app/services/funcionario/funcionario.service';
import { CargosService } from 'src/app/services/cargos/cargos.service';
import { ActivatedRoute } from '@angular/router';
import { TiposContratacoesService } from 'src/app/services/tipos-contratacoes/tipos-contratacoes.service';
import { UnidadeSelecionadaService } from 'src/app/services/unidadeSelecionada/unidade-selecionada.service';
import { ComposicaoRhProgramaService } from 'src/app/services/composicao-rh-programa/composicao-rh-programa.service';
import * as _ from 'lodash';


@Component({
  selector: 'colaboradores-programa',
  templateUrl: './colaboradores-programa.component.html',
  styleUrls: ['./colaboradores-programa.component.css']
})
export class ColaboradoresProgramaComponent implements OnInit {
  
  @Input() listaColaboradoresPrograma: ColaboradoresPrograma[];
  @Input() unidades: Unidade[];
  
  listaComposicaoRhPrograma: ComposicaoRhPrograma[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['nome', 'cpf', 'cargo', 'acoes'];
  dataSource: MatTableDataSource<ColaboradoresPrograma> = new MatTableDataSource();

  openFormCadastro = false;

  perfilAcesso: Acesso;

  isAtualizar = false;

  unidadesComboCadastro: any[];
  colaboradoresPrograma: ColaboradoresPrograma;
  funcionarios: Funcionario[] = [];
  cargos: Cargo[] =[];
  programas: Programa[] = [];
  listaTiposContratacoes: TiposContratacoes[] = [];
  composicaoSelecionada:ComposicaoRhPrograma;

  constructor(
    private toastService: ToastService,
    private funcionarioService: FuncionarioService,
    private cargosService: CargosService,
    private activatedRoute:ActivatedRoute,
    private tiposContratacoesService:TiposContratacoesService,
    private unidadeSelecionadaService:UnidadeSelecionadaService,
    private composicaoRhProgramaService:ComposicaoRhProgramaService
  ) { 

    this.unidadeSelecionadaService.unidadesSelecionadas.subscribe((unidades: Unidade[]) => {
      this.unidades = unidades
      this.getfuncionarios();
    })

  }

  ngOnInit() {

    this.initObjetos();

    this.composicaoRhProgramaService.composicaoRhProgramaChange.subscribe((listaComposicaoRhPrograma: ComposicaoRhPrograma[])=>{
      this.listaComposicaoRhPrograma = listaComposicaoRhPrograma;
      this.excluirFuncionarioDeComposicaoDeletada();
    })

    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];
    this.cargosService.getAll().subscribe((cargos: Cargo[]) => this.cargos = cargos);
    this.tiposContratacoesService.getAll().subscribe((tiposContratacoes: TiposContratacoes[]) => this.listaTiposContratacoes = tiposContratacoes);

  }
  
  initObjetos() {
    this.colaboradoresPrograma = new ColaboradoresPrograma();
    this.colaboradoresPrograma.cargo = new Cargo() ;
    this.colaboradoresPrograma.dataFim = null; 
    this.colaboradoresPrograma.dataInicio = null; 
    this.colaboradoresPrograma.funcionario = new Funcionario();
    this.colaboradoresPrograma.tiposContratacoes = new TiposContratacoes();
  }
  
  excluirFuncionarioDeComposicaoDeletada() {
    _.forEach(this.listaColaboradoresPrograma, (colaboradores:ColaboradoresPrograma) => {
      const composicaoAindaExiste = _.filter(this.listaComposicaoRhPrograma, (composicao:ComposicaoRhPrograma) => colaboradores.cargo.id == composicao.cargo.id);
      if(!composicaoAindaExiste){
        this.deletar(colaboradores);
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["listaColaboradoresPrograma"] && !_.isEmpty (changes["listaColaboradoresPrograma"].currentValue)){
      this.carregarLista();
    }
  }
  
  limpar() {
    this.initObjetos();
  }
  
  isJaAdicionada(): boolean {
    const unidadeAdicionada = this.listaColaboradoresPrograma.find((cp: ColaboradoresPrograma) => cp.funcionario.id === this.colaboradoresPrograma.funcionario.id);
    
    return !!unidadeAdicionada;
    
  }

  isNumeroMaximoDeColaboradoresExcedido() {
    const listaJaPreenchidaColaboradoresCargo = _.filter(this.listaColaboradoresPrograma, (colaborador:ColaboradoresPrograma) => colaborador.cargo.id == this.colaboradoresPrograma.cargo.id);
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
      this.toastService.showAlerta(`Número máximo(${this.composicaoSelecionada.qtd}) de funcionários excedido para o cargo ${this.colaboradoresPrograma.cargo.nome}`);
      return;
    }
    
    const colaboradorSelecionado = new ColaboradoresPrograma();
    Object.assign(colaboradorSelecionado, this.colaboradoresPrograma);
    
    this.getObjetosCompletosParaLista(colaboradorSelecionado);

    this.listaColaboradoresPrograma.push(colaboradorSelecionado);
    this.limpar();
  }

  getObjetosCompletosParaLista(colaboradoresPrograma:ColaboradoresPrograma) {
    colaboradoresPrograma.cargo = _.find(this.cargos, (cargo:Cargo) => cargo.id == colaboradoresPrograma.cargo.id);
    colaboradoresPrograma.funcionario = _.find(this.funcionarios, (funcionario:Funcionario) => funcionario.id == colaboradoresPrograma.funcionario.id);
  }

  
  deletar(colaboradoresPrograma: ColaboradoresPrograma): void {
    const index = this.listaColaboradoresPrograma.indexOf(this.listaColaboradoresPrograma.find(cp => cp.funcionario.id === colaboradoresPrograma.funcionario.id));
    if (index >= 0) {
      this.listaColaboradoresPrograma.splice(index, 1);
      this.carregarLista();
    }
  }
  
  novo() {
    this.isAtualizar = false;
    this.openFormCadastro = !this.openFormCadastro;
    this.limpar();
  }
  
  carregarLista() {
    if (this.listaColaboradoresPrograma.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhuma colaborador adicionado.';
    } else {
      this.dataSource.data = this.listaColaboradoresPrograma ? this.listaColaboradoresPrograma : [];
      this.mostrarTabela = true;
    }
  }
  
  isDesabilitado(){
    return !this.colaboradoresPrograma.funcionario || !this.colaboradoresPrograma.cargo
    || !this.colaboradoresPrograma.dataInicio || !this.colaboradoresPrograma.programa
  }
  
  getfuncionarios() {
    const idsUnidades:number[] = this.unidades.map((u:Unidade) => u.idUnidade);
    this.funcionarioService.getAllByCombo().subscribe((funcionarios:Funcionario[]) => {
      this.funcionarios = funcionarios;      
    })
  }

  verificaComposicaoCargo(){
    if(this.colaboradoresPrograma.cargo ){
      this.composicaoSelecionada = _.find(this.listaComposicaoRhPrograma , c => c.cargo.id === this.colaboradoresPrograma.cargo.id);
      if(!this.composicaoSelecionada){
        this.toastService.showAlerta(`Não existe nenhuma composição definida para o cargo escolhido`);
        const novoCargo = new Cargo();
        novoCargo.id = null;
        this.colaboradoresPrograma.cargo = novoCargo;
      }
    }

  }

  atualizarColaborador(colaboradoresPrograma: ColaboradoresPrograma) {
    this.preencherObjetosVazios(colaboradoresPrograma);
    this.colaboradoresPrograma = colaboradoresPrograma;
    this.openFormCadastro = true;
    this.isAtualizar = true;

  }

  preencherObjetosVazios(colaboradoresPrograma: ColaboradoresPrograma) {
    if(!colaboradoresPrograma.tiposContratacoes){
      colaboradoresPrograma.tiposContratacoes = new TiposContratacoes();
    }
  }

  atualizar() {
    this.limpar();
    this.openFormCadastro = false;
    this.isAtualizar = false;
}

}
