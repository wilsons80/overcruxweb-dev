import { MovimentacoesService } from './../../../services/movimentacoes/movimentacoes.service';
import { Component, OnInit } from '@angular/core';
import { Movimentacoes } from 'src/app/core/movimentacoes';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Unidade } from 'src/app/core/unidade';
import { Empresa } from 'src/app/core/empresa';
import { Departamento } from 'src/app/core/departamento';
import { Programa } from 'src/app/core/programa';
import { Projeto } from 'src/app/core/projeto';

@Component({
  selector: 'cadastrar-movimentacoes',
  templateUrl: './cadastrar-movimentacoes.component.html',
  styleUrls: ['./cadastrar-movimentacoes.component.css']
})
export class CadastrarMovimentacoesComponent implements OnInit {

  movimentacoes: Movimentacoes;

  isAtualizar: boolean = false;

  
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private movimentacoesService:MovimentacoesService
  ) { }

  ngOnInit() {
    this.inicializarObjetos();
   
    let id: number;
    id = this.activatedRoute.snapshot.queryParams.id ? this.activatedRoute.snapshot.queryParams.id : null;
    if (id) {
      this.isAtualizar = true;
      
      this.movimentacoesService.getById(id).subscribe((movimentacoes: Movimentacoes) => {
        this.movimentacoes = movimentacoes
      });
    }

  }

  cadastrar() {
    this.movimentacoesService.cadastrar(this.movimentacoes).subscribe(() => {
      this.router.navigate(['movimentacoes']);
      this.toastService.showSucesso("Movimentação cadastrada com sucesso");
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
      this.router.navigate(['movimentacoes']);
      this.toastService.showSucesso("Movimentação atualizada com sucesso");
    });

  }

  inicializarObjetos() {
    this.movimentacoes = new Movimentacoes();
    this.movimentacoes.unidade = new Unidade();
    this.movimentacoes.empresa = new Empresa();
    this.movimentacoes.departamento = new Departamento();
    this.movimentacoes.programa = new Programa();
    this.movimentacoes.projeto = new Projeto();
  }

  mostrarBotaoLimpar() {
    if (this.isAtualizar) return false;
    if (!this.mostrarBotaoAtualizar) return false;
    if (!this.mostrarBotaoCadastrar) return false;

    return true;
  }

}
