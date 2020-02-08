import { Component, OnInit } from '@angular/core';
import { FuncoesService } from 'src/app/services/funcoes/funcoes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Funcoes } from 'src/app/core/funcoes';
import { Acesso } from 'src/app/core/acesso';

@Component({
  selector: 'cadastrar-funcoes',
  templateUrl: './cadastrar-funcoes.component.html',
  styleUrls: ['./cadastrar-funcoes.component.css']
})
export class CadastrarFuncoesComponent implements OnInit {

  funcao: Funcoes;

  isAtualizar: boolean = false;

  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  constructor(
    private funcoesService: FuncoesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService

  ) { }

  ngOnInit() {
    this.inicializarObjetos();

    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if (!this.perfilAcesso.insere) {
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera) {
      this.mostrarBotaoAtualizar = false;
    }
   
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
  }

  mostrarBotaoLimpar() {
    if (this.isAtualizar) return false;
    if (!this.mostrarBotaoAtualizar) return false;
    if (!this.mostrarBotaoCadastrar) return false;

    return true;
  }


}
