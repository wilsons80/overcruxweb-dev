import { UsuarioUnidade } from './../../../core/usuario-unidade';
import { Unidade } from './../../../core/unidade';
import { UnidadeService } from './../../../services/unidade/unidade.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UsuarioSistema } from 'src/app/core/usuario-sistema';
import { Acesso } from 'src/app/core/acesso';
import { UsuarioSistemaService } from 'src/app/services/usuario-sistema/usuario-sistema.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { PessoaFisica } from 'src/app/core/pessoa-fisica';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { UsuarioUnidadeService } from 'src/app/services/usuario-unidade/usuario-unidade.service';
import { UsuariosUnidades } from 'src/app/core/usuarios-unidades';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';

@Component({
  selector: 'unidade',
  templateUrl: './unidade.component.html',
  styleUrls: ['./unidade.component.css']
})
export class UnidadeComponent implements OnInit {

  @Input() usuarioSistema: UsuarioSistema;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['siglaUnidade', 'nomeUnidade', 'nomeFantasia', 'cnpj', 'acoes'];
  dataSource: MatTableDataSource<Unidade> = new MatTableDataSource();

  openFormCadastro = true;

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();

  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  isAtualizar = false;

  unidadesComboCadastro: any[];
  unidade: Unidade = new Unidade();

  constructor(private usuarioSistemaService: UsuarioSistemaService,
              private activatedRoute: ActivatedRoute,
              private toastService: ToastService,
              private unidadeService: UnidadeService,
              private usuarioUnidadeService: UsuarioUnidadeService,
              private router: Router,
  ) { }

  ngOnInit() {
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    if (!this.perfilAcesso.insere){
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera){
      this.mostrarBotaoAtualizar = false;
    }
    this.limpar();



    this.dataSource.paginator = this.paginator;
    this.carregarLista();

    this.unidadeService.getAllByInstituicaoDaUnidadeLogada().subscribe((unidades: any[]) => {
      this.unidadesComboCadastro = unidades;
    });

  }

  limpar() {
    this.unidade = new Unidade();
  }

  cancelar() {
    this.router.navigate(['usuariosistema']);
  }


  mostrarBotaoLimpar() {
    if (this.isAtualizar) {return false; }
    if (!this.mostrarBotaoAtualizar) { return false; }
    if (!this.mostrarBotaoCadastrar) { return false; }

    return true;
  }


  isUnidadeJaAdicionada(): boolean {
    const unidadeAdicionada = this.usuarioSistema.unidades.
                                             find( (u: any) => u.unidade.idUnidade === this.unidade.idUnidade);

    return !!unidadeAdicionada;
  }

  adicionar() {

    if (this.isUnidadeJaAdicionada()) {
      this.toastService.showAlerta('Usuário já está cadastrado nessa unidade');
      return;
    }

    const unidadeAdicionada = new UsuariosUnidades();
    //Object.assign(unidadeAdicionada, this.usuarioSistema);


    unidadeAdicionada.id = null;
    unidadeAdicionada.usuarioSistema = new UsuarioSistema();
    unidadeAdicionada.usuarioSistema.id = this.usuarioSistema.id;
    unidadeAdicionada.unidade = this.unidade;
    unidadeAdicionada.usuarioSistema.pessoaFisica = this.usuarioSistema.pessoaFisica;

    this.usuarioSistema.unidades.push(unidadeAdicionada);
    this.limpar();
  }

  deletar(unidade: Unidade): void {
    const index = this.usuarioSistema.unidades.indexOf( this.usuarioSistema.unidades.find(uni => uni.unidade === unidade));
    if (index >= 0) {
      this.usuarioSistema.unidades.splice(index, 1);
      this.carregarLista();
    }
  }

  novo() {
   this.openFormCadastro = !this.openFormCadastro;
   this.limpar();
  }

  carregarLista() {
    if (this.usuarioSistema) {
        if (!this.usuarioSistema.unidades || this.usuarioSistema.unidades.length === 0) {
          this.mostrarTabela = false;
          this.msg = 'Nenhum responsável cadastrado.';
        } else {
          this.dataSource.data = this.usuarioSistema.unidades ? this.usuarioSistema.unidades.map(u => u.unidade) : [];
          this.mostrarTabela = true;
        }
    }
  }


}
