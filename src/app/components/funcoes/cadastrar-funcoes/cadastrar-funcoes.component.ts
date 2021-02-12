import { Unidade } from 'src/app/core/unidade';
import { InstituicaoService } from 'src/app/services/instituicao/instituicao.service';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { Component, OnInit } from '@angular/core';
import { FuncoesService } from 'src/app/services/funcoes/funcoes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Funcoes } from 'src/app/core/funcoes';
import { Acesso } from 'src/app/core/acesso';
import { Instituicao } from 'src/app/core/instituicao';
import { Cargo } from 'src/app/core/cargo';
import { CargosService } from 'src/app/services/cargos/cargos.service';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';

@Component({
  selector: 'cadastrar-funcoes',
  templateUrl: './cadastrar-funcoes.component.html',
  styleUrls: ['./cadastrar-funcoes.component.css']
})
export class CadastrarFuncoesComponent implements OnInit {

  unidades:Unidade[];
  instituicoes:Instituicao[];

  funcao: Funcoes;

  isAtualizar: boolean = false;

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil;

  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;
  cargos: Cargo[];

  constructor(
    private funcoesService: FuncoesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private cargosService: CargosService,

  ) {
    this.carregarPerfil = new CarregarPerfil();
   }

  ngOnInit() {
    this.inicializarObjetos();
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    if (!this.perfilAcesso.insere) {
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera) {
      this.mostrarBotaoAtualizar = false;
    }

    this.cargosService.getAll().subscribe((cargos: Cargo[]) => {
      this.cargos = cargos;
    })
   
    let id: number;
    id = this.activatedRoute.snapshot.queryParams.id ? this.activatedRoute.snapshot.queryParams.id : null;
    if (id) {
      this.isAtualizar = true;
      this.funcoesService.getById(id).subscribe((funcao: Funcoes) => {
        this.funcao = funcao
      });
    }

  }

  cadastrar() {
    this.funcoesService.cadastrar(this.funcao).subscribe(() => {
      this.router.navigate(['funcoes']);
      this.toastService.showSucesso("Função cadastrada com sucesso");
    });
  }

  limpar() {
    this.inicializarObjetos();
    this.funcao.descricao = "";
    this.funcao.atribuicoes = "";
    this.funcao.conhecimentosEspecificos = "";
    this.funcao.comportamentosEsperados = "";
  }

  cancelar() {
    this.router.navigate(['funcoes']);
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }


  atualizar() {
    this.funcoesService.alterar(this.funcao).subscribe(() => {
      this.router.navigate(['funcoes']);
      this.toastService.showSucesso("Função atualizada com sucesso");
    });

  }


  inicializarObjetos() {
    this.funcao = new Funcoes();
    this.funcao.cargo = new Cargo();
  }

  mostrarBotaoLimpar() {
    if (this.isAtualizar) return false;
    if (!this.mostrarBotaoAtualizar) return false;
    if (!this.mostrarBotaoCadastrar) return false;

    return true;
  }


}
