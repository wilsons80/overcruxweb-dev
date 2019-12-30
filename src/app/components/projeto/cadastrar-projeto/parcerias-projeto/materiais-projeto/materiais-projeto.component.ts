import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { Acesso } from 'src/app/core/acesso';
import { MateriaisProjeto } from 'src/app/core/materiais-projeto';
import { Material } from 'src/app/core/material';
import { ParceriasProjeto } from 'src/app/core/parcerias-projeto';
import { Projeto } from 'src/app/core/projeto';
import { MaterialService } from 'src/app/services/material/material.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'materiais-projeto',
  templateUrl: './materiais-projeto.component.html',
  styleUrls: ['./materiais-projeto.component.css']
})
export class MateriaisProjetoComponent implements OnInit {

  @Input() listaMateriaisProjeto:MateriaisProjeto[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['material','dataInicio','dataFim', 'valorMaterial','acoes'];
  dataSource: MatTableDataSource<MateriaisProjeto> = new MatTableDataSource();

  openFormCadastro = false;

  perfilAcesso: Acesso;

  isAtualizar = false;


  materiaisProjeto:MateriaisProjeto;
  materiais:Material[]= [];

  constructor(
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private materialService:MaterialService
  ) {

  }

  ngOnInit() {

    this.initObjetos();

    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];
    this.materialService.getAll().subscribe((materiais:Material[]) => this.materiais = materiais);

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


}
