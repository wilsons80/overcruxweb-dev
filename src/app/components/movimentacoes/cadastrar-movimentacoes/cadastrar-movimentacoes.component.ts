import { AutenticadorService } from './../../../services/autenticador/autenticador.service';
import { MovimentacoesService } from './../../../services/movimentacoes/movimentacoes.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Movimentacoes } from 'src/app/core/movimentacoes';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Unidade } from 'src/app/core/unidade';
import { Empresa } from 'src/app/core/empresa';
import { Departamento } from 'src/app/core/departamento';
import { ContasBancaria } from 'src/app/core/contas-bancaria';
import { Banco } from 'src/app/core/banco';
import { Acesso } from 'src/app/core/acesso';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';

@Component({
  selector: 'cadastrar-movimentacoes',
  templateUrl: './cadastrar-movimentacoes.component.html',
  styleUrls: ['./cadastrar-movimentacoes.component.css']
})
export class CadastrarMovimentacoesComponent implements OnInit {

  movimentacoes: Movimentacoes;

  isAtualizar = false;

  
  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private drc: ChangeDetectorRef,
    private toastService: ToastService,
    private movimentacoesService: MovimentacoesService,
    private autenticadorService: AutenticadorService
  ) {
    this.carregarPerfil = new CarregarPerfil();
  }

  ngAfterContentChecked(): void {
    this.drc.detectChanges();
  }

  ngOnInit() {
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);
    
    this.inicializarObjetos();
   
    if (!this.perfilAcesso.insere){
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera){
      this.mostrarBotaoAtualizar = false;
    }
    
    const id = this.activatedRoute.snapshot.queryParams.id ? this.activatedRoute.snapshot.queryParams.id : null;
    if (id) {
      this.isAtualizar = true;
      this.movimentacoesService.getById(id).subscribe((movimentacoes: Movimentacoes) => {
        this.movimentacoes = movimentacoes;

        if (!this.movimentacoes.contaBancaria) {
          this.movimentacoes.contaBancaria = new ContasBancaria();
          this.movimentacoes.contaBancaria.banco = new Banco();
        }
      });
    }

  }

  cadastrar() {
    this.movimentacoesService.cadastrar(this.movimentacoes).subscribe(() => {
      this.router.navigate(['movimentacoes']);
      this.toastService.showSucesso('Movimentação cadastrada com sucesso');
    });
  }

  limpar() {
    this.inicializarObjetos();
  }

  cancelar() {
    this.router.navigate(['movimentacoes']);
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }


  atualizar() {
    this.movimentacoesService.alterar(this.movimentacoes).subscribe(() => {
      this.toastService.showSucesso('Registro atualizado com sucesso.');
      this.autenticadorService.revalidarSessao();

      this.movimentacoesService.getById(this.movimentacoes.id)
      .subscribe( (movimentacao: Movimentacoes) => {
        Object.assign(this.movimentacoes, movimentacao);
      });
    });

  }

  inicializarObjetos() {
    this.movimentacoes = new Movimentacoes();
    this.movimentacoes.unidade = new Unidade();
    this.movimentacoes.empresa = new Empresa();
    this.movimentacoes.departamento = new Departamento();
    this.movimentacoes.rateios = []
    this.movimentacoes.itensMovimentacoes = [];
    this.movimentacoes.faturas = [];
    this.movimentacoes.pagamentosFatura = [];
    this.movimentacoes.contaBancaria = new ContasBancaria();
    this.movimentacoes.contaBancaria.banco = new Banco();
  }

  mostrarBotaoLimpar() {
    if (this.isAtualizar) return false;
    if (!this.mostrarBotaoAtualizar) return false;
    if (!this.mostrarBotaoCadastrar) return false;

    return true;
  }

}
