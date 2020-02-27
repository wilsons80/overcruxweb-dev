import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { Acesso } from 'src/app/core/acesso';
import { Cargo } from 'src/app/core/cargo';
import { ComposicaoRhProjeto } from 'src/app/core/composicao-rh-projeto';
import { TiposContratacoes } from 'src/app/core/tipos-contratacoes';
import { CargosService } from 'src/app/services/cargos/cargos.service';
import { ComposicaoRhProjetoService } from 'src/app/services/composicao-rh-projeto/composicao-rh-projeto.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TiposContratacoesService } from '../../../../services/tipos-contratacoes/tipos-contratacoes.service';
import { ColaboradoresProjeto } from 'src/app/core/colaboradores-projeto';
import { Projeto } from 'src/app/core/projeto';

@Component({
  selector: 'composicao-rh-projeto',
  templateUrl: './composicao-rh-projeto.component.html',
  styleUrls: ['./composicao-rh-projeto.component.css']
})
export class ComposicaoRhProjetoComponent implements OnInit {

  @Input() listaComposicaoRhProjeto: ComposicaoRhProjeto[];
  @Input() projeto: Projeto;

  colaboradoresProjeto: ColaboradoresProjeto[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['cargo', 'tipoContratacao', 'qtd', 'acoes'];
  dataSource: MatTableDataSource<ComposicaoRhProjeto> = new MatTableDataSource();

  openFormCadastro = false;

  perfilAcesso: Acesso;

  isAtualizar = false;

  composicaoRhProjeto: ComposicaoRhProjeto;
  cargos: Cargo[] = [];
  listaTiposContratacoes: TiposContratacoes[] = [];


  constructor(
    private toastService: ToastService,
    private cargosService: CargosService,
    private activatedRoute: ActivatedRoute,
    private tiposContratacoesService: TiposContratacoesService,
    private composicaoRhProjetoService: ComposicaoRhProjetoService
  ) { }

  ngOnInit() {

    this.initObjetos();
    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];
    this.cargosService.getAll().subscribe((cargos: Cargo[]) => this.cargos = cargos);
    this.tiposContratacoesService.getAll().subscribe((tiposContratacoes: TiposContratacoes[]) => this.listaTiposContratacoes = tiposContratacoes);

  }
  initObjetos() {
    this.composicaoRhProjeto = new ComposicaoRhProjeto();
    this.composicaoRhProjeto.cargo = new Cargo();
    this.composicaoRhProjeto.tiposContratacoes = new TiposContratacoes();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["listaComposicaoRhProjeto"] && !_.isEmpty(changes["listaComposicaoRhProjeto"].currentValue)) {
      this.carregarLista();
    }
  }

  limpar() {
    this.initObjetos();
  }

  isJaAdicionada(): boolean {
    const unidadeAdicionada = this.listaComposicaoRhProjeto.find((cp: ComposicaoRhProjeto) => cp.cargo.id === this.composicaoRhProjeto.cargo.id);

    return !!unidadeAdicionada;

  }

  adicionar() {
    if (this.isJaAdicionada()) {
      this.toastService.showAlerta('Composição para esse cargo já adicionado');
      return;
    }

    const composicaoSelecionado = new ComposicaoRhProjeto();
    Object.assign(composicaoSelecionado, this.composicaoRhProjeto);

    this.getObjetosCompletosParaLista(composicaoSelecionado);

    this.listaComposicaoRhProjeto.push(composicaoSelecionado);
    this.composicaoRhProjetoService.composicaoRhProjetoChange.emit(this.listaComposicaoRhProjeto);
    this.limpar();
  }
  
  getObjetosCompletosParaLista(composicaoSelecionado:ComposicaoRhProjeto) {
    composicaoSelecionado.cargo = _.find(this.cargos, (cargo:Cargo) => cargo.id == composicaoSelecionado.cargo.id);
    composicaoSelecionado.tiposContratacoes = _.find(this.listaTiposContratacoes, (tiposContratacoes:TiposContratacoes) => tiposContratacoes.id == composicaoSelecionado.tiposContratacoes.id);
  }

  deletar(composicaoRhProjeto: ComposicaoRhProjeto): void {
    if (!this.verificaSeTemColaboradoresParaOCargo(composicaoRhProjeto)) {
      const index = this.listaComposicaoRhProjeto.indexOf(this.listaComposicaoRhProjeto.find(cp => cp.cargo.id === composicaoRhProjeto.cargo.id));
      if (index >= 0) {
        this.listaComposicaoRhProjeto.splice(index, 1);
        this.composicaoRhProjetoService.composicaoRhProjetoChange.emit(this.listaComposicaoRhProjeto);
        this.carregarLista();
      }
    } else {
      this.toastService.showAlerta(`Composição não pode excluída pois possui colaboradores vinculados ao cargo ${composicaoRhProjeto.cargo.nome}`)
    }

  }
  verificaSeTemColaboradoresParaOCargo(composicaoRhProjeto: ComposicaoRhProjeto) {
    const colaboradoresDaComposicao = _.find(this.projeto.colaboradoresProjeto, (colaborador: ColaboradoresProjeto) => colaborador.cargo.id == composicaoRhProjeto.cargo.id);
    if (colaboradoresDaComposicao) {
      return true;
    }
    return false;
  }

  novo() {
    this.isAtualizar = false;
    this.openFormCadastro = !this.openFormCadastro;
    this.limpar();
  }

  carregarLista() {
    if (this.listaComposicaoRhProjeto.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhum cargo adicionado.';
    } else {
      this.dataSource.data = this.listaComposicaoRhProjeto ? this.listaComposicaoRhProjeto : [];
      this.composicaoRhProjetoService.composicaoRhProjetoChange.emit(this.listaComposicaoRhProjeto);
      this.mostrarTabela = true;
    }
  }

  atualizarComposicao(composicaoRhProjeto: ComposicaoRhProjeto) {
    this.composicaoRhProjeto = composicaoRhProjeto;
    this.openFormCadastro = true;
    this.isAtualizar = true;

  }

  atualizar() {
    let composicaoRhProjeto: ComposicaoRhProjeto = _.find(this.listaComposicaoRhProjeto, (composicao: ComposicaoRhProjeto) => composicao.id == this.composicaoRhProjeto.id);
    if (this.verificaSeColaboradoresUltrapassaQuantidade(composicaoRhProjeto)) {
      this.toastService.showAlerta(`Para alterar para quantidade para ${composicaoRhProjeto.qtd} 
          é necessário retirar alguns colaboradores`)
    } else { 
    this.limpar();
    this.openFormCadastro = false;
    this.isAtualizar = false;
  }
}

verificaSeColaboradoresUltrapassaQuantidade(composicaoRhProjeto: ComposicaoRhProjeto) {
  const colaboradoresDaComposicao: ColaboradoresProjeto[] = _.filter(this.projeto.colaboradoresProjeto, (colaborador: ColaboradoresProjeto) => colaborador.cargo.id == composicaoRhProjeto.cargo.id);
  if (colaboradoresDaComposicao.length > composicaoRhProjeto.qtd) {
    return true;
  }
  return false;
}

}
