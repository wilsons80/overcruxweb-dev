import { CategoriasContabeis } from './../../../core/categorias-contabeis';
import { Component, OnInit } from '@angular/core';
import { Acesso } from 'src/app/core/acesso';
import { CategoriasContabeisService } from 'src/app/services/categorias-contabeis/categorias-contabeis.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { InstituicaoService } from 'src/app/services/instituicao/instituicao.service';
import { Unidade } from 'src/app/core/unidade';
import { Instituicao } from 'src/app/core/instituicao';
import { Funcoes } from 'src/app/core/funcoes';

@Component({
  selector: 'cadastrar-categorias-contabeis',
  templateUrl: './cadastrar-categorias-contabeis.component.html',
  styleUrls: ['./cadastrar-categorias-contabeis.component.css']
})
export class CadastrarCategoriasContabeisComponent implements OnInit {

  listaCategoriasContabeis: CategoriasContabeis[];
  categoriasContabeis: CategoriasContabeis;

  isAtualizar: boolean = false;

  tipos= [
    {id: "D", descricao:"DESPESA"},
    {id: "R", descricao:"RECEITA"},
  ]


  perfilAcesso: Acesso;


  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  constructor(
    private categoriasContabeisService: CategoriasContabeisService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private unidadeService:UnidadeService,
    private instituicaoService:InstituicaoService

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

    this.categoriasContabeisService.getAll().subscribe((listaCategoriasContabeis: CategoriasContabeis[]) => {
      this.listaCategoriasContabeis = listaCategoriasContabeis;
    })
   
    let id: number;
    id = this.activatedRoute.snapshot.queryParams.id ? this.activatedRoute.snapshot.queryParams.id : null;
    if (id) {
      this.isAtualizar = true;
      this.categoriasContabeisService.getById(id).subscribe((categoriasContabeis: CategoriasContabeis) => {
        this.categoriasContabeis = categoriasContabeis
      });
    }

  }

  cadastrar() {
    this.categoriasContabeisService.cadastrar(this.categoriasContabeis).subscribe(() => {
      this.router.navigate(['categoriascontabeis']);
      this.toastService.showSucesso("Categoria Contábil cadastrada com sucesso");
    });
  }

  limpar() {
    this.inicializarObjetos();
    this.categoriasContabeis.nome = "";
    this.categoriasContabeis.tipo = "";
    this.categoriasContabeis.descricaoCategoria = "";
  }

  cancelar() {
    this.router.navigate(['categoriascontabeis']);
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }


  atualizar() {
    this.categoriasContabeisService.alterar(this.categoriasContabeis).subscribe(() => {
      this.router.navigate(['categoriascontabeis']);
      this.toastService.showSucesso("Categoria contábil atualizada com sucesso");
    });

  }


  inicializarObjetos() {
    this.categoriasContabeis = new CategoriasContabeis();
    this.categoriasContabeis.categoriaSuperior = new CategoriasContabeis();
    
  }

  mostrarBotaoLimpar() {
    if (this.isAtualizar) return false;
    if (!this.mostrarBotaoAtualizar) return false;
    if (!this.mostrarBotaoCadastrar) return false;

    return true;
  }

}
