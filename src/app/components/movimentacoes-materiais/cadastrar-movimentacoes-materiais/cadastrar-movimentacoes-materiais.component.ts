import { MovimentacoesMateriais } from './../../../core/movimentacoes-materiais';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Unidade } from 'src/app/core/unidade';
import { Empresa } from 'src/app/core/empresa';
import { Departamento } from 'src/app/core/departamento';
import { Programa } from 'src/app/core/programa';
import { Projeto } from 'src/app/core/projeto';
import { MovimentacoesMateriaisService } from 'src/app/services/movimentacoes-materiais/movimentacoes-materiais.service';

@Component({
  selector: 'cadastrar-movimentacoes-materiais',
  templateUrl: './cadastrar-movimentacoes-materiais.component.html',
  styleUrls: ['./cadastrar-movimentacoes-materiais.component.css']
})
export class CadastrarMovimentacoesMateriaisComponent implements OnInit {
  
  movimentacoesMateriais: MovimentacoesMateriais;

  isAtualizar: boolean = false;
  
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private movimentacoesMateriaisService:MovimentacoesMateriaisService
  ) { }

  ngOnInit() {
    this.inicializarObjetos();
   
    let id: number;
    id = this.activatedRoute.snapshot.queryParams.id ? this.activatedRoute.snapshot.queryParams.id : null;
    if (id) {
      this.isAtualizar = true;
      
      this.movimentacoesMateriaisService.getById(id).subscribe((movimentacoesMateriais: MovimentacoesMateriais) => {
        this.movimentacoesMateriais = movimentacoesMateriais
      });
    }

  }

  cadastrar() {
    this.movimentacoesMateriaisService.cadastrar(this.movimentacoesMateriais).subscribe(() => {
      this.router.navigate(['movimentacoesmateriais']);
      this.toastService.showSucesso("Movimentação material cadastrada com sucesso");
    });
  }

  limpar() {
    this.inicializarObjetos();
  }

  cancelar() {
    this.router.navigate(['movimentacoesmateriais']);
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }


  atualizar() {
    this.movimentacoesMateriaisService.alterar(this.movimentacoesMateriais).subscribe(() => {
      this.router.navigate(['movimentacoesmateriais']);
      this.toastService.showSucesso("Movimentação material atualizada com sucesso");
    });

  }

  inicializarObjetos() {
    this.movimentacoesMateriais = new MovimentacoesMateriais();
    this.movimentacoesMateriais.unidade = new Unidade();
    this.movimentacoesMateriais.empresa = new Empresa();
    this.movimentacoesMateriais.departamento = new Departamento();
    this.movimentacoesMateriais.programa = new Programa();
    this.movimentacoesMateriais.projeto = new Projeto();
    this.movimentacoesMateriais.itensMovimentacoesMateriais = [];
  }

  mostrarBotaoLimpar() {
    if (this.isAtualizar) return false;
    if (!this.mostrarBotaoAtualizar) return false;
    if (!this.mostrarBotaoCadastrar) return false;

    return true;
  }

}
