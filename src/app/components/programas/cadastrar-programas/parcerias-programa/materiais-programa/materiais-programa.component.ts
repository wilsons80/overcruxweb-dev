import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { Acesso } from 'src/app/core/acesso';
import { MateriaisPrograma } from 'src/app/core/materiais-programa';
import { Material } from 'src/app/core/material';
import { ParceriasPrograma } from 'src/app/core/parcerias-programa';
import { Programa } from 'src/app/core/programa';
import { MaterialService } from 'src/app/services/material/material.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import {ControlContainer, NgForm} from '@angular/forms';

@Component({
  selector: 'materiais-programa',
  templateUrl: './materiais-programa.component.html',
  styleUrls: ['./materiais-programa.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class MateriaisProgramaComponent implements OnInit {

  @Input() listaMateriaisPrograma:MateriaisPrograma[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['material','dataInicio','dataFim', 'valorMaterial','acoes'];
  dataSource: MatTableDataSource<MateriaisPrograma> = new MatTableDataSource();

  openFormCadastro = false;

  perfilAcesso: Acesso;

  isAtualizar = false;


  materiaisPrograma:MateriaisPrograma;
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
    this.materiaisPrograma = new MateriaisPrograma();
    this.materiaisPrograma.material = new Material();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["listaMateriaisPrograma"] && !_.isEmpty(changes["listaMateriaisPrograma"].currentValue)) {
      this.carregarLista();
    }

  }

  limpar() {
    this.initObjetos(); 
  }


  adicionar() {

    const materiaisProgramaSelecionado = new MateriaisPrograma();
    Object.assign(materiaisProgramaSelecionado, this.materiaisPrograma);

    this.getObjetosCompletosParaLista(materiaisProgramaSelecionado);

    this.listaMateriaisPrograma.push(materiaisProgramaSelecionado);
    this.limpar();
  }

  getObjetosCompletosParaLista(materiaisProgramaSelecionado: MateriaisPrograma) {
    materiaisProgramaSelecionado.material = _.find(this.materiais, (material: Material) => material.id == materiaisProgramaSelecionado.material.id);
    
  }


  deletar(materiaisPrograma: MateriaisPrograma): void {
    const index = this.listaMateriaisPrograma.indexOf(this.listaMateriaisPrograma.find(e => e.id === materiaisPrograma.id));
    if (index >= 0) {
      this.listaMateriaisPrograma.splice(index, 1);
      this.carregarLista();
    }
  }

  novo() {
    this.isAtualizar = false;
    this.openFormCadastro = !this.openFormCadastro;
    this.limpar();
  }

  carregarLista() {
    if (this.listaMateriaisPrograma.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhum material adicionado ao programa.';
    } else {
      this.dataSource.data = this.listaMateriaisPrograma ? this.listaMateriaisPrograma : [];
      this.mostrarTabela = true;
    }
  }

  atualizar() {
    let materiaisPrograma: MateriaisPrograma = _.find(this.listaMateriaisPrograma, (materiaisPrograma: MateriaisPrograma) => materiaisPrograma.id == this.materiaisPrograma.id);
    materiaisPrograma = this.materiaisPrograma;
    materiaisPrograma.id = null;
    this.limpar();
    this.openFormCadastro = false;
    this.isAtualizar = false;
  }

  atualizarComposicao(materiaisPrograma: MateriaisPrograma) {
    this.materiaisPrograma = materiaisPrograma;
    this.openFormCadastro = true;
    this.isAtualizar = true;
  }


}
