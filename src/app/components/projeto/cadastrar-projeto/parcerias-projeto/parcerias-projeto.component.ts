import { EmpresaService } from 'src/app/services/empresa/empresa.service';
import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { Acesso } from 'src/app/core/acesso';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ParceriasProjeto } from 'src/app/core/parcerias-projeto';
import { Empresa } from 'src/app/core/empresa';
import { NovoObjetoService } from 'src/app/services/novo-objeto/novo-objeto.service';

@Component({
  selector: 'parcerias-projeto',
  templateUrl: './parcerias-projeto.component.html',
  styleUrls: ['./parcerias-projeto.component.css']
})
export class ParceriasProjetoComponent implements OnInit {

  @Input() listaParceiros: ParceriasProjeto[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['codigo', 'nomeRazaoSocial', 'cnpj', 'acoes'];
  dataSource: MatTableDataSource<ParceriasProjeto> = new MatTableDataSource();

  openFormCadastro = false;

  perfilAcesso: Acesso;

  isAtualizar = false;

  parceriasProjeto: ParceriasProjeto;
  empresas: Empresa[];

  constructor(
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private empresaService: EmpresaService,
    private novoObjetoService:NovoObjetoService
  ) {

  }

  ngOnInit() {

    this.initObjetos();

    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];
    this.empresaService.getAll().subscribe((empresas: Empresa[]) => this.empresas = empresas);

  }

  initObjetos() {

    this.parceriasProjeto = new ParceriasProjeto();
    this.parceriasProjeto.empresa = new Empresa();
    this.parceriasProjeto.materiaisProjeto = [];
    this.parceriasProjeto.parceriasCategorias = [];
    this.parceriasProjeto.aditivosParceriasProjeto = [];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["listaParceiros"] && !_.isEmpty(changes["listaParceiros"].currentValue)) {
      this.carregarLista();
    }

  }

  limpar() {
    this.initObjetos();
  }

  isJaAdicionada(): boolean {
    const unidadeAdicionada = this.listaParceiros.find((e: ParceriasProjeto) => e.empresa.id === this.parceriasProjeto.empresa.id);

    return !!unidadeAdicionada;

  }

  adicionar() {
    if (this.isJaAdicionada()) {
      this.toastService.showAlerta('Parceiro já adicionado');
      return;
    }

    const parceriaProjetoSelecionado = new ParceriasProjeto();
    Object.assign(parceriaProjetoSelecionado, this.parceriasProjeto);

    this.getObjetosCompletosParaLista(parceriaProjetoSelecionado);

    this.listaParceiros.push(parceriaProjetoSelecionado);
    this.limpar();

    this.openFormCadastro = !this.openFormCadastro;
  }

  getObjetosCompletosParaLista(parceriaProjetoSelecionado: ParceriasProjeto) {
    parceriaProjetoSelecionado.empresa = _.find(this.empresas, (empresa: Empresa) => empresa.id == parceriaProjetoSelecionado.empresa.id);

  }


  deletar(parceriasProjeto: ParceriasProjeto): void {
    const index = this.listaParceiros.indexOf(this.listaParceiros.find(e => e.id === parceriasProjeto.id));
    if (index >= 0) {
      this.listaParceiros.splice(index, 1);
      this.carregarLista();
    }
  }

  novo() {
    this.isAtualizar = false;
    this.openFormCadastro = !this.openFormCadastro;
    this.limpar();

    this.novoObjetoService.initObjeto.emit();
  }

  carregarLista() {
    if (this.listaParceiros.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhuma parceiro adicionado.';
    } else {
      this.dataSource.data = this.listaParceiros ? this.listaParceiros : [];
      this.mostrarTabela = true;
    }
  }

  atualizar() {
    this.limpar();
    this.openFormCadastro = false;
    this.isAtualizar = false;
    this.novoObjetoService.initObjeto.emit();
  }

  atualizarComposicao(parceiro: ParceriasProjeto) {
    this.parceriasProjeto = parceiro;
    this.openFormCadastro = true;
    this.isAtualizar = true;
  }


}
