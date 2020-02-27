import { Component, OnInit, Input, ViewChild, SimpleChanges, OnDestroy } from '@angular/core';
import { ParceriasCategorias } from 'src/app/core/parcerias-categorias';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


import { Acesso } from 'src/app/core/acesso';
import { CategoriasContabeis } from 'src/app/core/categorias-contabeis';
import { ActivatedRoute } from '@angular/router';
import { CategoriasContabeisService } from 'src/app/services/categorias-contabeis/categorias-contabeis.service';
import * as _ from 'lodash';
import { NovoObjetoService } from 'src/app/services/novo-objeto/novo-objeto.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'parcerias-categorias',
  templateUrl: './parcerias-categorias.component.html',
  styleUrls: ['./parcerias-categorias.component.css']
})
export class ParceriasCategoriasComponent implements OnInit, OnDestroy {
  
  @Input() listaParceriasCategorias:ParceriasCategorias[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['categoriasContabeis','valorParceriaCategoria','acoes'];
  dataSource: MatTableDataSource<ParceriasCategorias> = new MatTableDataSource();

  openFormCadastro = false;

  perfilAcesso: Acesso;

  isAtualizar = false;


  parceriasCategorias:ParceriasCategorias;
  categoriasContabeis: CategoriasContabeis[];
  sub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoriasContabeisService:CategoriasContabeisService,
    private novoObjetoService:NovoObjetoService
  ) {

  }

  ngOnInit() {

    this.initObjetos();

    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    this.categoriasContabeisService.getAllCombo().subscribe((categoriasContabeis:CategoriasContabeis[]) => {
      this.categoriasContabeis = categoriasContabeis;
    })

    this.sub = this.novoObjetoService.initObjeto.subscribe(() => {
      this.listaParceriasCategorias = [];
      this.carregarLista();
    });


  }

  initObjetos() {
    this.parceriasCategorias = new ParceriasCategorias();
    this.parceriasCategorias.categoriasContabeis = new CategoriasContabeis();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["listaParceriasCategorias"] && !_.isEmpty(changes["listaParceriasCategorias"].currentValue)) {
      this.carregarLista();
    }

  }

  limpar() {
    this.initObjetos(); 
  }


  adicionar() {

    const materiaisProgramaSelecionado = new ParceriasCategorias();
    Object.assign(materiaisProgramaSelecionado, this.parceriasCategorias);

    this.getObjetosCompletosParaLista(materiaisProgramaSelecionado);

    this.listaParceriasCategorias.push(materiaisProgramaSelecionado);
    this.limpar();
  }

  getObjetosCompletosParaLista(parceriasCategorias: ParceriasCategorias) {
   parceriasCategorias.categoriasContabeis =  _.find(this.categoriasContabeis, (c: CategoriasContabeis) => c.id == parceriasCategorias.categoriasContabeis.id);
  }


  deletar(parceriasCategorias: ParceriasCategorias): void {
    const index = this.listaParceriasCategorias.indexOf(this.listaParceriasCategorias.find(e => e.id === parceriasCategorias.id));
    if (index >= 0) {
      this.listaParceriasCategorias.splice(index, 1);
      this.carregarLista();
    }
  }

  novo() {
    this.isAtualizar = false;
    this.openFormCadastro = !this.openFormCadastro;
    this.limpar();
  }

  carregarLista() {
    if (this.listaParceriasCategorias.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhuma categoria adicionada ao programa.';
    } else {
      this.dataSource.data = this.listaParceriasCategorias ? this.listaParceriasCategorias : [];
      this.mostrarTabela = true;
    }
  }

  atualizar() {
    let parceriasCategorias: ParceriasCategorias = _.find(this.listaParceriasCategorias, (parceriasCategorias: ParceriasCategorias) => parceriasCategorias.id == this.parceriasCategorias.id);
    parceriasCategorias = this.parceriasCategorias;
    parceriasCategorias.id = null;
    this.limpar();
    this.openFormCadastro = false;
    this.isAtualizar = false;
  }

  atualizarComposicao(parceriasCategorias: ParceriasCategorias) {
    this.parceriasCategorias = parceriasCategorias;
    this.openFormCadastro = true;
    this.isAtualizar = true;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
