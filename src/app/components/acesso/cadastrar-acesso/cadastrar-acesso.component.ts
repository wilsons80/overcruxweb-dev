import { PerfilAcessoService } from './../../../services/perfil-acesso/perfil-acesso.service';
import { PerfilAcesso } from 'src/app/core/perfil-acesso';
import { InstituicaoService } from 'src/app/services/instituicao/instituicao.service';
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
import { GrupoModuloService } from 'src/app/services/grupo-modulo/grupo-modulo.service';
import * as _ from 'lodash';
import { Instituicao } from 'src/app/core/instituicao';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';


@Component({
  selector: 'app-cadastrar-acesso',
  templateUrl: './cadastrar-acesso.component.html',
  styleUrls: ['./cadastrar-acesso.component.css']
})
export class CadastrarAcessoComponent implements OnInit {


  usuarios: UsuarioUnidade[];
  modulos: Modulo[];
  perfis: PerfilAcesso[];
  instituicoes: Instituicao[];

  grupoModulo: GrupoModulo = new GrupoModulo();
  moduloSelecionados: Modulo[];

  isAtualizar = false;

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil;

  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  labelBotao: string;

  cadastroAcesso: CadastroAcesso = new CadastroAcesso();

  constructor(
    private acessoService: AcessoService,
    private perfilAcessoService: PerfilAcessoService,
    private moduloService: ModuloService,
    private toastService: ToastService,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private instituicaoService: InstituicaoService,
    private router: Router
  ) {
    this.carregarPerfil = new CarregarPerfil();
  }

  ngOnInit() {
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    if (!this.perfilAcesso.insere){
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera){
      this.mostrarBotaoAtualizar = false;
    }

    this.instituicaoService.getInstituicoesComAcesso().subscribe((instituicoes: Instituicao[]) => {
      this.instituicoes = instituicoes;
  });


    this.cadastroAcesso.idPerfilAcesso = this.activatedRoute.snapshot.queryParams.idPerfilAcesso ? Number(this.activatedRoute.snapshot.queryParams.idPerfilAcesso) : null;
    this.cadastroAcesso.idInstituicao = this.activatedRoute.snapshot.queryParams.idInstituicao ? Number(this.activatedRoute.snapshot.queryParams.idInstituicao) : null;
    this.cadastroAcesso.idModulo = this.activatedRoute.snapshot.queryParams.idModulo ? Number(this.activatedRoute.snapshot.queryParams.idModulo) : null;
    this.cadastroAcesso.idUsuario = this.activatedRoute.snapshot.queryParams.idUsuario ? Number(this.activatedRoute.snapshot.queryParams.idUsuario) : null;

    if (this.cadastroAcesso.idPerfilAcesso) {
      this.isAtualizar = true;
    }

    this.buscarPerfis();

    if (this.cadastroAcesso.idInstituicao) {
      this.instituicaoSelecionada();
    }
  }

  instituicaoSelecionada() {

    if (!this.isAtualizar) {
      this.limparCamposDependendentesUnidade();
    }

    this.moduloService.getModulosPorInstituicaoLogada().subscribe((modulos: Modulo[]) => {
      // Tira os módulos PAI
      //const filhos = _.filter(modulos, m => m.moduloPai );
      //const dados: any = filhos.filter((f: any) => !filhos.find( (r: any) =>  r.moduloPai.id === f.id) );

      this.modulos = modulos;
    });

    this.usuarioService.getUsuariosPorInstituicao(this.cadastroAcesso.idInstituicao)
    .subscribe((usuarios: UsuarioUnidade[]) => this.usuarios = usuarios);
  }

  limparCamposDependendentesUnidade() {
    this.cadastroAcesso.idUsuario = null;
    this.cadastroAcesso.idModulo = null;
    this.cadastroAcesso.idPerfilAcesso = null;
    this.moduloSelecionados = [];
  }


  atualizar() {
    this.acessoService.alterar(this.cadastroAcesso).subscribe(() => {
      this.toastService.showSucesso('Acesso atualizado com sucesso');
      this.router.navigate(['acesso']);
    });
  }

  cadastrar() {
    if (this.moduloSelecionados && this.moduloSelecionados.length > 0 ) {
      const grupoAceso: CadastroAcesso[] = [];

      _.forEach(this.moduloSelecionados, modulo => {
         const acesso: CadastroAcesso = new CadastroAcesso();

         acesso.idInstituicao           = this.cadastroAcesso.idInstituicao;
         acesso.idUsuario               = this.cadastroAcesso.idUsuario;
         acesso.idModulo                = modulo.id;
         acesso.idPerfilAcesso          = this.cadastroAcesso.idPerfilAcesso;

         grupoAceso.push(acesso);
      });

      this.acessoService.cadastrarAll(grupoAceso).subscribe(() => {
        this.toastService.showSucesso('Acesso cadastrado com sucesso');
        this.router.navigate(['acesso']);
      });
    }
  }

  limpar() {
    this.moduloSelecionados = [];

    if (this.isAtualizar) {
      this.cadastroAcesso.idPerfilAcesso = null;
    } else {
      this.cadastroAcesso = {
        idInstituicao: null,
        idUsuario: null,
        idModulo: null,
        idPerfilAcesso: null
      }
    }
  }

  cancelar() {
    this.router.navigate(['acesso']);
  }

  buscarPerfis() {
    this.perfilAcessoService.getAll().subscribe((perfis: PerfilAcesso[]) => {
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
