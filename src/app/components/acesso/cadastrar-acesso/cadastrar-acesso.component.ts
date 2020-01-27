import { UsuarioUnidadeService } from 'src/app/services/usuario-unidade/usuario-unidade.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CadastroAcesso } from 'src/app/core/cadastro-acesso';
import { Modulo } from 'src/app/core/modulo';
import { Acesso } from 'src/app/core/acesso';
import { UsuarioUnidade } from 'src/app/core/usuario-unidade';
import { ToastService } from 'src/app/services/toast/toast.service';
import { GrupoModulo } from './../../../core/grupo-modulo';
import { AcessoService } from './../../../services/acesso/acesso.service';
import { ModuloService } from './../../../services/modulo/modulo.service';
import { UsuarioService } from './../../../services/usuario/usuario.service';
import { UsuariosUnidades } from 'src/app/core/usuarios-unidades';
import { GrupoModuloService } from 'src/app/services/grupo-modulo/grupo-modulo.service';
import * as _ from 'lodash';
import { Unidade } from 'src/app/core/unidade';


@Component({
  selector: 'app-cadastrar-acesso',
  templateUrl: './cadastrar-acesso.component.html',
  styleUrls: ['./cadastrar-acesso.component.css']
})
export class CadastrarAcessoComponent implements OnInit {


  usuarios: UsuarioUnidade[];
  modulos: Modulo[];
  perfis: GrupoModulo[];
  unidades: UsuariosUnidades[];

  grupoModulo: GrupoModulo = new GrupoModulo();
  grupoModulos: GrupoModulo[];
  grupoModuloSelecionados: GrupoModulo[];

  isAtualizar = false;

  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  labelBotao: string;

  cadastroAcesso: CadastroAcesso = new CadastroAcesso();

  constructor(
    private acessoService: AcessoService,
    private grupoModuloService: GrupoModuloService,
    private moduloService: ModuloService,
    private toastService: ToastService,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private usuarioUnidadeService: UsuarioUnidadeService
  ) { }

  ngOnInit() {
    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if(!this.perfilAcesso.insere){
      this.mostrarBotaoCadastrar = false;
    }

    if(!this.perfilAcesso.altera){
      this.mostrarBotaoAtualizar = false;
    }

    this.usuarioUnidadeService.getUnidadesUsuarioLogadoTemAcesso()
      .subscribe((usuarioUnidade: UsuariosUnidades[]) => {
        this.unidades = usuarioUnidade;
    });

    this.cadastroAcesso.idGrupoModulo = this.activatedRoute.snapshot.queryParams.idGrupoModulo ? Number(this.activatedRoute.snapshot.queryParams.idGrupoModulo) : null;
    this.cadastroAcesso.idInstituicao = this.activatedRoute.snapshot.queryParams.idInstituicao ? this.activatedRoute.snapshot.queryParams.idInstituicao : null;
    this.cadastroAcesso.idModulo = this.activatedRoute.snapshot.queryParams.idModulo ? Number(this.activatedRoute.snapshot.queryParams.idModulo) : null;
    this.cadastroAcesso.idUsuario = this.activatedRoute.snapshot.queryParams.idUsuario ? Number(this.activatedRoute.snapshot.queryParams.idUsuario) : null;

    if (this.cadastroAcesso.idGrupoModulo) {
      this.isAtualizar = true;
      this.buscarPerfis();
    }

    if (this.cadastroAcesso.idInstituicao) {
      this.unidadeSelecionada();
    }
  }

  unidadeSelecionada() {
    if (!this.isAtualizar) {
      this.limparCamposDependendentesUnidade();

      this.grupoModuloService.getAllByInstituicao(this.cadastroAcesso.idInstituicao)
      .subscribe( (gruposModulos: GrupoModulo[]) => {

        // Tira os módulos PAI
        const filhos = _.filter(gruposModulos, g => g.modulo.moduloPai );
        const dados: any = filhos.filter((f: any) => !filhos.find( (r: any) =>  r.modulo.moduloPai.id === f.modulo.id) );

        this.grupoModulos = dados;
      });

    } else {
      this.moduloService.getUsuariosPorInstituicaoLogada()
      .subscribe((modulos: Modulo[]) => this.modulos = modulos);
    }

    this.usuarioService.getUsuariosPorUnidade(this.cadastroAcesso.idInstituicao)
    .subscribe((usuarios: UsuarioUnidade[]) => this.usuarios = usuarios);
  }

  limparCamposDependendentesUnidade() {
    this.cadastroAcesso.idUsuario = null;
    this.cadastroAcesso.idModulo = null;
    this.cadastroAcesso.idGrupoModulo = null;
    this.grupoModuloSelecionados = [];
  }


  atualizar() {
    this.acessoService.alterar(this.cadastroAcesso).subscribe(() => {
      this.toastService.showSucesso('Acesso atualizado com sucesso');
      this.router.navigate(['acesso']);
    });
  }

  cadastrar() {
    if (this.grupoModuloSelecionados && this.grupoModuloSelecionados.length > 0 ) {
      const grupoAceso: CadastroAcesso[] = [];

      _.forEach(this.grupoModuloSelecionados, grupo => {
         const acesso: CadastroAcesso = new CadastroAcesso();

         acesso.idInstituicao           = this.cadastroAcesso.idInstituicao;
         acesso.idUsuario               = this.cadastroAcesso.idUsuario;
         acesso.idModulo                = grupo.modulo.id;
         acesso.idGrupoModulo           = grupo.id;

         grupoAceso.push(acesso);
      });

      this.acessoService.cadastrarAll(grupoAceso).subscribe(() => {
        this.toastService.showSucesso('Acesso cadastrado com sucesso');
        this.router.navigate(['acesso']);
      });
    }
  }

  limpar() {
    this.grupoModuloSelecionados = [];

    if (this.isAtualizar) {
      this.cadastroAcesso.idGrupoModulo = null;
    } else {
      this.cadastroAcesso = {
        idInstituicao: null,
        idUsuario: null,
        idModulo: null,
        idGrupoModulo: null
      }
    }
  }

  cancelar() {
    this.router.navigate(['acesso']);
  }

  buscarPerfis() {
    this.moduloService.getGrupoModulo(this.cadastroAcesso.idInstituicao, this.cadastroAcesso.idModulo)
      .subscribe((perfis: GrupoModulo[]) => {
        this.perfis = perfis;
      });
  }


  mostrarBotaoLimpar(){
    if(this.isAtualizar) return false;
    if(!this.mostrarBotaoAtualizar) return false;
    if(!this.mostrarBotaoCadastrar) return false;

    return true;
  }

}
