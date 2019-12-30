import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { Acesso } from 'src/app/core/acesso';
import { Empresa } from 'src/app/core/empresa';
import { ParceriasPrograma } from 'src/app/core/parcerias-programa';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'parcerias-programa',
  templateUrl: './parcerias-programa.component.html',
  styleUrls: ['./parcerias-programa.component.css']
})
export class ParceriasProgramaComponent implements OnInit {

  @Input() listaParceiros: ParceriasPrograma[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['codigo', 'nomeRazaoSocial', 'cnpj', 'acoes'];
  dataSource: MatTableDataSource<ParceriasPrograma> = new MatTableDataSource();

  openFormCadastro = false;

  perfilAcesso: Acesso;

  isAtualizar = false;

  parceriasPrograma: ParceriasPrograma;
  empresas: Empresa[];

  constructor(
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private empresaService: EmpresaService
  ) {

  }

  ngOnInit() {

    this.initObjetos();

    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];
    this.empresaService.getAll().subscribe((empresas: Empresa[]) => this.empresas = empresas);

  }

  initObjetos() {

    this.parceriasPrograma = new ParceriasPrograma();
    this.parceriasPrograma.empresa = new Empresa();
    this.parceriasPrograma.materiaisPrograma = [];
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
    const unidadeAdicionada = this.listaParceiros.find((e: ParceriasPrograma) => e.empresa.id === this.parceriasPrograma.empresa.id);

    return !!unidadeAdicionada;

  }

  adicionar() {
    if (this.isJaAdicionada()) {
      this.toastService.showAlerta('Parceiro já adicionado');
      return;
    }

    const parceriaProgramaSelecionado = new ParceriasPrograma();
    Object.assign(parceriaProgramaSelecionado, this.parceriasPrograma);

    this.getObjetosCompletosParaLista(parceriaProgramaSelecionado);

    this.listaParceiros.push(parceriaProgramaSelecionado);
    this.limpar();
  }

  getObjetosCompletosParaLista(parceriaProgramaSelecionado: ParceriasPrograma) {
    parceriaProgramaSelecionado.empresa = _.find(this.empresas, (empresa: Empresa) => empresa.id == parceriaProgramaSelecionado.empresa.id);

  }


  deletar(parceriasPrograma: ParceriasPrograma): void {
    const index = this.listaParceiros.indexOf(this.listaParceiros.find(e => e.id === parceriasPrograma.id));
    if (index >= 0) {
      this.listaParceiros.splice(index, 1);
      this.carregarLista();
    }
  }

  novo() {
    this.isAtualizar = false;
    this.openFormCadastro = !this.openFormCadastro;
    this.limpar();
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
  }

  atualizarComposicao(parceiro: ParceriasPrograma) {
    this.parceriasPrograma = parceiro;
    this.openFormCadastro = true;
    this.isAtualizar = true;
  }


}
