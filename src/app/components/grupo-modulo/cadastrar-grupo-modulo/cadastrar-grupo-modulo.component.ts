import { InstituicaoService } from './../../../services/instituicao/instituicao.service';
import { PerfilAcessoService } from './../../../services/perfil-acesso/perfil-acesso.service';
import { GrupoModulo } from './../../../core/grupo-modulo';
import { Modulo } from 'src/app/core/modulo';
import { Component, OnInit } from '@angular/core';
import { UsuariosUnidades } from 'src/app/core/usuarios-unidades';
import { PerfilAcesso } from 'src/app/core/perfil-acesso';
import { Acesso } from 'src/app/core/acesso';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UsuarioUnidadeService } from 'src/app/services/usuario-unidade/usuario-unidade.service';
import { GrupoModuloService } from 'src/app/services/grupo-modulo/grupo-modulo.service';
import { ModuloService } from 'src/app/services/modulo/modulo.service';
import { Unidade } from 'src/app/core/unidade';
import { Location } from '@angular/common';
import * as _ from 'lodash';
import { Instituicao } from 'src/app/core/instituicao';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';

@Component({
  selector: 'cadastrar-grupo-modulo',
  templateUrl: './cadastrar-grupo-modulo.component.html',
  styleUrls: ['./cadastrar-grupo-modulo.component.css']
})
export class CadastrarGrupoModuloComponent implements OnInit {


  ////////////////////////////////////////////////////////////////////////////
  // Campos de combos
  modulos: Modulo[];
  perfisAcesso: PerfilAcesso[];

  grupoModulo: GrupoModulo = new GrupoModulo();
  grupoModulos: GrupoModulo[];

  instituicoes: Instituicao[];

  ////////////////////////////////////////////////////////////////////////////

  acesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();

  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  isAtualizar = false;

  modulosSelecionados: Modulo[];
  grupoModulosNovos: GrupoModulo[];
  perfilAcessoSelecionado: PerfilAcesso = new PerfilAcesso();
  instituicaoSelecionada: Instituicao = new Instituicao();


  constructor(private grupoModuloService: GrupoModuloService,
              private activatedRoute: ActivatedRoute,
              private toastService: ToastService,
              private usuarioUnidadeService: UsuarioUnidadeService,
              private location: Location,
              private moduloService: ModuloService,
              private instituicaoService: InstituicaoService,
              private perfilAcessoService: PerfilAcessoService,
              private router: Router,
  ) {
  }

  ngOnInit() {
    this.limpar();

    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    if (!this.acesso.insere) {
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.acesso.altera) {
      this.mostrarBotaoAtualizar = false;
    }


    this.perfilAcessoService.getAll().subscribe((perfisAcesso: PerfilAcesso[]) => {
      this.perfisAcesso = perfisAcesso;
    });

    this.instituicaoService.getAll().subscribe((instituicoes: Instituicao[]) => {
      this.instituicoes = _.filter(instituicoes, (i) => i.mostraLista);
    });

    this.moduloService.getAll().subscribe((modulos: Modulo[]) => {
      this.modulos = modulos;
    });    

    const id = this.activatedRoute.snapshot.queryParams.id ? this.activatedRoute.snapshot.queryParams.id : null;
    if (id) {
      this.isAtualizar = true;
      this.grupoModuloService.getById(id).subscribe((grupoModulo: GrupoModulo) => {
        this.grupoModulo = grupoModulo;
        this.instituicaoSelecionada = this.grupoModulo.instituicao;

      });
    } else {
      this.carregarGruposModulosDaInstituicao();
    } 
    
  }

  carregarGruposModulosDaInstituicao() {
    if(this.instituicaoSelecionada.id) {
      this.grupoModuloService.getAllByInstituicao(this.instituicaoSelecionada.id)
      .subscribe((grupoModulos: GrupoModulo[]) => {
        this.grupoModulos = grupoModulos;
      });
    }
  }


  limpar() {
    this.grupoModulo = new GrupoModulo();
    this.grupoModulo.instituicao = new Instituicao();
    this.grupoModulo.modulo = new Modulo();
    this.grupoModulo.perfilAcesso = new PerfilAcesso();


    this.modulosSelecionados = [];
    this.grupoModulosNovos = [];
    this.perfilAcessoSelecionado = new PerfilAcesso();
    this.instituicaoSelecionada = new Instituicao();
  }


  cancelar() {
    this.router.navigate(['grupomodulo']);
  }


  mostrarBotaoLimpar() {
    if (this.isAtualizar) {return false; }
    if (!this.mostrarBotaoAtualizar) { return false; }
    if (!this.mostrarBotaoCadastrar) { return false; }

    return true;
  }



  cadastrar() {

    let jaCadastrado = false;

    this.grupoModulosNovos.forEach(gm => {
      this.grupoModulo.instituicao = gm.instituicao;
      this.grupoModulo.modulo = gm.modulo;
      this.grupoModulo.perfilAcesso = gm.perfilAcesso;

      if (this.isJaAdicionada()) {
        this.toastService.showAlerta(`Módulo '${gm.modulo.descricao}' já está cadastrado com essa permssão.`);
        jaCadastrado = true;
      }
    });
    if (jaCadastrado) { return; }

    this.grupoModuloService.cadastrarAll(this.grupoModulosNovos).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso('Módulos cadastrados com sucesso.');
    });
  }


  atualizar() {
    if (this.isJaAdicionada()) {
      this.toastService.showAlerta('Módulo já está cadastrado nessa unidade');
      return;
    }

    this.grupoModuloService.alterar(this.grupoModulo).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso('Módulo atualizado com sucesso.');
    });
  }

  isJaAdicionada(): boolean {
    const grupoNovo = this.grupoModulos.find(grupo => grupo.modulo.id === this.grupoModulo.modulo.id
                                             &&
                                             grupo.instituicao.id === this.grupoModulo.instituicao.id
                                             &&
                                             grupo.perfilAcesso.id === this.grupoModulo.perfilAcesso.id);

    return !!grupoNovo;
  }


  addModulo() {
    if (!this.grupoModulosNovos) {
      this.grupoModulosNovos = [];
    }

    let jaCadastrado = false;
    // Valida se algum grupo selecionado já está cadastrado no BD.
    this.modulosSelecionados.forEach(modulo => {
      this.grupoModulo.instituicao = this.instituicaoSelecionada;
      this.grupoModulo.modulo = modulo;
      this.grupoModulo.perfilAcesso = this.perfilAcessoSelecionado;

      if (this.isJaAdicionada()) {
        this.toastService.showAlerta(`Módulo '${modulo.descricao}' já está cadastrado nessa unidade`);
        jaCadastrado = true;
      }
    });

    if (jaCadastrado) {return;}


    // Retira da lista os itens apagados
    this.grupoModulosNovos = this.grupoModulosNovos.filter( gm => this.modulosSelecionados.find(m => m.id === gm.modulo.id ));

    _.forEach(this.modulosSelecionados, moduloSelecionado => {
      const grupoJaAdicionado = _.find(this.grupoModulosNovos, (gm: GrupoModulo) => {
        return gm.instituicao.id === this.instituicaoSelecionada.id
               &&
               gm.modulo.id === moduloSelecionado.id
               &&
               gm.perfilAcesso.id === this.perfilAcessoSelecionado.id;
      });

      if (!grupoJaAdicionado) {
        const grupoModuloNovo: GrupoModulo = new GrupoModulo();
        grupoModuloNovo.instituicao = new Instituicao();
        grupoModuloNovo.perfilAcesso = new PerfilAcesso();
        grupoModuloNovo.modulo = new Modulo();

        Object.assign(grupoModuloNovo.instituicao, this.instituicaoSelecionada);
        Object.assign(grupoModuloNovo.perfilAcesso, this.perfilAcessoSelecionado);
        Object.assign(grupoModuloNovo.modulo, moduloSelecionado);

        this.grupoModulosNovos.push(grupoModuloNovo);
      }
    });

  }

  deletar(grupoModulo: GrupoModulo) {
    const index = this.grupoModulosNovos.indexOf( this.grupoModulosNovos.find(d => d === grupoModulo));
    if (index >= 0) {
      this.grupoModulosNovos.splice(index, 1);
    }

    const indexModulo = this.modulosSelecionados.indexOf( this.modulosSelecionados.find(d => d === grupoModulo.modulo));
    if (index >= 0) {
      this.modulosSelecionados.splice(indexModulo, 1);
    }

  }

}
