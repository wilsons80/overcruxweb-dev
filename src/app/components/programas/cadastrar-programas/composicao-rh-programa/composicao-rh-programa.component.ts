import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { Acesso } from 'src/app/core/acesso';
import { Cargo } from 'src/app/core/cargo';
import { ComposicaoRhPrograma } from 'src/app/core/composicao-rh-programa';
import { TiposContratacoes } from 'src/app/core/tipos-contratacoes';
import { CargosService } from 'src/app/services/cargos/cargos.service';
import { ComposicaoRhProgramaService } from 'src/app/services/composicao-rh-programa/composicao-rh-programa.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TiposContratacoesService } from '../../../../services/tipos-contratacoes/tipos-contratacoes.service';
import { ColaboradoresPrograma } from 'src/app/core/colaboradores-programa';
import { Programa } from 'src/app/core/programa';

@Component({
  selector: 'composicao-rh-programa',
  templateUrl: './composicao-rh-programa.component.html',
  styleUrls: ['./composicao-rh-programa.component.css']
})
export class ComposicaoRhProgramaComponent implements OnInit {

  @Input() listaComposicaoRhPrograma: ComposicaoRhPrograma[];
  @Input() programa: Programa;

  colaboradoresPrograma: ColaboradoresPrograma[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['cargo', 'tipoContratacao', 'qtd', 'acoes'];
  dataSource: MatTableDataSource<ComposicaoRhPrograma> = new MatTableDataSource();

  openFormCadastro = false;

  perfilAcesso: Acesso;

  isAtualizar = false;

  composicaoRhPrograma: ComposicaoRhPrograma;
  cargos: Cargo[] = [];
  listaTiposContratacoes: TiposContratacoes[] = [];


  constructor(
    private toastService: ToastService,
    private cargosService: CargosService,
    private activatedRoute: ActivatedRoute,
    private tiposContratacoesService: TiposContratacoesService,
    private composicaoRhProgramaService: ComposicaoRhProgramaService
  ) { }

  ngOnInit() {

    this.initObjetos();
    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];
    this.cargosService.getAll().subscribe((cargos: Cargo[]) => this.cargos = cargos);
    this.tiposContratacoesService.getAll().subscribe((tiposContratacoes: TiposContratacoes[]) => this.listaTiposContratacoes = tiposContratacoes);

  }
  initObjetos() {
    this.composicaoRhPrograma = new ComposicaoRhPrograma();
    this.composicaoRhPrograma.cargo = new Cargo();
    this.composicaoRhPrograma.tiposContratacoes = new TiposContratacoes();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["listaComposicaoRhPrograma"] && !_.isEmpty(changes["listaComposicaoRhPrograma"].currentValue)) {
      this.carregarLista();
    }
  }

  limpar() {
    this.initObjetos();
  }

  isJaAdicionada(): boolean {
    const unidadeAdicionada = this.listaComposicaoRhPrograma.find((cp: ComposicaoRhPrograma) => cp.cargo.id === this.composicaoRhPrograma.cargo.id);

    return !!unidadeAdicionada;

  }

  adicionar() {
    if (this.isJaAdicionada()) {
      this.toastService.showAlerta('Composição para esse cargo já adicionado');
      return;
    }

    const composicaoSelecionado = new ComposicaoRhPrograma();
    Object.assign(composicaoSelecionado, this.composicaoRhPrograma);

    this.getObjetosCompletosParaLista(composicaoSelecionado);

    this.listaComposicaoRhPrograma.push(composicaoSelecionado);
    this.composicaoRhProgramaService.composicaoRhProgramaChange.emit(this.listaComposicaoRhPrograma);
    this.limpar();
  }
  
  getObjetosCompletosParaLista(composicaoSelecionado:ComposicaoRhPrograma) {
    composicaoSelecionado.cargo = _.find(this.cargos, (cargo:Cargo) => cargo.id == composicaoSelecionado.cargo.id);
    composicaoSelecionado.tiposContratacoes = _.find(this.listaTiposContratacoes, (tiposContratacoes:TiposContratacoes) => tiposContratacoes.id == composicaoSelecionado.tiposContratacoes.id);
  }

  deletar(composicaoRhPrograma: ComposicaoRhPrograma): void {
    if (!this.verificaSeTemColaboradoresParaOCargo(composicaoRhPrograma)) {
      const index = this.listaComposicaoRhPrograma.indexOf(this.listaComposicaoRhPrograma.find(cp => cp.cargo.id === composicaoRhPrograma.cargo.id));
      if (index >= 0) {
        this.listaComposicaoRhPrograma.splice(index, 1);
        this.composicaoRhProgramaService.composicaoRhProgramaChange.emit(this.listaComposicaoRhPrograma);
        this.carregarLista();
      }
    } else {
      this.toastService.showAlerta(`Composição não pode excluída pois possui colaboradores vinculados ao cargo ${composicaoRhPrograma.cargo.nome}`)
    }

  }
  verificaSeTemColaboradoresParaOCargo(composicaoRhPrograma: ComposicaoRhPrograma) {
    const colaboradoresDaComposicao = _.find(this.programa.colaboradoresPrograma, (colaborador: ColaboradoresPrograma) => colaborador.cargo.id == composicaoRhPrograma.cargo.id);
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
    if (this.listaComposicaoRhPrograma.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhum cargo adicionado.';
    } else {
      this.dataSource.data = this.listaComposicaoRhPrograma ? this.listaComposicaoRhPrograma : [];
      this.composicaoRhProgramaService.composicaoRhProgramaChange.emit(this.listaComposicaoRhPrograma);
      this.mostrarTabela = true;
    }
  }

  atualizarComposicao(composicaoRhPrograma: ComposicaoRhPrograma) {
    this.composicaoRhPrograma = composicaoRhPrograma;
    this.openFormCadastro = true;
    this.isAtualizar = true;

  }

  atualizar() {
    let composicaoRhPrograma: ComposicaoRhPrograma = _.find(this.listaComposicaoRhPrograma, (composicao: ComposicaoRhPrograma) => composicao.id == this.composicaoRhPrograma.id);
    if (this.verificaSeColaboradoresUltrapassaQuantidade(composicaoRhPrograma)) {
      this.toastService.showAlerta(`Para alterar para quantidade para ${composicaoRhPrograma.qtd} 
          é necessário retirar alguns colaboradores`)
    } else { 
    this.limpar();
    this.openFormCadastro = false;
    this.isAtualizar = false;
  }
}

verificaSeColaboradoresUltrapassaQuantidade(composicaoRhPrograma: ComposicaoRhPrograma) {
  const colaboradoresDaComposicao: ColaboradoresPrograma[] = _.filter(this.programa.colaboradoresPrograma, (colaborador: ColaboradoresPrograma) => colaborador.cargo.id == composicaoRhPrograma.cargo.id);
  if (colaboradoresDaComposicao.length > composicaoRhPrograma.qtd) {
    return true;
  }
  return false;
}

}
