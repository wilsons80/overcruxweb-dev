import { Component, Input, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { Acesso } from 'src/app/core/acesso';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';
import { MateriaisProjeto } from 'src/app/core/materiais-projeto';
import { Material } from 'src/app/core/material';
import { MaterialService } from 'src/app/services/material/material.service';
import { NovoObjetoService } from 'src/app/services/novo-objeto/novo-objeto.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'materiais-projeto',
  templateUrl: './materiais-projeto.component.html',
  styleUrls: ['./materiais-projeto.component.css']
})
export class MateriaisProjetoComponent implements OnInit, OnDestroy {

  @Input() listaMateriaisProjeto: MateriaisProjeto[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['material', 'dataInicio', 'dataFim', 'valorMaterial', 'acoes'];
  dataSource: MatTableDataSource<MateriaisProjeto> = new MatTableDataSource();

  openFormCadastro = false;

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();

  isAtualizar = false;

  sub: Subscription;

  materiaisProjeto: MateriaisProjeto;
  materiais: Material[] = [];

  constructor(
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private materialService: MaterialService,
    private novoObjetoService: NovoObjetoService
  ) {

  }

  ngOnInit() {

    this.initObjetos();

    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);
    this.materialService.getAll().subscribe((materiais: Material[]) => this.materiais = materiais);

    this.sub = this.novoObjetoService.initObjeto.subscribe(() => {
      this.listaMateriaisProjeto = [];
      this.carregarLista();
    });

  }

  initObjetos() {
    this.materiaisProjeto = new MateriaisProjeto();
    this.materiaisProjeto.material = new Material();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["listaMateriaisProjeto"] && !_.isEmpty(changes["listaMateriaisProjeto"].currentValue)) {
      this.carregarLista();
    }

  }

  limpar() {
    this.initObjetos();
  }


  adicionar() {

    const materiaisProjetoSelecionado = new MateriaisProjeto();
    Object.assign(materiaisProjetoSelecionado, this.materiaisProjeto);

    this.getObjetosCompletosParaLista(materiaisProjetoSelecionado);

    this.listaMateriaisProjeto.push(materiaisProjetoSelecionado);
    this.limpar();
  }

  getObjetosCompletosParaLista(materiaisProjetoSelecionado: MateriaisProjeto) {
    materiaisProjetoSelecionado.material = _.find(this.materiais, (material: Material) => material.id == materiaisProjetoSelecionado.material.id);

  }


  deletar(materiaisProjeto: MateriaisProjeto): void {
    const index = this.listaMateriaisProjeto.indexOf(this.listaMateriaisProjeto.find(e => e.id === materiaisProjeto.id));
    if (index >= 0) {
      this.listaMateriaisProjeto.splice(index, 1);
      this.carregarLista();
    }
  }

  novo() {
    this.isAtualizar = false;
    this.openFormCadastro = !this.openFormCadastro;
    this.limpar();
  }

  carregarLista() {
    if (this.listaMateriaisProjeto.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhum material adicionado ao projeto.';
    } else {
      this.dataSource.data = this.listaMateriaisProjeto ? this.listaMateriaisProjeto : [];
      this.mostrarTabela = true;
    }
  }

  atualizar() {
    let materiaisProjeto: MateriaisProjeto = _.find(this.listaMateriaisProjeto, (materiaisProjeto: MateriaisProjeto) => materiaisProjeto.id == this.materiaisProjeto.id);
    materiaisProjeto = this.materiaisProjeto;
    materiaisProjeto.id = null;
    this.limpar();
    this.openFormCadastro = false;
    this.isAtualizar = false;
  }

  atualizarComposicao(materiaisProjeto: MateriaisProjeto) {
    this.materiaisProjeto = materiaisProjeto;
    this.openFormCadastro = true;
    this.isAtualizar = true;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


}
